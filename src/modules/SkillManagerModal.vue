<script setup lang="ts">
  import { ref, computed, watch, onMounted } from 'vue';
  import { fetchSkillsByTalentId, saveSkills } from './api';
  import type { Skill, SkillPayload } from './types';

  // Props
  const props = defineProps<{
    open: boolean;
    人材ＩＤ: string;
  }>();

  // Emits for v-model:open
  const emit = defineEmits<{
    (e: 'update:open', v: boolean): void;
    (e: 'saved'): void;
  }>();

  // State
  const loading = ref(false);
  const saving = ref(false);
  const rows = ref<Skill[]>([]);
  const original = ref<Skill[]>([]);

  // Track dirty changes: any row with flags or content diff
  const dirtyRows = computed(() => {
    // Flagged
    const flagged = rows.value.filter((r) => r.__isNew || r.__isEdited || r.__isDeleted);
    // Content diff (defensive, if flags missed)
    const diffs: Skill[] = [];
    for (const r of rows.value) {
      const o = original.value.find((x) => x.スキルＩＤ === r.スキルＩＤ);
      if (!o) continue;
      if (o.スキル名 !== r.スキル名 || Number(o.スキル点数) !== Number(r.スキル点数)) {
        if (!r.__isEdited) r.__isEdited = true;
        diffs.push(r);
      }
    }
    // Merge unique
    const set = new Map<string, Skill>();
    for (const s of [...flagged, ...diffs]) set.set(s.スキルＩＤ, s);
    return Array.from(set.values());
  });
  const isDirty = computed(() => dirtyRows.value.length > 0);

  // Watch open to fetch data
  watch(
    () => props.open,
    async (val) => {
      if (val) await init();
    }
  );

  async function init() {
    loading.value = true;
    try {
      const payload: SkillPayload = await fetchSkillsByTalentId(props.人材ＩＤ);
      rows.value = payload.スキル.map((s) => ({ ...s }));
      original.value = payload.スキル.map((s) => ({ ...s }));
    } finally {
      loading.value = false;
    }
  }

  function onAdd() {
    const newRow: Skill = {
      スキルＩＤ: crypto.randomUUID(),
      スキル名: '',
      スキル点数: 0,
      __isNew: true,
    };
    rows.value.push(newRow);
  }

  function onEdit(row: Skill) {
    row.__isEdited = true;
  }

  function onDelete(row: Skill) {
    // mark delete (kept in list to send deletion), but hide visually
    row.__isDeleted = true;
  }

  function visibleRows(r: Skill[]) {
    return r.filter((x) => !x.__isDeleted);
  }

  async function onSave() {
    saving.value = true;
    try {
      await saveSkills(props.人材ＩＤ, dirtyRows.value);
      // refresh baseline
      original.value = visibleRows(rows.value).map((s) => ({
        スキルＩＤ: s.スキルＩＤ,
        スキル名: s.スキル名,
        スキル点数: Number(s.スキル点数),
      }));
      rows.value = original.value.map((s) => ({ ...s }));
      emit('saved');
    } finally {
      saving.value = false;
    }
  }

  function onClose() {
    emit('update:open', false);
  }
</script>

<template>
  <v-dialog :model-value="open" max-width="900" max-height="500" persistent>
    <v-card>
      <v-toolbar density="comfortable" color="gray">
        <v-toolbar-title>スキル管理</v-toolbar-title>

        <v-card-actions class="justify-space-between">
          <div class="d-flex ga-2">
            <v-btn color="secondary" :prepend-icon="'mdi-plus'" @click="onAdd">新規登録</v-btn>
          </div>
          <div class="d-flex ga-2">
            <v-btn
              color="primary"
              :prepend-icon="'mdi-content-save'"
              :disabled="!isDirty || saving"
              :loading="saving"
              @click="onSave"
              >保存</v-btn
            >
            <v-btn color="default" :prepend-icon="'mdi-close'" @click="onClose">閉じる</v-btn>
          </div>
        </v-card-actions>
      </v-toolbar>
      <v-card-text>
        <div class="text-caption mb-2">人材ＩＤ: {{ 人材ＩＤ }}</div>

        <!-- <v-alert v-if="!isDirty" type="info" variant="tonal" class="mb-3">
          変更はありません。保存ボタンは無効です。
        </v-alert> -->

        <v-divider />

        <v-skeleton-loader v-if="loading" type="table" />
        <v-data-table
          hide-default-header
          v-else
          :items="visibleRows(rows)"
          :headers="[
            { title: 'スキル名', key: 'スキル名', width: 300 },
            { title: 'スキル点数', key: 'スキル点数', width: 140 },
            { title: '操作', key: 'actions', align: 'end', width: 200 },
          ]"
          item-key="スキルＩＤ"
          class="elevation-1 rounded-0"
          hide-default-footer
        >
          <template #item.スキル名="{ item }">
            <div class="d-flex ga-2 cell-center">
              <v-text-field
                v-model="item.スキル名"
                variant="outlined"
                density="compact"
                placeholder="例）Java"
                @update:model-value="onEdit(item)"
              />
            </div>
          </template>

          <template #item.スキル点数="{ item }">
            <div class="cell-center">
              <v-text-field
                v-model.number="item.スキル点数"
                type="number"
                min="0"
                max="100"
                step="1"
                variant="outlined"
                density="compact"
                @update:model-value="onEdit(item)"
              />
            </div>
          </template>

          <template #item.actions="{ item }">
            <div class="d-flex ga-2 justify-end">
              <v-btn color="error" :prepend-icon="'mdi-delete'" @click="onDelete(item)">削除</v-btn>
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
  /* ✅ v-text-field の高さ制御 */
  .cell-center {
    display: flex;
    align-items: center; /* 垂直中央寄せ */
    height: 100%;
  }

  /* ✅ フィールドを上下中央に合わせる */
  .cell-center .v-field {
    margin-top: auto;
    margin-bottom: auto;
  }
</style>
