<template>
  <div class="container-fluid pt-4">
    <div class="row">
      <div class="col-md-8">
        <zingchart v-if="barChartConfig.series[0].values" :data="barChartConfig"></zingchart>
      </div>
      <div class="col-md-4">
        <zingchart v-if="donutChartConfig.series[0].values" :data="donutChartConfig"></zingchart>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      barChartConfig: {
        type: "bar",
        series: [{
          values: null
        }],
        title: {
          text: "Grade Overview",
          'font': 'inherit',
          'font-weight': 'none'
        },
        backgroundColor: 'transparent',
        'scale-y': {
          values: '0:10:1',
          guide: {
            'line-style': 'none'
          }
        },
        plot: {
          'background-color': '#6F975C',
          tooltip: {
            text: "%data-labels (%v)"
          },
          dataLabels: null
        }
      },
      donutChartConfig: {
        type: 'ring',
        series: [{
          values: null
        }],
        title: {
          text: 'Overall Points',
          'font': 'inherit',
          'font-weight': 'none'
        },
        backgroundColor: 'transparent',
        plot: {
          'background-color': '#6F975C',
          'slice': '65%'
        },
        scale: {
          'size-factor':0.5
        },
      }
    }
  },
  beforeUpdate() {
    console.log(this.$store.state.courses.credits)
    this.barChartConfig.series[0].values = this.$store.state.courses.grades
    this.donutChartConfig.series = this.$store.state.courses.credits
    this.barChartConfig.plot.dataLabels = this.$store.state.courses.names
  },
  created() {
    if(this.$store.state.courses) {
      this.barChartConfig.series[0].values = this.$store.state.courses.grades
      this.donutChartConfig.series = this.$store.state.courses.credits
      this.barChartConfig.plot.dataLabels = this.$store.state.courses.names
    }
  }
}
</script>