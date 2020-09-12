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
          <a href="#" class="nav-link" v-on:click="removeYear">Remove Last Year</a>
        </li>
        <li class="nav-item" v-if="$store.state.isAuthenticated && isHomeRoute">
          <a href="#" class="nav-link" v-on:click="saveLayout">Save</a>
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
import axios from 'axios'

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
  created() {
    this.loadGrid()
  },
  methods: {
    userLogout: function() {
      logout()
    },
    saveLayout: async function() {
      console.log(this.components)
      await axios.post('http://localhost:3000/api/course/grid/save', {
        userId: this.$store.state.userId,
        yearsObj: this.components.years
      })
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
    removeYear: function() {
      this.components.gridComponents.splice(-1,1)
      this.components.years.splice(-1,1)
      this.makeToast('Last year was removed')
    },
    loadGrid: async function() {
      const years = await axios.get('http://localhost:3000/api/course/grid/' + this.$store.state.userId, {
        headers: {}
      })
      if(years.data.length > 0) {
        for(let i = 0; i < years.data.length; i++) {
          this.components.gridComponents.push(Grid)
        }
        this.components.years = years.data
        this.$emit('childToParent', this.components)
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