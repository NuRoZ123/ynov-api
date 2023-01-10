<template>
  <div class="navContainer">
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

<style>
.navContainer {
  border-bottom: 2px solid #ccc;
  background-color: white;
  border-bottom: 2px solid #ccc;
  box-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.navContainer button {
  background-color: #f1f1f1;
  color: #333;
  font-weight: bold;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
}

.navContainer button:hover {
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0,0,0,0.5);
}
</style>