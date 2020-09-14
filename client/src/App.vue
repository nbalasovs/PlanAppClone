<template>
  <div id="app">
    <Navbar 
      v-if="this.$route.name !== 'Login'" 
      v-on:childToParent="onAddYearClick"
      v-on:courseAdded="addCourseDelay()"
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
    onAddYearClick: function(value) {
      this.components = value
    },
    fetchData: async function() {
      const courses = await axios.get(this.$store.state.apiURL + '/api/course/' + this.$store.state.userId)
      this.courses = courses.data
    },
    addCourseDelay: function() {
      setTimeout(() => this.fetchData(), 1000)
    }
  },
  beforeCreate: function() {
    this.$store.dispatch('authenticate')
  },
  created() {
    if(this.$store.state.userId !== null) {
      this.fetchData()
    }
  }
}
</script>