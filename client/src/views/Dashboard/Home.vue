<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-9">
        <component v-for="(component, idx) in componentArr" :key="idx" :is="component" :layout="layout" :year="idx + 1" />
      </div>
      <div class="col-md-3">
        Two
      </div>
    </div>
  </div>
</template>

<script>
import Grid from '@/components/Grid'
import axios from 'axios'

var testLayout = [
  {"x":1,"y":0,"w":1,"h":1,"i":"0"},
  {"x":2,"y":0,"w":1,"h":1,"i":"1"},
  {"x":3,"y":0,"w":1,"h":1,"i":"2"},
  {"x":4,"y":0,"w":1,"h":1,"i":"3"},
]

export default {
  name: 'Home',
  components: {
    Grid
  },
  data() {
    return {
      layout: testLayout,
      courses: null,
      grid: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const courses = await axios.get('http://localhost:3000/api/course/' + this.$store.state.userId, {
        headers: {}
      })
      this.courses = courses.data
    }
  },
  props: [
    'componentArr'
  ]
}
</script>