<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-9">
        <component v-for="(component, idx) in components" :key="idx" :is="component" :layout="grid.nYear[idx].state" :year="idx + 1" />
      </div>
      <div class="col-md-3">
        <b-dropdown v-for="(course, index) in courses" :key="index" :text="course.data.name">
          <b-dropdown-item 
            v-for="(year, index) in grid.nYear" 
            :key="index" 
            v-on:click="addCourse(course.data.name, index, course.data.block, course.data._id)">
              Add to year {{ index + 1 }}
            </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import Grid from '@/components/Grid'
// import axios from 'axios'

export default {
  name: 'Home',
  components: {
    Grid
  },
  data() {
    return {
      layout: [],
      components: [],
      courses: null,
      grid: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    addCourse: function(name, year, block, id) {
      // const added = arr.filter(element => {
      //   return element.i === id
      // })
      // console.log(added)

      this.grid.nYear[year].state.push({
        x: block - 1,
        y: 0,
        w: 1,
        h: 1,
        i: id,
        c: name
      })
    },
    makeToast() {
      this.$bvToast.toast('Year was added', {
        title: 'Message',
        autoHideDelay: 5000,
        appendToast: true
      })
    },
    async fetchData() {
      // const courses = await axios.get('http://localhost:3000/api/data/' + this.$store.state.userId, {
      //   headers: {}
      // })
      // const grid = await axios.get('http://localhost:3000/api/data/grid/' + this.$store.state.userId, {
      //   headers: {}
      // })

      // this.courses = courses.data
      // this.grid = grid.data
      // for(let i = 0; i < this.grid.nYear.length; i++) {
      //   this.components.push(Grid)
      // }
    }
  }
}
</script>