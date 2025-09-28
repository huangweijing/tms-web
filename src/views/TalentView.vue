<template>
  <div class="p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TalentCard v-for="t in talents" :key="t.人材ID" :talent="t" />
    </div>
  </div>
</template>

<script setup>
import TalentCard from '../modules/TalentCard.vue'

const talents = [
  {
    "人材ID": "HR001",
    "所属会社": "ABC株式会社",
    "名前": "山田 太郎",
    "生年月日": "1990-04-15",
    "スキル": [
      { "スキル名": "Java", "スキルレベル": 7 },
      { "スキル名": "Spring Boot", "スキルレベル": 6 },
      { "スキル名": "MySQL", "スキルレベル": 5 },
      { "スキル名": "AWS", "スキルレベル": 6 },
      { "スキル名": "Docker", "スキルレベル": 4 }
    ]
  },
  {
    "人材ID": "HR002",
    "所属会社": "XYZ株式会社",
    "名前": "佐藤 花子",
    "生年月日": "1992-07-23",
    "スキル": [
      { "スキル名": "JavaScript", "スキルレベル": 8 },
      { "スキル名": "Vue.js", "スキルレベル": 7 },
      { "スキル名": "Node.js", "スキルレベル": 6 },
      { "スキル名": "MongoDB", "スキルレベル": 5 },
      { "スキル名": "Docker", "スキルレベル": 6 }
    ]
  },
  {
    "人材ID": "HR003",
    "所属会社": "DEF株式会社",
    "名前": "鈴木 一郎",
    "生年月日": "1988-01-12",
    "スキル": [
      { "スキル名": "Python", "スキルレベル": 9 },
      { "スキル名": "Django", "スキルレベル": 8 },
      { "スキル名": "PostgreSQL", "スキルレベル": 7 },
      { "スキル名": "AWS", "スキルレベル": 7 },
      { "スキル名": "Kubernetes", "スキルレベル": 6 }
    ]
  }
]
</script>
