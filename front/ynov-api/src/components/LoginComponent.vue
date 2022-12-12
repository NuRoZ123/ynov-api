<template>
  <div>
    <input v-model="email" placeholder="email" type="email">
    <input v-model="password" placeholder="password" type="password">
    <button v-on:click="loginBtnClick">login</button>
    <span>{{error}}</span>
  </div>
</template>

<script>

export default {
  name: 'LoginComponent',
  data: () => ({
    email: "",
    password: "",
    error: ""
  }),
  methods: {
    async loginBtnClick(){
      if(this.email.trim() !== "" && this.password.trim() !== "") {
        fetch('http://localhost:8080/api/v1/users/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email: this.email, password: this.password})
        }).then((response) => response.json())
            .then((result) => {
              localStorage.setItem("token", result.message)
              this.$emit("changePage", "listes");
            })
      }
    }
  }
}
</script>