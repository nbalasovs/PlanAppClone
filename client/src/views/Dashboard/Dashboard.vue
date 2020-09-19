<template>
  <div class="container-fluid pt-4">
    <div class="row">
      <div class="col-md-8">
        <vue-frappe
            id="barChart"
            title="Grades Overview"
            class="img-fluid"
            type="bar"
            v-if="barChartData[0].values"
            :max="10"
            :tooltipOptions="tooltipOptions"
            :labels="dashboardData.boxPlotData.names"
            :colors="['violet', 'red']"
            :dataSets="this.barChartData">
        </vue-frappe>
      </div>
      <div class="col-md-4">
        <vue-frappe
            id="donutChart"
            type="donut"
            class="img-fluid"
            v-if="barChartData[0].values"
            :title="`Credits Overview: ${donutData[0].values[0]}/180`"
            :labels="['Passed', 'Not Passed']"
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
      tooltipOptions: {
        formatTooltipX: (d) => (d + "").toUpperCase(),
        formatTooltipY: (d) => "Grade: " + d,
      },
      donutData: [{
        values: null
      }],
      barChartData: [{
        values: null
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
    }
  },
  created: function() {
    if(!this.dashboardData) {
      this.$router.push({ name: 'Home' })
    } else if(this.courses.length <= 0) {
      this.$emit('accessDenied')
      this.$router.push({ name: 'Home' })
    } else {
      this.donutData[0].values = this.dashboardData.creditsOverview
      this.barChartData[0].values = this.dashboardData.boxPlotData.grades
      this.prepareTableData()
    }
  },
  props: [
    'dashboardData',
    'courses'
  ]
}
</script>