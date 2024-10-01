<template>
  <v-container>
    <!-- <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      <v-toolbar-title class="text-center">{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="logOut">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar> -->
    <v-toolbar color="primary">
      <slot></slot>
      <v-spacer></v-spacer>
      <v-toolbar-title class="text-center">{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="logOut">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-toolbar>
  </v-container>
</template>

<script>
export default {
  name: "NavbarComponent",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    logOut() {
      this.$store
        .dispatch("auth/logOut")
        .then(() => this.$router.go(-1))
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
