<template>
  <div id="app">
    <Navbar 
      v-if="this.$route.name !== 'Login'" 
      v-on:childToParent="onAddYearClick"
      v-on:courseAdded="fetchData"
      :isHomeRoute="isHomeRoute()" />
    <router-view :componentObj="components" :courses="courses" />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import axios from 'axios'

export default {
  name: 'app',
  components: {
    Navbar
  },
  data() {
    return {
      components: {},
      courses: null
    }
  },
  methods: {
    isHomeRoute: function() {
      return this.$route.name === 'Home'
    },
    onAddYearClick(value) {
      this.components = value
    },
    async fetchData() {
      const courses = await axios.get('http://localhost:3000/api/course/' + this.$store.state.userId, {
        headers: {}
      })
      this.courses = courses.data
    },
  },
  beforeCreate: function() {
    this.$store.dispatch('authenticate')
  },
  created() {
    this.fetchData()
  }
}
</script>