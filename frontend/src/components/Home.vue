<template>
  <v-app>
    <v-content>
    <h1>梅田の地下街をひたすら迷子になろう</h1>
    <h2>{{ localId }}</h2>
      <v-layout text-xs-center mt-5 px-3 py-3  row wrap>
        <v-flex lg6 sm6 xs12 v-for='map in maps' :key='map.name' >
          <v-card dark class="ma-2" @click='getdata(map)'>
              <v-card-title aliign-center class="title headline">{{ map.fields.name.stringValue }}</v-card-title>
              <v-divider class="mx-3"></v-divider>
          </v-card>
        </v-flex> 
        <v-dialog v-model="dialog" scrollable max-width="80%">
        <v-card>
          <v-card-title>{{ title }}</v-card-title>
          <img :src='imageurl' height="100%" width="100%"/>
        </v-card>
        </v-dialog> 
      </v-layout>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'

export default { 
  data() {
    return{
      maps: [],
      title: null,
      imageurl: null,
      dialog: false
    }
  },
  computed: {
    idToken() {
      return this.$store.getters.idToken;
    },
    localId() {
      console.log(this.$store.getters.userId);
      return this.$store.getters.userId;
    }
  },
  methods: {
    getdata(map) {
      this.dialog = true;
      this.imageurl = '@/assets/images/'+map.fields.url.stringValue;
      this.title = map.fields.name.stringValue
      console.log(this.imageurl);
    }
  },
  created() {
    axios.get(
      'https://firestore.googleapis.com/v1/projects/umedandon/databases/(default)/documents/dandon_map',{
      headers: {
        Authorization: `Bearer ${this.idToken}`
      }
    }).then(response => 
      {
        console.log(response);
        this.maps = response.data.documents;
        console.log(this.maps)
      }
    )
  }
}
</script>
