<template>
  <div id="app">
    <Navbar v-if="this.$route.name !== 'Login'" :isHomeRoute="isHomeRoute()" v-on:childToParent="onAddYearClick" />
    <router-view :componentObj="components" />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'app',
  components: {
    Navbar
  },
  data() {
    return {
      components: {}
    }
  },
  methods: {
    isHomeRoute: function() {
      return this.$route.name === 'Home'
    },
    onAddYearClick(value) {
      this.components = value
    }
  },
  beforeCreate: function() {
    this.$store.dispatch('authenticate')
  }
}
</script>