<template>
  <v-container>
    <v-data-table :headers="headers" :items="items" class="elevation-1">
      <template #item.人材ID="{ item }">
        {{ item.人材ID.split('-')[0] }}
      </template>
      <template #item.skills="{ item }">
        <div class="d-flex ga-2">
          <v-btn
            prepend-icon="mdi-school"
            color="primary"
            size="small"
            @click="emit('skill', item)"
          >
            スキル
          </v-btn>
        </div>
      </template>
      <template #item.actions="{ item }">
        <div class="d-flex ga-2">
          <v-btn prepend-icon="mdi-pencil" color="primary" size="small" @click="emit('edit', item)">
            編集
          </v-btn>
          <v-btn prepend-icon="mdi-delete" color="error" size="small" @click="emit('delete', item)">
            <!-- <v-btn prepend-icon="mdi-delete" color="error" size="small" @click="emit('delete', item)"> -->
            削除
          </v-btn>
        </div>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup lang="ts">
  import type { Personnel } from './types';

  defineProps<{ items: Personnel[] }>();

  const emit = defineEmits<{
    (e: 'edit', p: Personnel): void;
    (e: 'delete', p: Personnel): void;
    (e: 'skill', p: Personnel): void;
  }>();

  // function formatYmd(s: string) {
  //   if (!s || s.length !== 8) return s;
  //   return `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}`;
  // }

  const headers = [
    { title: '人材ID', key: '人材ID' },
    { title: '所属会社', key: '所属会社' },
    { title: '名前', key: '名前' },
    { title: '社員番号', key: '社員番号' },
    { title: '生年月日', key: '生年月日' },
    { title: '現案件終了', key: '現案件終了' },
    { title: 'スキル', key: 'skills', sortable: false },
    { title: '操作', key: 'actions', sortable: false },
  ];
</script>
