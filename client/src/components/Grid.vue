<template>
  <div class="pb-3 pt-3">
    <p :class="windowWidth >= 992 ? 'mb-0 meta-subtitle' : 'mb-0 meta-subtitle-mobile'">
      <b class="year-title">Year {{ yearGrid }}</b>
      <span>{{ startYear + (yearGrid - 1) }} - {{ startYear + yearGrid }}</span>
    </p>
    <grid-layout
      :layout.sync="layout"
      :col-num="4"
      :row-height="40"
      :autoSize="checkCoursesPerBlock() ? true : false"
      :margin="windowWidth >= 992 ? [10, 10] : [0, 0]"
      :use-css-transforms="true"
      >
      <grid-item v-for="item in layout" 
        :class="[
        item.isPassed ? 'vue-grid-item-passed' : 'vue-grid-item-default',
        checkCourseBlock(item.x + 1)
        ]"
        :maxH="1"
        :isDraggable="true"
        :isResizable="false"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i">
        <div class="d-flex justify-content-between text-align-center text pr-2 pl-2">
          <p class="mb-0 grid-text" v-if="windowWidth < 992">{{ item.courseCode }}</p>
          <p class="mb-0 grid-text" v-else>{{ item.c }}</p>
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
          return true
        }
      }
      return false
    },
    checkCourseBlock: function(block) {
      if(block === 1) {
        return 'block-1'
      } else if(block === 2) {
        return 'block-2'
      } else if(block === 3) {
        return 'block-3'
      } else {
        return 'block-4'
      }
    }
  }
}
</script>