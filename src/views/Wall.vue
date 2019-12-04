<template>
  <v-container>
    <v-lazy
      v-for="key in 10"
      :key="key"
      :options="{
        threshold: 1.0
      }"
      min-height="150"
      :transition="'fade-transition'"
    >
      <Post />
    </v-lazy>
  </v-container>
</template>

<script>
import Post from '../components/Post.vue';

export default {
  data() {
    return {
    };
  },
  components: {
    Post,
  },
};
</script>

<style>
</style>
