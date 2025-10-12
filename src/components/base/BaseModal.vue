
<template>
  <div v-if="open" class="modal-overlay" @click.self="emit('close')">
    <div class="modal-card">
      <div class="modal-header">
        <h2>{{ title }}</h2>
        <button class="btn ghost" @click="emit('close')">✕</button>
      </div>
      <div class="modal-body">
        <slot />
      </div>
      <div class="modal-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ open: boolean; title: string }>()
const emit = defineEmits<{ (e: 'close'): void }>()
</script>

<style scoped>
.modal-overlay { position: fixed; inset: 0; background: rgba(2, 6, 23, 0.45); display: grid; place-items: center; z-index: 50; padding: 20px; }
.modal-card { width: 100%; max-width: 720px; background: #fff; border-radius: 16px; padding: 16px; box-shadow: 0 10px 30px rgba(2,6,23,0.35); }
.modal-body { margin-top: 8px; }
.modal-footer { margin-top: 12px; display:flex; justify-content:flex-end; gap: 8px; }
</style>
