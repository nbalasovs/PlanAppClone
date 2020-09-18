<template>
  <div class="container-fluid pt-4">
    <div class="row">
      <div class="col-md-8">
        <vue-frappe
            id="barChart"
            title="Grades Overview"
            class="img-fluid"
            type="bar"
            :max="10"
            :labels="dashboardData.boxPlotData.names"
            :colors="['violet', 'red']"
            :dataSets="this.barChartData">
        </vue-frappe>
      </div>
      <div class="col-md-4">
        <vue-frappe
            id="donutChart"
            title="Credits Overview"
            class="img-fluid"
            :labels="['Passed', 'Not Passed']"
            type="donut"
            :colors="['violet', 'red']"
            :dataSets="this.donutData">
        </vue-frappe>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      donutData: [{
        values: this.dashboardData.creditsOverview
      }],
      barChartData: [{
        values: this.dashboardData.boxPlotData.grades
      }]
    }
  },
  props: [
    'dashboardData'
  ]
}
</script>