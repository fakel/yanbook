<template>
  <!-- from  https://vuetifyjs.com/en/components/dialogs#modal -->
  <v-row justify="end">
    <v-dialog v-model="dialog" max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template>
      <v-card>
        <v-card class="mx-auto" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Login</div>
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
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-btn @click="login" text>Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    show: false,
    email: '',
    password: '',
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
    login() {
      this.$store.dispatch('setCredentials', { token: 'any', user: 'any' });
      this.$router.push({ name: 'Wall' });
    },
  },
};
</script>

<style>
</style>
