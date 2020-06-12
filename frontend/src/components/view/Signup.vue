<template>
   <v-app>
        <v-card width='90%' class="mx-auto mt-5">
            <v-card-title>
                <h2 class='display-1 item--center'>Sign Up</h2>
            </v-card-title>
            <v-card-text>
            <v-form>
                 <v-text-field prepend-icon="mdi-account-circle" 
                              id='name' 
                              label='ユーザー名'
                              v-model="displayName" 
                              type='text' />
                 <v-text-field prepend-icon="mdi-account-circle" 
                              id='email' 
                              label='E-mail'
                              v-model="email" 
                              type='email' />
                <v-text-field prepend-icon="mdi-lock" 
                              append-icon="mdi-eye-off" 
                              id='password' 
                              label='パスワード'
                              v-model="password" 
                              type='password' />
            </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn class='info item--center' @click='signup'>登録</v-btn>
            </v-card-actions>
        </v-card>
    </v-app>
</template>


<script>
import axios from '../../axios-auth';

export default {
    data () {
        return {
            email: "",
            password: "",
            displayName: ""
        }
    },
    methods: {
        signup() {
            this.$store.dispatch('signup',
            {
                email: this.email,
                password: this.password,
                displayName: this.displayName
            }
            );
        }
    }
}
</script>

<style scoped>
.item--center {
    margin-left: auto;
    margin-right: auto;
}
</style>