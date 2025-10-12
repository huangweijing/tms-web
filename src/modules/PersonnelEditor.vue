<template>
  <!-- ダイアログ -->
  <v-dialog
    :model-value="open"
    @update:model-value="(v: any) => emit('update:open', v)"
    max-width="700px"
    persistent
  >
    <v-card>
      <!-- タイトル -->
      <v-card-title class="text-h6">
        {{ isNew ? '新規登録' : '編集' }}
      </v-card-title>

      <v-divider />

      <!-- フォーム -->
      <v-card-text>
        <v-container>
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                label="人材ID（自動生成・編集不可）"
                :model-value="model.人材ID || '(新規作成時に自動生成)'"
                disabled
                variant="outlined"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                label="所属会社"
                v-model="model.所属会社"
                variant="outlined"
                placeholder="所属会社を入力してください"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field label="名前" v-model="model.名前" variant="outlined" />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field label="社員番号" v-model="model.社員番号" variant="outlined" />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                label="生年月日（YYYYMMDD）"
                v-model="model.生年月日"
                placeholder="19900415"
                variant="outlined"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                label="現案件終了年月日（YYYYMMDD）"
                v-model="model.現案件終了年月日"
                placeholder="20251231"
                variant="outlined"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                label="BPフラグ"
                :items="[0, 1]"
                v-model="model.BPフラグ"
                variant="outlined"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                label="削除フラグ"
                :items="[0, 1]"
                v-model="model.削除フラグ"
                variant="outlined"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider />

      <!-- フッター -->
      <v-card-actions class="justify-end">
        <v-btn variant="text" color="secondary" @click="onCancel">キャンセル</v-btn>
        <v-btn variant="elevated" color="primary" @click="onSave">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { reactive, watch, computed, toValue } from 'vue';
  import type { Personnel } from './types';
  // import BaseModal from '../components/base/BaseModal.vue';

  const props = defineProps<{
    open: boolean;
    value?: Personnel | null;
  }>();
  const emit = defineEmits<{
    (e: 'cancel'): void;
    (e: 'save', value: Personnel, isNew: boolean): void;
  }>();

  const model = reactive<Personnel>({
    人材ID: '',
    所属会社: '',
    名前: '',
    社員番号: '',
    生年月日: '',
    現案件終了年月日: '',
    BPフラグ: 0,
    削除フラグ: 0,
  });

  watch(
    () => props.value,
    (v) => {
      if (v) Object.assign(model, v);
      else
        Object.assign(model, {
          人材ID: '',
          所属会社: '',
          名前: '',
          社員番号: '',
          生年月日: '',
          現案件終了年月日: '',
          BPフラグ: 0,
          削除フラグ: 0,
        });
    },
    { immediate: true }
  );

  const isNew = computed(() => !props.value || !props.value.人材ID);

  function onCancel() {
    emit('cancel');
  }

  function onSave() {
    // 人材IDは新規時のみ自動採番（画面編集不可）
    const payload: Personnel = {
      ...model,
      人材ID: isNew.value
        ? (crypto.randomUUID?.() ?? Math.random().toString(36).slice(2))
        : model.人材ID,
    };
    emit('save', payload, isNew.value);
  }
</script>
