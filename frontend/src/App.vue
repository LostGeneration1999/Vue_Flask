<template>
  <div id="app">
  <header>
   <v-app-bar color="gray accent-4" dark app>
        <template v-if="isAutheniticated">
          <span class='header-item' @click='logout'>ログアウト</span>
        </template>
        <template v-if="!isAutheniticated">
          <router-link to='/login' class='header-item'>Login</router-link>
          <router-link to='/signup' class='header-item'>Signup</router-link>
        </template>
  </v-app-bar>
  </header>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isAutheniticated () {
      return this.$store.getters.idToken != null;
    }
  },
  methods: {
    logout(){
      this.$store.dispatch('logout');
    } 
  }
}

</script>

<style>
.header-item {
  padding: 10px;
  cursor: pointer
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
