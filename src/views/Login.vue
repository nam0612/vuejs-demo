<!-- src/components/LoginPage.vue -->
<template>
  <v-container>
    <v-row justify="center" align="center" style="height: 100vh">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="headline">Login</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="id"
                :rules="idRules"
                label="ID"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="Password"
                type="password"
                required
              ></v-text-field>
              <v-btn :disabled="!valid" color="success" @click="submit">
                Login
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      valid: false,
      id: "",
      password: "",
      idRules: [(v) => !!v || "ID is required"],
      passwordRules: [(v) => !!v || "Password is required"],
    };
  },
  methods: {
    submit() {
      const loginRequest = {
        name: this.id,
        password: this.password,
      };
      this.$store
        .dispatch("auth/logIn", loginRequest, { root: true })
        .then(() => this.$router.go(-1))
        .catch((err) => {
          console.log(err);
        });
      this.id = "";
      this.password = "";
    },
  },
};
</script>

<style scoped>
/* Add styles if necessary */
</style>
