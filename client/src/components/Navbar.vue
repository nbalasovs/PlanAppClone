<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item" v-if="$store.state.isAuthenticated && isHomeRoute">
          <a href="#" class="nav-link" v-on:click="addYear">Add Year</a>
        </li>
        <li class="nav-item" v-if="$store.state.isAuthenticated && isHomeRoute">
          <a href="#" class="nav-link">Save</a>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li class="mr-auto nav-item" v-if="$store.state.isAuthenticated">
          <p class="mb-0 nav-link">Welcome back, {{ $store.state.username }}!</p>
        </li>
        <li class="mr-auto nav-item" v-if="$store.state.isAuthenticated">
          <a href="#" v-on:click.prevent="userLogout" class="nav-link">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import {logout} from '../services/AuthServices'
import Grid from '@/components/Grid.vue'

export default {
  name: 'Navbar',
  data() {
    return {
      components: {
        years: [],
        gridComponents: []
      }
    }
  },
  methods: {
    userLogout: function() {
      logout()
    },
    addYear: function() {
      if(this.components.gridComponents.length < 5) {
        this.components.gridComponents.push(Grid)
        this.components.years.push({ state: [] })
        this.$emit('childToParent', this.components)
        this.makeToast('Year was successfully added')
      } else {
        this.makeToast('You have exceeded maxiumum number of available years')
      }      
    },
    makeToast: function(message) {
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