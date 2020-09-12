<template>
  <div class="pb-3 pt-3">
    <p>
      <b class="year-title">Year {{ yearGrid }}</b>
      <span>{{ startYear + (yearGrid - 1) }} - {{ startYear + yearGrid }}</span>
    </p>
    <grid-layout
      :layout.sync="layout"
      :col-num="4"
      :row-height="40"
      :autoSize="checkCoursesPerBlock() ? true : false"
      :margin="[10, 10]"
      :use-css-transforms="true"
      >
      <grid-item v-for="item in layout"
        :maxH="1"
        :static="true"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i">
        <div class="d-flex justify-content-between text-align-center text pr-2 pl-2">
          <p class="mb-0 grid-text">{{ item.c }}</p>
          <b-icon icon="x-circle" v-on:click="removeItem(item.i)"></b-icon>
        </div>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout'

export default {
  name: 'Grid',
  data() {
    return {
      startYear: this.$store.state.startYear,
      theme: false
    }
  },
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  props: [
    'layout',
    'yearGrid'
  ],
  methods: {
    removeItem: function(id) {
      const idx = this.layout.findIndex(el => {
        return el.i === id
      })
      this.layout.splice(idx, 1)
    },
    checkCoursesPerBlock: function() {
      for(let i = 0; i < 4; i++) {
        const num = this.layout.filter(el => {
          return el.x === i
        })
        if(num.length > 4) {
          console.log(true)
          return true
        }
      }
      console.log(false)
      return false
    }
  }
}
</script>