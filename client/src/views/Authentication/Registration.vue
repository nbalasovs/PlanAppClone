<template>
  <div class="container">
    <h1 class="mt-5 mb-5 pl-0">Register Account</h1>
    <form class="custom-form" v-on:submit.prevent="onSubmit">
      <div class="form-group">
          <label for="username">First Name</label>
          <input v-model="first" type="text" class="form-control" id="first" placeholder="First Name" required/>
      </div>
      <div class="form-group">
          <label for="username">Last Name</label>
          <input v-model="last" type="text" class="form-control" id="last" placeholder="Last Name" required/>
      </div>
      <div class="form-group">
          <label for="username">Username</label>
          <input v-model="username" type="text" class="form-control" id="username" placeholder="Username" required/>
      </div>
      <div class="form-group">
          <label for="password">Password</label>
          <input v-model="password" type="password" class="form-control" id="password" placeholder="Password" required/>
      </div>
      <div class="form-group">
          <button type="submit" class="btn btn-secondary">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
import {registerUser} from '../../services/AuthServices'

export default {
  name: 'Register',
  data() {
    return {
      first: '',
      last: '',
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit: async function() {
      const user = {
        first: this.first,
        last: this.last,
        username: this.username,
        password: this.password
      }

      await registerUser(user)
    }
  }
}
</script>