<template>
  <div class="progress-container">
    <div class="progress-label">
      <span>{{ label }}</span>
      <span>{{ percentage }}%</span>
    </div>
    <div class="progress-track">
      <div class="progress-fill" :style="{ width: percentage + '%', background: color }" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  percentage: number
  color?: string
}>()
</script>

<style scoped>
.progress-container { margin-bottom: 1rem; }
.progress-label { display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 0.3rem; }
.progress-track { background: #ecf0f1; border-radius: 20px; height: 12px; overflow: hidden; }
.progress-fill { height: 100%; border-radius: 20px; transition: width 0.5s ease; background: #3498db; }
</style>