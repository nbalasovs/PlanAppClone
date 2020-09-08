<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item" v-if="$store.state.isAuthenticated">
          <a href="#" v-on:click.prevent="addYear()" v-if="$store.state.isAuthenticated" class="nav-link">Add Year</a>
        </li>
        <li class="nav-item" v-if="$store.state.isAuthenticated">
          <a href="#" v-on:click.prevent="userLogout" v-if="$store.state.isAuthenticated" class="nav-link">Logout</a>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li class="mr-auto nav-item" v-if="$store.state.isAuthenticated">
          <p class="mb-0">Welcome back, {{ $store.state.username }}!</p>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import {logout} from '../services/AuthServices'
import axios from 'axios'

export default {
  name: 'Navbar',
  methods: {
    userLogout: function() {
      logout()
    },
    addYear: function() {
      axios.post('http://localhost:3000/api/data/year/add', {
        userId: this.$store.state.userId
      }).then((res) => {
        if(res.status === 201) {
          this.makeToast('Year was added')
        } else {
          this.makeToast('Maximum amount of years was exceeded')
        }
      }).catch(err => console.log(err))
    },
    makeToast(message) {
      this.$bvToast.toast(message, {
        title: 'Message',
        autoHideDelay: 5000,
        toaster: 'b-toaster-bottom-right',
        appendToast: true
      })
    }
  },
  props: [
    'isHomeRoute'
  ],
  beforeCreate: function() {
    this.$store.dispatch('authenticate');
  }
}
</script>