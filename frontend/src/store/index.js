import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../axios-auth';
import router from '../router';
import axiosRefresh from '../axios-refresh';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        idToken: null,
        userId: null
    },
    getters: {
        idToken: state => state.idToken,
        userId: state => state.userId
    },
    mutations: {
        updateIdToken(state, idToken) {
            state.idToken = idToken;
        },
        
        updateUserId(state, userId) {
            state.userId = userId;
        }
    },
    actions: {
        async autoLogin({ commit, dispatch }) {
            const idToken = localStorage.getItem('idToken');
            if (!idToken) return;
            const now = new Date();
            const expiryTimeMs = localStorage.getItem('expiryTimeMs');
            const isExpired = now.getTime() >= expiryTimeMs;
            const refreshToken = localStorage.getItem('refreshToken');
            console.log(isExpired);
            if (isExpired){
                console.log('autologin');
                await dispatch('refreshIdToken', refreshToken);
            }else{
                const expiresInMs = expiryTimeMs - now.getTime();
                console.log(expiresInMs);
                setTimeout(() => {
                    dispatch('refreshIdToken' , refreshToken);
                }, expiresInMs * 1000);
                commit('updateIdToken', idToken);
            }

        },
        login({ dispatch }, authData){
            axios.post(
                '/accounts:signInWithPassword?key=AIzaSyCKqqCsLVrRLjZ-jlovS8RGZkIxeznDe_g',
                {
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true
                }
            ).then(response => {
                console.log('login');
                console.log(response.data.localId);
                dispatch('setAuthData', {
                    localId : response.data.localId,
                    idToken: response.data.idToken,
                    expiresIn: response.data.expiresIn,
                    refreshToken: response.data.refreshToken
                });
                console.log(response.data);
                router.push('/');
            });
            this.email = '';
            this.password = '';
        },
        async refreshIdToken({ dispatch }, refreshToken){
            await axiosRefresh.post('/token?key=AIzaSyCKqqCsLVrRLjZ-jlovS8RGZkIxeznDe_g',
                    {
                        grant_type: 'refresh_token',
                        refresh_token: refreshToken
                    }).then(response => {
                        console.log(response);
                        console.log('refresh');
                        console.log(response.data.user_id);
                        dispatch('setAuthData', {
                            localId : response.data.user_id,
                            idToken : response.data.id_token,
                            expiresIn : response.data.expires_in,
                            refreshToken : response.data.refresh_token
                        });
                    })
        },
        signup({ dispatch }, authData){
            axios.post(
                '/accounts:signUp?key=AIzaSyCKqqCsLVrRLjZ-jlovS8RGZkIxeznDe_g',
                {
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true
                }
            ).then(response => {
                console.log('signup');
                console.log(response.data.localId);
                dispatch('setAuthData', {
                    localId : response.data.localId,
                    idToken : response.data.idToken,
                    expiresIn : response.data.expiresIn,
                    refreshToken : response.data.refreshToken
                }).then(response => {
                    console.log(response);
                    axios.post(
                        `https://firestore.googleapis.com/v1/projects/umedandon/databases/(default)/documents/user?documentId=${response.localId}`,
                        {
                            fields: {
                                name: {stringValue: authData.displayName},
                                userId: {stringValue: response.localId},
                                // clear : { mapValue: { "clear" : { stringValue: "hello" }}}
                            }
                        },{
                            headers: {
                              Authorization: `Bearer ${response.idToken}`
                            }
                          }
                    ).then(response => {
                        console.log(response);
                    })
                })
                router.push('/');
            })
        },
        setAuthData({ commit , dispatch }, authData){
            const now = new Date ();
            const expiryTimeMs = now.getTime() + authData.expiresIn * 1000;
            commit('updateIdToken', authData.idToken);
            commit('updateUserId', authData.localId);
            localStorage.setItem('idToken', authData.idToken);
            localStorage.setItem('expiryTimeMs', expiryTimeMs);
            localStorage.setItem('refreshIdToken', authData.refreshToken);
            setTimeout(() => {
                dispatch('refreshIdToken', authData.refreshToken)
            }, authData.expiresIn * 1000)
            return {localId: authData.localId, idToken: authData.idToken};
        },
        logout({ commit }){
            commit('updateIdToken', null);
            localStorage.removeItem('idToken');
            localStorage.removeItem('expiryTimeMs');
            localStorage.removeItem('refreshIdToken');
            router.replace('/login');
            
        },
        
    }
})