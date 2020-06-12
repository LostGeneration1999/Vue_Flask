<template>
    <v-app>
        <v-card width='90%' class="mx-auto mt-5">
            <v-card-title>
                <h2 class='display-1 item--center'>Log In</h2>
            </v-card-title>
            <v-card-text>
            <v-form>
                <v-text-field prepend-icon="mdi-account-circle" 
                              id='email'
                              class='item--center'
                              label='E-mail'
                              v-model="email" 
                              type='email' />
                <v-text-field prepend-icon="mdi-lock" 
                              append-icon="mdi-eye-off" 
                              id='password' 
                              class='item--center'
                              label='パスワード'
                              v-model="password" 
                              type='password' />
            </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn  class='info item--center' @click='login'>ログイン</v-btn>
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
            password: ""
        }
    },
    methods: {
        login() {
            this.$store.dispatch('login', {
                email: this.email,
                password: this.password
            });
            this.email = '';
            this.password = '';
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