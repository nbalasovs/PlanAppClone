<template>
  <div id="app">
    <Navbar v-if="this.$route.name !== 'Login'" :isHomeRoute="isHomeRoute()" />
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'app',
  components: {
    Navbar
  },
  methods: {
    isHomeRoute: function() {
      return this.$route.name === 'Home'
    }
  },
  beforeCreate: function() {
    this.$store.dispatch('authenticate')
  }
}
</script>