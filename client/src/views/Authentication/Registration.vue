<template>
  <div class="container">
    <h1 class="mt-5 mb-5 pl-0">Register Account</h1>
    <form class="custom-form" v-on:submit.prevent="onSubmit">
      <div class="form-group">
          <label for="first">First Name</label>
          <input v-model="first" type="text" class="form-control" id="first" placeholder="First Name" required/>
      </div>
      <div class="form-group">
          <label for="last">Last Name</label>
          <input v-model="last" type="text" class="form-control" id="last" placeholder="Last Name" required/>
      </div>
      <div class="form-group">
          <label for="startYear">Start Year</label>
          <input v-model="startYear" 
            :min="2000"
            :max="new Date().getFullYear()"  
            type="number" 
            class="form-control" id="startYear" placeholder="Start year" required/>
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
          <label for="rePassword">Password</label>
          <input v-model="rePassword" type="password" class="form-control" id="rePassword" placeholder="Repeat password" required/>
      </div>
      <div class="form-group">
          <button type="submit" class="btn btn-secondary float-right">Register</button>
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
      password: '',
      rePassword: '',
      startYear: null,
    }
  },
  methods: {
    clearData: function() {
      this.first = ''
      this.last = ''
      this.username = ''
      this.password = ''
      this.rePassword = ''
      this.startYear = null
    },
    onSubmit: async function() {
      const user = {
        first: this.first,
        last: this.last,
        username: this.username,
        password: this.password,
        startYear: this.startYear
      }
      var valid = false

      if(this.rePassword === this.password) {
        valid = await registerUser(user)
        if(valid) {
          this.makeToast('User was created successfully')
          this.clearData()
        } else {
          this.makeToast('Error occurred, please try again later')
        }
      } else {
        this.makeToast('Passwords do not match')
      }
    }
  }
}
</script>