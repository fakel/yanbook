<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="align-center">
        <v-btn color="primary" dark to="{name: 'Home'}">YanBook</v-btn>
      </div>

      <v-spacer></v-spacer>
      <div v-if="$store.getters.checkUser != undefined" class="text-center ps-5">
        Welcome {{ $store.getters.checkUser }}
      </div>
      <v-spacer></v-spacer>

      <signup v-if="!logedIn" />
      <login v-if="!logedIn" />
      <v-btn v-if="logedIn" @click="wallHandler()" text>Your Wall</v-btn>
      <v-btn icon class="mr-5" v-if="logedIn" @click="logout()">
        <v-icon>mdi-power</v-icon>
      </v-btn>

      <div class="text-center" v-if="logedIn">
        <v-menu open-on-hover top offset-y>
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">
              {{ selector }}
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(item, index) in options" :key="index">
              <v-list-item-title @click="selector = item.title">{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <friend v-if="logedIn"/>
    </v-app-bar>

    <v-content>
      <router-view :selectView="selector"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Login from './components/Login.vue';
import Signup from './components/Signup.vue';
import Friend from './components/Friend.vue';

export default {
  name: 'App',

  components: { Login, Signup, Friend },

  data: () => ({
    options: {
      all: { title: 'all' },
      public: { title: 'public' },
      friends: { title: 'friends' },
    },
    selector: 'all',
  }),
  computed: {
    logedIn() {
      return this.$store.getters.checkToken;
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
