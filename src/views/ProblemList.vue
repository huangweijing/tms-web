<template>
  <v-card class="pa-4" elevation="2">
    <div class="d-flex align-center justify-space-between mb-4" style="gap: 8px">
      <div class="text-h6">問題管理</div>
      <v-btn color="primary" prepend-icon="mdi-plus" @click="openCreate">追加登録</v-btn>
    </div>

    <v-expansion-panels variant="accordion" class="mb-2" v-model="searchPanel">
      <v-expansion-panel>
        <v-expansion-panel-title>検索条件</v-expansion-panel-title>
        <v-expansion-panel-text>
          <ProblemSearchForm v-model="query" @search="onSearch(true)" />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <template v-if="loading">
      <v-skeleton-loader type="table" class="mt-2" />
    </template>
    <template v-else>
      <ProblemTable
        class="mt-2"
        :items="items"
        :page="query.page"
        :size="query.size"
        :total="total"
        @edit="openEdit"
        @view="openView"
        @delete="confirmDelete"
        @update:page="(p: any) => ((query.page = p), onSearch())"
        @update:size="(s: any) => ((query.size = s), onSearch())"
        @row-dblclick="openEdit"
      />
    </template>

    <ProblemDetailDialog
      v-model:open="detailOpen"
      :mode="detailMode"
      :problem-id="currentId"
      @saved="onSaved"
      @deleted="onSaved"
    />

    <v-dialog v-model="deleteOpen" max-width="420">
      <v-card>
        <v-card-title class="text-h6">削除しますか？</v-card-title>
        <v-card-text>この操作は取り消せません。</v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="deleteOpen = false">キャンセル</v-btn>
          <v-btn color="error" @click="doDelete">はい、削除</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue';
  import ProblemSearchForm from '@/components/ProblemSearchForm.vue';
  import ProblemTable from '@/components/ProblemTable.vue';
  import ProblemDetailDialog from '@/components/ProblemDetailDialog.vue';
  import { searchProblems, deleteProblem } from '@/api/problems';
  import type { Problem, SearchQuery } from '@/types';

  const items = ref<Problem[]>([]);
  const total = ref(0);
  const loading = ref(false);
  const searchPanel = ref([0]);

  const query = reactive<SearchQuery>({
    問題ＩＤ: '',
    スキルＩＤ: '',
    難易度Min: undefined,
    難易度Max: undefined,
    自動生成フラグ: '',
    問題文章: '',
    page: 1,
    size: 10,
  });

  const detailOpen = ref(false);
  const detailMode = ref<'view' | 'edit' | 'create'>('view');
  const currentId = ref<string | undefined>(undefined);

  const deleteOpen = ref(false);
  const pendingDeleteId = ref<string | null>(null);

  async function onSearch(resetPage = false) {
    if (resetPage) query.page = 1;
    loading.value = true;
    try {
      const res = await searchProblems(query);
      items.value = res.items;
      total.value = res.total;
    } finally {
      loading.value = false;
    }
  }

  function openEdit(p: Problem) {
    currentId.value = p.問題ＩＤ;
    detailMode.value = 'edit';
    detailOpen.value = true;
  }

  function openView(p: Problem) {
    currentId.value = p.問題ＩＤ;
    detailMode.value = 'view';
    detailOpen.value = true;
  }

  function openCreate() {
    currentId.value = undefined;
    detailMode.value = 'create';
    detailOpen.value = true;
  }

  function confirmDelete(p: Problem) {
    pendingDeleteId.value = p.問題ＩＤ;
    deleteOpen.value = true;
  }

  async function doDelete() {
    if (!pendingDeleteId.value) return;
    await deleteProblem(pendingDeleteId.value);
    deleteOpen.value = false;
    pendingDeleteId.value = null;
    await onSearch();
  }

  async function onSaved() {
    detailOpen.value = false;
    await onSearch();
  }

  onMounted(() => {
    onSearch(true);
  });
</script>
