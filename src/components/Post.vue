
<template>
  <v-card class="mx-auto" max-width="50vw" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-subtitle>{{ postContent }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-row align="center" justify="end">
      <v-btn icon class="mr-1">
        <v-icon>mdi-thumb-up</v-icon>
      </v-btn>
      <span class="mr-1">·</span>
      <v-btn icon class="mr-5">
        <v-icon >mdi-earth</v-icon>
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      postContent: '',
    };
  },
};
</script>
