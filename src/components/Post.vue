<template>
  <v-card class="mx-auto" max-width="50vw" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title>{{ postContent.author }}</v-list-item-title>
        <v-textarea
          outlined
          name="input-7-4"
          v-model="newText"
          :rules="[rules.required, rules.min]"
          v-if="onEdit"
        ></v-textarea>
        <v-list-item-subtitle v-else>{{ postContent.slug }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-row align="center" justify="end">
      <v-btn
        icon
        class="mr-1"
        v-if="postContent.creator == $store.getters.checkId && onEdit == false"
        @click="editPost"
      >
        <v-icon>mdi-pen</v-icon>
      </v-btn>
      <v-btn icon class="mr-1" v-if="onEdit" @click="onEdit = false">
        <v-icon>mdi-stop</v-icon>
      </v-btn>
      <v-btn
        icon
        class="mr-1"
        v-if="postContent.creator != $store.getters.checkId"
        @click="deletePost(postContent._id)"
      >
      </v-btn>
      <v-btn
        icon
        class="mr-5"
        v-if="postContent.creator == $store.getters.checkId && onEdit == false"
        @click="confirmation = true"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn icon class="mr-5" v-if="onEdit" @click="updatePost(postContent._id)">
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </v-row>
    <div>
      <v-alert prominent type="error" :value="confirmation" >
        <v-row align="center">
          <v-col class="grow">Are you sure?</v-col>
          <v-col class="shrink">
            <v-btn @click="deletePost(postContent._id)">DELETE</v-btn>
          </v-col>
          <v-col class="shrink">
            <v-btn @click="confirmation = false">CANCEL</v-btn>
            </v-col>
        </v-row>
      </v-alert>
    </div>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newText: '',
      onEdit: false,
      confirmation: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 15 || 'Min 15 characters',
      },
    };
  },
  props: ['postContent'],
  methods: {
    editPost() {
      this.newText = this.postContent.slug;
      this.onEdit = true;
    },
    deletePost(postId) {
      axios
        .delete('/api/posts', { params: { id: postId } })
        .then(() => {
          this.confirmation = false;
          this.$emit('deleted');
        })
        .catch(err => console.log(err));
    },
    updatePost(postId) {
      axios
        .patch('/api/posts', { id: postId, slug: this.newText })
        .then(() => {
          this.onEdit = false;
          this.postContent.slug = this.newText;
        })
        .catch(err => console.log(err));
    },
  },
};
</script>
