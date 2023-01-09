<template>
  <div>
    <input v-model="email" placeholder="email" type="email">
    <input v-model="password" placeholder="password" type="password">
    <button v-on:click="loginBtnClick">login</button>
    <span>{{error}}</span>
    <button v-on:click="goToRegister">S'inscrire</button>
  </div>
</template>

<script>

import {ServiceUtilisateur} from "../../public/js/service/ServiceUtilisateur";

export default {
  name: 'LoginComponent',
  data: () => ({
    email: "",
    password: "",
    error: ""
  }),
  methods: {
    async goToRegister() {
      this.$emit("changePage", "register");
    },

    async loginBtnClick(){
      if(this.email.trim() !== "" && this.password.trim() !== "") {
        ServiceUtilisateur.login(this.email, this.password)
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