<template>
  <div>
    <button v-on:click="goToLogin" v-if="!isConnected">login</button>
    <button v-on:click="goToRegister" v-if="!isConnected">register</button>
    <button v-on:click="goToAccueil" v-if="isConnected">Accueil</button>
    <button v-on:click="goToProfile" v-if="isConnected">mon profile</button>
    <button v-on:click="logout" v-if="isConnected">logout</button>
  </div>
</template>

<script>
export default {
  name: "NavComponent",
  props: ["isConnected"],

  methods: {
    async goToAccueil() {
      this.$emit("changePage", "listes");
    },

    async goToProfile() {
      this.$emit("changePage", "profile");
    },

    async logout() {
      localStorage.removeItem("token");
      this.$emit("setIsConnected", false);
      this.$emit("changePage", "login");
    },

    async goToLogin() {
      this.$emit("changePage", "login");
    },

    async goToRegister() {
      this.$emit("changePage", "register");
    }
  }
}
</script>