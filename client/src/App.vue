<template>
  <div id="app">
    <Navbar 
      v-if="this.$route.name !== 'Login'"
      v-on:userLogout="cleanData()" 
      v-on:childToParent="onAddYearClick"
      v-on:courseAdded="fetchDataDelay()"
      :isHomeRoute="isHomeRoute()" />
    <router-view :componentObj="components" 
      :courses="courses" 
      :dashboardData="dashboardData"
      v-on:accessDenied="makeToast('You have to have at least one course to be able to use dashboard functionality')"
      v-on:updateData="fetchData()"
      v-on:courseRemoved="onCourseRemove" />
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
      courses: null,
      dashboardData: null
    }
  },
  methods: {
    isHomeRoute: function() {
      return this.$route.name === 'Home'
    },
    onAddYearClick: function(value) {
      this.components = value
    },
    cleanData: function() {
      this.components = {}
      this.courses = null
      this.dashboardData = null
    },
    fetchData: async function() {
      const courses = await axios.get(this.$store.state.apiURL + '/api/course/' + this.$store.state.userId)
      courses.data.sort((a, b) => {
        const textA = a.data.name.toUpperCase()
        const textB = b.data.name.toUpperCase()
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
      })
      this.courses = courses.data

      const creditsArr = this.courses.filter(el => el.spec.isPassed)
      var credits = null

      if(creditsArr.length > 0) {
        credits = creditsArr.map(el => el.data.credits).reduce((a, b) => a + b)
      } else {
        credits = 0
      }

      const names = this.courses.sort((a, b) => a.spec.grade - b.spec.grade).filter(el => el.spec.grade !== 0)
      .map(el => el.data.name)

      const grades = this.courses.sort((a, b) => a.spec.grade - b.spec.grade).filter(el => el.spec.grade !== 0)
      .map(el => el.spec.grade)

      this.dashboardData = {
        creditsOverview: (credits >= 180) ? [180] : ([credits, 180 - credits]),
        boxPlotData: {
          names: names,
          grades: grades
        }
      }
    },
    fetchDataDelay: function() {
      setTimeout(() => this.fetchData(), 1000)
    },
    onCourseRemove: function(value) {
      var idx = -1
      const years = this.components.years
      this.fetchDataDelay()

      if(years) {
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
    }
  },
  beforeCreate: function() {
    this.$store.dispatch('authenticate')
  },
  created: function() {
    if(this.$store.state.userId) this.fetchData()
  }
}
</script>