<script setup lang="ts">
</script>

<template>
  <div>
    <!-- <nav>
      <router-link to="/ExamPaper">Go ExamPaper!</router-link>
    </nav> -->
    <router-link to="/ExamPaper">Go ExamPaper!</router-link>
    <router-link to="/ExamPaper2">Go ExamPaper2!</router-link>
    <router-view />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
