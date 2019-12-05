<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on"> <v-icon>mdi-plus</v-icon></v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Add a friend</v-card-title>
        <v-textarea
          outlined
          name="input-7-4"
          label="Your Friend Email"
          v-model="toFollow"
          :rules="[rules.required, rules.email]"
        ></v-textarea>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black darken-1" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="black darken-1" text @click="addFriend">Add</v-btn>
        </v-card-actions>
      </v-card>
      <div>
        <v-alert prominent type="error" :value="errorAlert">
          <v-row align="center">
            <v-col class="grow" @click="errorAlert = false">Error: {{errorMsg}}</v-col>
          </v-row>
        </v-alert>
      </div>
    </v-dialog>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      errorAlert: false,
      errorMsg: '',
      dialog: false,
      toFollow: '',
      rules: {
        required: value => !!value || 'Required.',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Invalid e-mail.';
        },
      },
    };
  },
  methods: {
    addFriend() {
      axios
        .post('/api/addFriend', { email: this.toFollow })
        .then(() => {
          this.dialog = false;
          // console.log(res);
        })
        .catch((err) => {
          this.errorAlert = true;
          this.errorMsg = err;
        });
    },
  },
};
</script>
