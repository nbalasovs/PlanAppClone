<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12 grid-container">
        <div class="row text-center quartile-section align-middle" v-if="windowWidth >= 992">
          <div class="col-md">
            <p class="mb-0">Quartile 1</p>
          </div>
          <div class="col-md">
            <p class="mb-0">Quartile 2</p>
          </div>
          <div class="col-md">
            <p class="mb-0">Quartile 3</p>
          </div>
          <div class="col-md">
            <p class="mb-0">Quartile 4</p>
          </div>
        </div>
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
                    <b-button v-on:click.prevent="addCourse(course.data._id, 
                      course.data.name, course.data.block, course.spec.isPassed, course.data.code, idx)">
                      Add to year {{ idx + 1 }}
                    </b-button>
                  </div>
                  <b-button variant="danger" v-on:click="displayModal(course.data._id)">Remove course</b-button>
                </b-card>
              </b-collapse>
            </div>
          </div>
        </b-sidebar>
      </div>
    </div>
    <b-modal 
      v-for="(course, idx) in courses" 
      :key="idx" 
      :id="course.data._id"
      v-on:ok="removeCourse(course.data._id)"
      ok-title="Remove"
      ok-variant="danger"
      title="Remove course">
      <p class="my-4">Are you sure you want to remove {{ course.data.name }} from planning?</p>
    </b-modal>
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
  methods: {
    addCourse: function(id, name, block, isPassed, courseCode, gridIdx) {
      if(Object.keys(this.componentObj).length !== 0) {
        const doExist = this.componentObj.years[gridIdx].state.filter(element => element.i === id)
        if(!doExist.length > 0) {
          this.componentObj.years[gridIdx].state.push({
            isPassed: isPassed,
            courseCode: courseCode,
            x: block - 1,
            y: 0,
            w: 1,
            h: 1,
            i: id,
            c: name
          })
        } else {
          this.makeToast('You already added this course')
        }
      }
    },
    displayModal: function(id) {
      this.$bvModal.show(id)
    },
    removeCourse: function(id) {
      axios.post(this.$store.state.apiURL + '/api/course/remove', {
        userId: this.$store.state.userId,
        courseId: id
      }).then(() => {
        this.makeToast('Course was removed')
        this.$emit('courseRemoved', id)
      }).catch(e => console.log(e))
    }
  },
  props: [
    'componentObj',
    'courses'
  ]
}
</script>