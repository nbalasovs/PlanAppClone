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
    <div class="col-md-12">
      <b-table striped hover :items="items">
        <template v-slot:cell(status)="data">
          <b-badge :variant="data.value ? 'success' : 'warning'">{{ data.value ? 'Passed' : 'Failed' }}</b-badge>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      items: null,
      donutData: [{
        values: this.dashboardData.creditsOverview
      }],
      barChartData: [{
        values: this.dashboardData.boxPlotData.grades
      }]
    }
  },
  methods: {
    prepareTableData: function() {
      const items = this.courses.map(el => {
        return {
          name: el.data.name,
          code: el.data.code,
          credits: el.data.credits,
          category: el.data.category,
          type: el.data.type,
          offered: el.data.offered.match('^.+?;(.+?);')[1],
          lecturer: el.data.lecturer,
          block: el.data.block,
          grade: el.spec.grade,
          status: el.spec.isPassed
        }
      })
      this.items = items
    },
    preventReload() {
      event.preventDefault()
      event.returnValue = ""
    }
  },
  created() {
    this.prepareTableData()
  },
  beforeMount() {
    window.addEventListener("beforeunload", this.preventReload)
  },
  beforeDestroy() {
    window.removeEventListener("beforeunload", this.preventReload);
  },
  props: [
    'dashboardData',
    'courses'
  ]
}
</script>