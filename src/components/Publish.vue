<template>
  <v-card class="mx-auto" max-width="50vw" outlined>
    <v-form v-model="isFormValid">
      <v-textarea
        outlined
        name="input-7-4"
        label="Shout out something!"
        v-model="toPost"
        :rules="[rules.required, rules.min]"
      ></v-textarea>
      <v-row align="center" class="d-flex justify-end">
        <v-switch v-model="publicView" class="mr-5" label="Public"></v-switch>
        <v-btn icon class="mr-5 mb-2" @click="send" :disabled="!isFormValid">
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isFormValid: false,
      publicView: false,
      toPost: '',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 15 || 'Min 15 characters',
      },
    };
  },
  methods: {
    send() {
      axios
        .post('/api/posts', { post: this.toPost, public: this.publicView })
        .then(() => {
          this.toPost = '';
          this.$emit('sent');
          // console.log(res);
        })
        .catch();// err => console.log(err));
    },
  },
};
</script>

<style></style>
