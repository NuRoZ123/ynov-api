<template>
  <div>
    <input v-model="email" placeholder="email" type="email">
    <input v-model="password" placeholder="password" type="password">
    <label>terms and conddition:<input v-model="termsAndCondition" type="checkbox"></label>
    <button v-on:click="registerBtnClick">register</button>
    <span>{{error}}</span>
    <button v-on:click="goToLogin">Se connecter</button>
  </div>
</template>

<script>

import {ServiceUtilisateur} from "../../public/js/service/ServiceUtilisateur";

export default {
  name: "RegisterComponent",
  data: () => ({
    email: "",
    password: "",
    termsAndCondition: false,
    error: ""
  }),
  methods: {
    async goToLogin() {
      this.$emit("changePage", "login");
    },

    async registerBtnClick() {
      if(this.email.trim() !== "" && this.password.trim() !== "") {
        ServiceUtilisateur.register(this.email, this.password, this.termsAndCondition)
        .then(async (response) => {
            const result = await response.json();
            if(response.status === 200) {
              localStorage.setItem("token", result.message)
              this.$emit("setIsConnected", true);
              this.$emit("changePage", "listes");
            } else {
              this.error = result.message;
            }
        });
      }
    }
  }
}
</script>

<style scoped>

</style>