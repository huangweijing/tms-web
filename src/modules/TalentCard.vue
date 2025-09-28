<template>
  <div class="bg-white shadow-md rounded-lg p-6 flex">
    <!-- 左側 レーダーチャート -->
    <div class="w-2/3 flex justify-center items-center">
      <RadarChart :skills="talent.スキル" />
    </div>

    <!-- 右側 プロフィール -->
    <div class="w-1/3 pl-6 flex flex-col justify-center">
      <h2 class="text-base font-bold">{{ talent.名前 }}</h2>
      <p class="text-xs text-gray-600">{{ talent.所属会社 }}</p>
      <p class="text-xs text-gray-500">生年月日: {{ talent.生年月日 }}</p>
    </div>
  </div>
</template>

<script setup>
import RadarChart from './RadarChart.vue'

defineProps({
  talent: {
    type: Object,
    required: true
  }
})
</script>
