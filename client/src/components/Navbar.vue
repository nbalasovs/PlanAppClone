<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item" v-if="$store.state.isAuthenticated">
          <a href="#" v-on:click.prevent="userLogout" v-if="$store.state.isAuthenticated" class="nav-link">Logout</a>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li class="mr-auto nav-item">
          <p class="mb-0">Welcome back, {{ this.$store.state.username ? this.$store.state.username : 'User' }}!</p>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import {logout} from '../services/AuthServices'

export default {
  name: 'Navbar',
  methods: {
    userLogout: function() {
      logout()
    }
  },
  beforeCreate: function() {
    this.$store.dispatch('authenticate');
  }
}
</script>