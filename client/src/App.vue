<template>
  <div id="app">
    <Navbar v-if="this.$route.name !== 'Login'" />
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
    isLoginRoute: function() {
      const currentRoute = this.$route.name
      console.log(currentRoute)
      return currentRoute === 'Login'
    }
  },
  beforeCreate: function() {
    this.$store.dispatch('authenticate')
  }
}
</script>