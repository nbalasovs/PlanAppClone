<template>
  <div>
    <h4>Year {{ yearGrid }}</h4>
    <grid-layout
      :layout.sync="layout"
      :col-num="4"
      :row-height="40"
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
    }
  }
}
</script>