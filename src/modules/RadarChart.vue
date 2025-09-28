<template>
  <div class="w-full h-full">
    <!-- カードの幅に合わせて100%で表示 -->
    <Radar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Radar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, RadialLinearScale, PointElement, LineElement, Filler)

const props = defineProps({
  skills: {
    type: Array,
    required: true
  }
})

const chartData = computed(() => ({
  labels: props.skills.map(s => s.スキル名),
  datasets: [
    {
      label: 'スキルレベル',
      data: props.skills.map(s => s.スキルレベル),
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 2
    }
  ]
}))

const chartOptions = {
  responsive: true,           // カードの幅に合わせる
  maintainAspectRatio: true,  // 高さは自動調整
  scales: {
    r: {
      suggestedMin: 0,
      suggestedMax: 10,
      ticks: {
        stepSize: 1
      }
    }
  }
}
</script>
