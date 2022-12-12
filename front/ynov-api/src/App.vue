<template>
  <login-component v-if="page === 'login'" @changePage="changePage"/>
  <register-component v-else-if="page === 'register'"/>
</template>

<script>
import LoginComponent from './components/LoginComponent.vue'
import RegisterComponent from './components/RegisterComponent.vue'

export default {
  name: 'App',
  components: {
    LoginComponent,
    RegisterComponent
  },
  data: () => ({
    page: "login"
  }),
  methods: {
    changePage(value) {
      this.page = value
    }
  }
}
</script>

<style>
</style>
