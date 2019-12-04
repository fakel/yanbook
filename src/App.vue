<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-btn color="primary" dark to="{name: 'Home'}">YanBook</v-btn>
      </div>

      <v-spacer></v-spacer>

      <login v-if="!logedIn" />
      <v-btn v-if="logedIn" @click="wallHandler()" text>Your Wall</v-btn>
      <v-btn icon class="mr-5" v-if="logedIn" @click="logout()">
        <v-icon>mdi-power</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Login from './components/Login.vue';

export default {
  name: 'App',

  components: { Login },

  data: () => ({}),
  computed: {
    logedIn() {
      return this.$store.getters.checkUser;
    },
  },
  methods: {
    wallHandler() {
      if (this.$router.currentRoute.name === 'Wall') {
        window.scrollTo(0, 0);
      } else {
        this.$router.push({ name: 'Wall' });
      }
    },
    logout() {
      this.$store.dispatch('clearCredentials');
      this.$router.push({ name: 'Home' });
    },
  },
  created() {
    this.$store.dispatch('checkCredentials');
  },
};
</script>
