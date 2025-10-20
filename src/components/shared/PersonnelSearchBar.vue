<template>
  <v-card flat class="pa-4">
    <v-row align="center" dense>
      <!-- 🔍 キーワード入力 -->
      <v-col cols="12" sm="5" md="4" lg="3">
        <v-text-field
          v-model.trim="keyword"
          label="氏名・所属会社で検索"
          placeholder="例: 山田 太郎 / ABCソリューション"
          density="comfortable"
          clearable
          hide-details
          prepend-inner-icon="mdi-magnify"
          @keyup.enter="onSearch"
        />
      </v-col>

      <!-- 🏷 BPフラグ選択 -->
      <v-col cols="12" sm="3" md="2" lg="2">
        <v-select
          v-model="bpFlag"
          label="BPフラグ"
          :items="bpOptions"
          item-title="label"
          item-value="value"
          density="comfortable"
          hide-details
          clearable
        />
      </v-col>

      <!-- 🔘 検索・クリアボタン -->
      <v-col cols="12" sm="4" md="4" lg="3" class="d-flex ga-2">
        <v-btn color="primary" prepend-icon="mdi-magnify" @click="onSearch" elevation="2">
          検索
        </v-btn>

        <v-btn color="grey" variant="outlined" prepend-icon="mdi-close" @click="onReset">
          クリア
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const emit = defineEmits<{
    (e: 'search', q: { keyword?: string; bp?: number | undefined }): void;
  }>();

  const keyword = ref<string>('');
  const bpFlag = ref<number | undefined>(undefined);

  // BP選択肢
  const bpOptions = [
    { label: '指定なし', value: undefined },
    { label: '0', value: 0 },
    { label: '1', value: 1 },
  ];

  function onSearch() {
    emit('search', { keyword: keyword.value || undefined, bp: bpFlag.value });
  }
  function onReset() {
    keyword.value = '';
    bpFlag.value = undefined;
    emit('search', { keyword: undefined, bp: undefined });
  }
</script>

<style scoped>
  .v-card {
    background-color: #fafafa;
    border-radius: 12px;
  }
  .v-btn {
    text-transform: none;
  }
</style>
