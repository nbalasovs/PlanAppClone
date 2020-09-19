<template>
  <div class="container h-100">
    <div class="row vh-100 justify-content-center align-items-center">
      <div class="col-10 col-md-8 col-lg-6">
        <div class="login-img">
          <img src="../../../public/logo.png" alt="PlanApp Clone" class="logo">
        </div>
        <form class="custom-form" v-on:submit.prevent="authenticate">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" class="form-control" id="username" v-model="username" placeholder="Username" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" v-model="password" placeholder="Password" required>
          </div>
          <button type="submit" class="btn btn-secondary btn-block">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {login} from '../../services/AuthServices'

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    authenticate: async function() {
      const user = {
        username: this.username,
        password: this.password
      }

      const valid = await login(user)
      if(valid) {
        this.$emit('updateData')
        this.$router.push({ name: 'Home' })
      } else {
        this.makeToast('Username or password is wrong')
      }
    }
  }
}
</script>