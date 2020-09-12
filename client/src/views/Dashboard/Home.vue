<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <component v-for="(component, idx) in componentObj.gridComponents"
                   :key="idx" :is="component" :layout="componentObj.years[idx].state" :yearGrid="idx + 1" />
        <div class="fab">
          <span class="fab-action-button" v-b-toggle.sidebar-right>
            <i class="fab-action-button__icon"></i>
          </span>
        </div>
        <b-sidebar id="sidebar-right" title="Courses" right shadow>
          <div class="px-3 py-2">
            <div v-for="(course, idx) in courses" :key="idx" class="pb-2">
              <b-button v-b-toggle="'collapse-' + idx" class="btn-block">
              {{ course.data.name }}
              </b-button>
              <b-collapse v-bind:id="'collapse-' + idx" class="mt-2" v-if="Object.keys(componentObj).length !== 0">
                <b-card class="custom-menu">
                  <div v-for="(year, idx) in componentObj.years" :key="idx" class="mb-2">
                    <b-button v-on:click="addCourse(course.data._id, 
                      course.data.name, course.data.block, course.spec.isPassed, idx)">
                      Add to year {{ idx + 1 }}
                    </b-button>
                  </div>
                </b-card>
              </b-collapse>
            </div>
          </div>
        </b-sidebar>
      </div>
    </div>
  </div>
</template>

<script>
import Grid from '@/components/Grid'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    Grid
  },
  data() {
    return {
      courses: null
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
    },
    addCourse: function(id, name, block, isPassed, gridIdx) {
      if(Object.keys(this.componentObj).length !== 0) {
        const doExist = this.componentObj.years[gridIdx].state.filter(element => element.i === id)
        if(!doExist.length > 0) {
          this.componentObj.years[gridIdx].state.push({
            x: block - 1,
            y: 0,
            w: 1,
            h: 1,
            i: id,
            c: name
          })
          console.log(isPassed)
          console.log(block)
          console.log(this.componentObj.years[gridIdx].state)
        } else {
          this.makeToast('You already added this course')
        }
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
    'componentObj'
  ]
}
</script>