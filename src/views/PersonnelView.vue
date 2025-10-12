<template>
  <div>
    <PersonnelSearchBar @search="onSearch" />
    <div class="footer">
      <div class="row">
        <button class="btn primary" @click="openNew">＋ 新規登録</button>
        <span class="label">ダブルクリックでも編集可能</span>
      </div>
    </div>

    <PersonnelTable
      :items="items"
      @edit="openEdit"
      @delete="confirmDelete"
      @skill="openSkillManager"
    />

    <SkillManagerModal
      v-model:open="openSkill"
      :人材ＩＤ="talentId"
      @saved="() => $toast?.success?.('保存しました')"
    />

    <v-card>
      <v-card-title>タイトル</v-card-title>
      <v-card-text>内容テキストや説明をここに書きます。</v-card-text>
      <v-card-actions>
        <v-btn prepend-icon="mdi-school" variant="outlined" color="primary">OK</v-btn>
        <v-btn color="secondary">キャンセル</v-btn>
      </v-card-actions>
    </v-card>
    <!-- 
    <div class="footer">
      <BasePaginator
        :page="page"
        :size="size"
        :total="total"
        :sizes="[5,10,20,50]"
        @update:page="(v:number)=>{ page=v; fetchList(); }"
        @update:size="(v:number)=>{ size=v; page=1; fetchList(); }"
      />
      <div class="label">更新: {{ lastUpdated }}</div>
    </div> -->

    <PersonnelEditor :open="editorOpen" :value="editing" @cancel="closeEditor" @save="save" />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { Api } from '../modules/api';
  import type { Personnel } from '../modules/types';
  import PersonnelTable from '../modules/PersonnelTable.vue';
  import PersonnelEditor from '../modules/PersonnelEditor.vue';
  import PersonnelSearchBar from '../components/shared/PersonnelSearchBar.vue';
  import SkillManagerModal from '@/modules/SkillManagerModal.vue';

  // スキル管理画面
  const openSkill = ref(false);
  // Assume this comes from the parent 人材データ管理画面
  const talentId = 'c3b9c8c4-1d9f-4b68-9d79-6cfdf843a93e';

  const items = ref<Personnel[]>([]);
  const page = ref(1);
  const size = ref(10);
  const total = ref(0);
  const qKeyword = ref<string | undefined>(undefined);
  const qBp = ref<number | undefined>(undefined);
  const lastUpdated = ref('—');

  async function fetchList() {
    // const res = await Api.list({ page: page.value, size: size.value, keyword: qKeyword.value, bp: qBp.value })
    const res = {
      page: 10,
      size: 10,
      total: 1000,
      items: [
        {
          人材ID: 'b9fcb3b2-6d88-41b7-b5b4-2f1d6b24cf32',
          所属会社: 'ABCソリューション株式会社',
          名前: '山田 太郎',
          社員番号: 'A1001',
          生年月日: '19900415',
          現案件終了年月日: '20251231',
          BPフラグ: 0,
          削除フラグ: 0,
        },
        {
          人材ID: 'f2cdd908-4a2e-4e61-9a2d-73f7a38c72a1',
          所属会社: 'DEFテクノロジーズ株式会社',
          名前: '佐藤 花子',
          社員番号: 'A1002',
          生年月日: '19870620',
          現案件終了年月日: '20250630',
          BPフラグ: 0,
          削除フラグ: 0,
        },
        {
          人材ID: '6b5cc053-2682-4f14-9b62-05611b78d74f',
          所属会社: 'GHIシステムズ株式会社',
          名前: '鈴木 一郎',
          社員番号: 'A1003',
          生年月日: '19921005',
          現案件終了年月日: '20250430',
          BPフラグ: 0,
          削除フラグ: 0,
        },
        {
          人材ID: 'c6e72e4e-22b5-437b-b0d7-6a88290eb2b1',
          所属会社: 'JKLソフトウェア合同会社',
          名前: '高橋 美咲',
          社員番号: 'A1004',
          生年月日: '19981125',
          現案件終了年月日: '20250715',
          BPフラグ: 0,
          削除フラグ: 0,
        },
        {
          人材ID: 'e2ac3f3f-9827-49d7-b463-c7889c80e3a2',
          所属会社: 'MNOエンジニアリング株式会社',
          名前: '田中 健',
          社員番号: 'A1005',
          生年月日: '19891210',
          現案件終了年月日: '20260331',
          BPフラグ: 0,
          削除フラグ: 0,
        },
      ],
    };
    items.value = res.items;
    page.value = res.page;
    size.value = res.size;
    total.value = res.total;
    lastUpdated.value = new Date().toLocaleString();
  }

  function onSearch(q: { keyword?: string; bp?: number | undefined }) {
    qKeyword.value = q.keyword;
    qBp.value = q.bp;
    page.value = 1;
    fetchList();
  }

  const editorOpen = ref(false);
  const editing = ref<Personnel | null>(null);

  function openSkillManager() {
    openSkill.value = true;
  }

  function openNew() {
    editing.value = null;
    editorOpen.value = true;
  }
  function openEdit(p: Personnel) {
    editing.value = { ...p };
    editorOpen.value = true;
  }
  function closeEditor() {
    editorOpen.value = false;
  }

  async function save(p: Personnel, isNew: boolean) {
    if (isNew) await Api.create({ ...p });
    else await Api.update(p.人材ID, p);
    editorOpen.value = false;
    await fetchList();
  }

  async function confirmDelete(p: Personnel) {
    if (confirm(`削除しますか？\n${p.名前} (${p.人材ID})`)) {
      await Api.remove(p.人材ID);
      await fetchList();
    }
  }

  onMounted(fetchList);
</script>
