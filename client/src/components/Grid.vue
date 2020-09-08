<template>
  <div>
    <h4>Year {{ yearGrid }}</h4>
    <grid-layout
      :layout.sync="layout"
      :col-num="4"
      :row-height="30"
      :is-draggable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
      @layout-updated="layoutUpdatedEvent"
      >
      <grid-item v-for="item in layout"
        :maxH="1"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i">
        {{ item.c }}
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
      eventLog: []
    }
  },
  methods: {
    layoutUpdatedEvent: function(newLayout){  
      this.eventLog.push("Updated layout")
      console.log("Updated layout: ", newLayout)
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
}
</script>