<template>
  <v-container>
    <publish @sent="updatePosts" class="mb-6" />
    <div v-for="(post, key) in posts" :key="key">
      <v-lazy
        :options="{
          threshold: 1.0,
        }"
        min-height="150"
        :transition="'fade-transition'"
        v-if="
          selectView == 'all' ||
            (selectView == 'public' && post.public && post.creator == $store.getters.checkId) ||
            (selectView == 'friends' && !post.public && post.creator == $store.getters.checkId)
        "
      >
        <Post :postContent="post" @deleted="updatePosts" />
      </v-lazy>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios';
import Post from '../components/Post.vue';
import Publish from '../components/Publish.vue';

export default {
  data() {
    return {
      posts: [],
    };
  },
  props: ['selectView'],
  methods: {
    updatePosts() {
      axios
        .get('/api/posts', { params: { own: 2 } })
        .then((res) => {
          this.posts = res.data;
          console.log(this.posts);
        })
        .catch(err => console.log(err));
    },
  },
  components: {
    Post,
    Publish,
  },
  created() {
    axios.defaults.headers.common.Authorization = `Bearer ${this.$store.getters.checkToken}`;
    this.updatePosts();
  },
};
</script>

<style></style>
