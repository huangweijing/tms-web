<template>
  <v-card>
    <v-card-text>
      <div class="d-flex align-center" style="gap: 12px; margin-bottom: 12px;">
        <v-select
          :items="[5,10,20,50]"
          :model-value="size"
          label="ページサイズ"
          style="max-width: 160px"
          @update:modelValue="v => emit('update:size', v)"
        />
        <div class="text-body-2">全 {{ total }} 件</div>
      </div>

      <v-data-table-server
        :items="items"
        :items-length="total"
        :page="page"
        :items-per-page="size"
        :headers="headers"
        item-value="問題ＩＤ"
        @update:page="p => emit('update:page', p)"
        @dblclick:row="(_, r) => emit('row-dblclick', r.item)"
      >
        <template #item.操作="{ item }">
          <div class="d-flex" style="gap: 8px">
            <v-btn size="small" color="primary" prepend-icon="mdi-pencil" @click="emit('edit', item)">編集</v-btn>
            <v-btn size="small" variant="tonal" prepend-icon="mdi-eye" @click="emit('view', item)">参照</v-btn>
            <v-btn size="small" color="error" prepend-icon="mdi-delete" @click="emit('delete', item)">削除</v-btn>
          </div>
        </template>
      </v-data-table-server>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Problem } from '@/types'

defineProps<{
  items: Problem[]
  total: number
  page: number
  size: number
}>()

const emit = defineEmits(['update:page', 'update:size', 'edit', 'delete', 'view', 'row-dblclick'])

const headers = [
  { title: '問題ID', key: '問題ＩＤ', width: 300 },
  { title: 'スキル', key: 'スキル', width: 140 },
  { title: '難易度', key: '難易度', width: 80 },
  { title: '問題文', key: '問題文章' },
  { title: '操作', key: '操作', width: 300, sortable: false }
]
</script>
