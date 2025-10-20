<template>
  <v-card variant="tonal" class="pa-4">
    <v-form @submit.prevent="emit('search')">
      <div class="grid md:grid-cols-3 gap-4">
        <v-text-field v-model="model.問題ＩＤ" label="問題ID (UUID)" clearable />
        <v-text-field v-model="model.スキルＩＤ" label="スキルID / 名" clearable />
        <v-text-field v-model="model.問題文章" label="問題文（部分一致）" clearable />

        <v-text-field v-model.number="model.難易度Min" type="number" label="難易度Min" min="1" max="10" />
        <v-text-field v-model.number="model.難易度Max" type="number" label="難易度Max" min="1" max="10" />
        <v-select
          v-model="model.自動生成フラグ"
          :items="[{title:'（指定なし）', value:''},{title:'0', value:0},{title:'1', value:1}]"
          label="自動生成フラグ"
        />
      </div>

      <div class="d-flex mt-4" style="gap: 8px">
        <v-btn color="primary" prepend-icon="mdi-magnify" type="submit">検索</v-btn>
        <v-btn variant="text" @click="reset">リセット</v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SearchQuery } from '@/types'

const props = defineProps<{ modelValue: SearchQuery }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: SearchQuery): void; (e: 'search'): void }>()

const model = computed({
  get: () => props.modelValue,
  set: (v: SearchQuery) => emit('update:modelValue', v)
})

function reset() {
  emit('update:modelValue', { ...props.modelValue, 問題ＩＤ:'', スキルＩＤ:'', 難易度Min:undefined, 難易度Max:undefined, 自動生成フラグ:'', 問題文章:'', page:1 })
  emit('search')
}
</script>

<style scoped>
.grid { display: grid; }
.gap-4 { gap: 1rem; }
.md\:grid-cols-3 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
@media (min-width: 960px) {
  .md\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
</style>
