<template>
  <div id="app">
    <Navbar 
      v-if="this.$route.name !== 'Login'" 
      v-on:childToParent="onAddYearClick"
      v-on:courseAdded="fetchDataDelay()"
      :isHomeRoute="isHomeRoute()" />
    <router-view :componentObj="components" :courses="courses" v-on:courseRemoved="onCourseRemove" />
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
      courses.data.sort((a, b) => {
        const textA = a.data.name.toUpperCase()
        const textB = b.data.name.toUpperCase()
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
      })
      this.courses = courses.data
      // this.$store.commit('userData', {
      //   grades: [1,2,3]
      // })
    },
    fetchDataDelay: function() {
      setTimeout(() => this.fetchData(), 1000)
    },
    onCourseRemove: function(value) {
      var idx = -1
      const years = this.components.years
      this.fetchDataDelay()

      for (const [i, year] of years.entries()) {
        idx = year.state.findIndex(el => String(el.i) === String(value))
        if(idx !== -1) idx = i; break
      }

      if(idx !== -1) {
        const state = this.components.years[idx].state
        const stateSubset = state.filter(el => String(el.i) !== String(value))
        years[idx].state = stateSubset
      }
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