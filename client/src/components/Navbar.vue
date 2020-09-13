<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand href="#" v-on:click.prevent>PlanApp Clone</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#" v-if="$store.state.isAuthenticated && isHomeRoute" v-b-modal.modal-1>
            Add Course
          </b-nav-item>
          <b-nav-item href="#" v-if="$store.state.isAuthenticated && isHomeRoute" v-on:click.prevent="addYear">
            Add Year
          </b-nav-item>
          <b-nav-item href="#" v-if="$store.state.isAuthenticated && isHomeRoute" v-on:click.prevent="removeYear">
            Remove Last Year
          </b-nav-item>
          <b-nav-item href="#" v-if="$store.state.isAuthenticated && isHomeRoute" v-on:click.prevent="saveLayout">
            Save
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-text v-if="$store.state.isAuthenticated && windowWidth >= 992">
            Welcome back, {{ $store.state.username }}!
          </b-nav-text>
          <b-nav-item href="#" v-if="$store.state.isAuthenticated" v-on:click.prevent="userLogout">
            Logout
          </b-nav-item>
        </b-navbar-nav>

      </b-collapse>

    </b-navbar>
    <b-modal ref="modal-1" id="modal-1" title="Add Course" :hide-footer="true">
      <b-form @submit.prevent="onSubmit">
        <b-form-group label="Course code:" label-for="input-1">
          <b-form-input id="input-1" v-model="form.id" type="text" placeholder="Enter course code" required />
        </b-form-group>
        <b-form-group label="Course grade:" label-for="input-2">
          <b-form-input id="input-2" v-model.number="form.grade" type="number" step="0.1" placeholder="Enter course grade" required />
        </b-form-group>
        <b-form-group label="Have you passed the course?">
          <b-form-radio v-model="form.isPassed" name="courseStatus" :value="true" required>Yes</b-form-radio>
          <b-form-radio v-model="form.isPassed" name="courseStatus" :value="false">No</b-form-radio>
        </b-form-group>

        <b-button type="submit" variant="secondary" class="float-right">Add</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import {logout} from '../services/AuthServices'
import Grid from '@/components/Grid.vue'
import axios from 'axios'

export default {
  name: 'Navbar',
  data() {
    return {
      form: {
        id: '',
        userId: this.$store.state.userId,
        isPassed: null,
        grade: null
      },
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
    onSubmit: async function() {
      await axios.post('http://localhost:3000/api/course/add/', this.form)
      .then(() => {
        this.makeToast('Course was successfully added')
        this.$emit('courseAdded')
        this.$refs['modal-1'].hide()
      })
      .catch(err => console.log(err))
      this.$emit('courseAdded')
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