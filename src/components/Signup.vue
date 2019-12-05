<template>
  <!-- from  https://vuetifyjs.com/en/components/dialogs#modal -->
  <div>
    <v-dialog v-model="dialog" max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">SignUp</v-btn>
      </template>
      <v-card>
        <v-card class="mx-auto" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">SignUp</div>
              <v-form v-model="isFormValid">
                <v-text-field
                  v-model="name"
                  :rules="[rules.required, rules.min]"
                  label="A great Name"
                />
                <v-text-field
                  v-model="email"
                  :rules="[rules.required, rules.email]"
                  label="A cool E-mail"
                />
                <v-text-field
                  v-model="password"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show ? 'text' : 'password'"
                  name="input-10-1"
                  label="A really safe password"
                  hint="At least 8 characters"
                  counter
                  @click:append="show = !show"
                />
              </v-form>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-btn @click="sigup" :disabled="!isFormValid" text>SignUp</v-btn>
          </v-card-actions>
        </v-card>
      </v-card>
    <div>
      <v-alert prominent type="error" :value="errorAlert">
        <v-row align="center">
          <v-col class="grow" @click="errorAlert = false">Error: {{ errorMsg }}</v-col>
        </v-row>
      </v-alert>
    </div>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    errorAlert: false,
    errorMsg: '',
    dialog: false,
    show: false,
    email: '',
    password: '',
    name: '',
    isFormValid: false,
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => "The email and password you entered don't match",
      counter: value => value.length <= 20 || 'Max 20 characters',
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || 'Invalid e-mail.';
      },
    },
  }),
  methods: {
    sigup() {
      axios
        .post('/api/signup', { name: this.name, email: this.email, password: this.password })
        .then((res) => {
          if (res.data.token) {
            axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
            this.$store.dispatch('setCredentials', {
              token: res.data.token,
              user: res.data.user,
              id: res.data.id,
            });
            this.$router.push({ name: 'Wall' });
          }
        })
        .catch((err) => {
          this.errorAlert = true;
          this.errorMsg = err;
        });// err => console.log(err));
    },
  },
};
</script>

<style></style>
