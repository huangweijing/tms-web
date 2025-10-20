<template>
  <v-dialog v-model="openLocal" max-width="980">
    <v-card>
      <v-toolbar :color="mode === 'view' ? undefined : 'gray'" density="comfortable" flat>
        <v-toolbar-title>問題詳細（{{ titleByMode }}）</v-toolbar-title>
        <v-spacer></v-spacer>
        <template v-if="mode !== 'view'">
          <v-btn variant="tonal" prepend-icon="mdi-robot" @click="onAIGen">AI生成</v-btn>
          <v-btn color="primary" prepend-icon="mdi-content-save" @click="onSave">保存</v-btn>
          <v-btn color="error" prepend-icon="mdi-delete" v-if="mode !== 'create'" @click="onDelete"
            >削除</v-btn
          >
        </template>
      </v-toolbar>

      <template v-if="loading">
        <v-card-text>
          <v-skeleton-loader type="article" />
        </v-card-text>
      </template>

      <v-card-text v-else>
        <v-form ref="formRef">
          <div class="grid gap-4">
            <v-text-field
              v-model="model.問題ＩＤ"
              label="問題ID (UUID)"
              :disabled="true"
              :placeholder="mode === 'create' ? '(バックエンドで採番)' : ''"
            />

            <div class="grid md:grid-cols-2 gap-4">
              <v-text-field
                v-model="model.スキル"
                label="スキル (例: Java, VueJS)"
                :disabled="isReadOnly"
              />
              <v-text-field
                v-model.number="model.難易度"
                label="難易度 (1-10)"
                type="number"
                min="1"
                max="10"
                :disabled="isReadOnly"
              />
            </div>

            <v-textarea
              v-model="model.問題文章"
              label="問題文章"
              auto-grow
              :disabled="isReadOnly"
            />

            <div class="grid md:grid-cols-2 gap-4">
              <v-select
                v-model="model.模範回答"
                :items="
                  model.選択肢.map((c) => ({
                    title: `${c.選択肢文章} (${c.選択肢ＩＤ.slice(0, 8)}...)`,
                    value: c.選択肢ＩＤ,
                  }))
                "
                label="模範回答（選択肢ID）"
                :disabled="isReadOnly"
              />
              <v-switch
                v-model="autoFlag"
                :true-value="1"
                :false-value="0"
                inset
                label="自動生成フラグ"
                :disabled="isReadOnly"
              />
            </div>

            <v-textarea v-model="model.模範回答理由" label="模範回答理由" :disabled="isReadOnly" />

            <v-divider class="my-4"></v-divider>
            <div class="d-flex align-center justify-space-between">
              <div class="text-subtitle-1">選択肢</div>
              <v-btn v-if="!isReadOnly" prepend-icon="mdi-plus" @click="addChoice"
                >選択肢追加</v-btn
              >
            </div>

            <div class="d-flex flex-column" style="gap: 12px">
              <v-card v-for="(c, idx) in model.選択肢" :key="c.選択肢ＩＤ" variant="tonal">
                <v-card-text class="d-flex flex-column" style="gap: 8px">
                  <div class="grid md:grid-cols-2 gap-3">
                    <v-text-field v-model="c.選択肢ＩＤ" label="選択肢ID (UUID)" disabled />
                    <div class="d-flex align-center" style="gap: 8px">
                      <v-text-field
                        v-model="c.選択肢文章"
                        label="選択肢文章"
                        :disabled="isReadOnly"
                        class="flex-1"
                      />
                      <v-btn
                        v-if="!isReadOnly"
                        icon="mdi-delete"
                        color="error"
                        @click="removeChoice(idx)"
                      ></v-btn>
                    </div>
                  </div>
                  <v-textarea
                    v-model="c.回答理由"
                    label="回答理由（なぜ選/不選択か）"
                    :disabled="isReadOnly"
                    auto-grow
                  />
                </v-card-text>
              </v-card>
            </div>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { ref, watch, computed } from 'vue';
  import {
    getProblem,
    saveProblem,
    createProblem,
    deleteProblem,
    aiGenerateProblem,
  } from '@/api/problems';
  import type { Problem } from '@/types';

  const props = defineProps<{
    open: boolean;
    mode: 'view' | 'edit' | 'create';
    problemId?: string;
  }>();

  const emit = defineEmits<{
    (e: 'update:open', v: boolean): void;
    (e: 'saved'): void;
    (e: 'deleted'): void;
  }>();

  const openLocal = ref(props.open);
  watch(
    () => props.open,
    (v) => (openLocal.value = v)
  );
  watch(openLocal, (v) => emit('update:open', v));

  const formRef = ref();
  const model = ref<Problem>({
    問題ＩＤ: '',
    問題文章: '',
    難易度: 1,
    スキル: '',
    模範回答: '',
    模範回答理由: '',
    自動生成フラグ: 0,
    選択肢: [],
  });

  const loading = ref(false);

  const autoFlag = computed({
    get: () => model.value.自動生成フラグ,
    set: (v: number) => (model.value.自動生成フラグ = v),
  });

  const isReadOnly = computed(() => props.mode === 'view');
  const titleByMode = computed(() =>
    props.mode === 'create' ? '新規登録' : props.mode === 'edit' ? '編集' : '参照'
  );

  async function fillById(id: string) {
    loading.value = true;
    try {
      const p = await getProblem(id);
      model.value = JSON.parse(JSON.stringify(p));
    } finally {
      loading.value = false;
    }
  }

  watch(
    () => props.mode,
    async () => {
      if (props.mode === 'create') {
        model.value = {
          問題ＩＤ: '',
          問題文章: '',
          難易度: 1,
          スキル: '',
          模範回答: '',
          模範回答理由: '',
          自動生成フラグ: 0,
          選択肢: [],
        };
      } else if (props.problemId) {
        await fillById(props.problemId);
      }
    }
  );

  watch(
    () => props.problemId,
    async (id) => {
      if (props.mode !== 'create' && id) {
        await fillById(id);
      }
    },
    { immediate: true }
  );

  async function onSave() {
    if (props.mode === 'create') {
      const newId = await createProblem({
        問題文章: model.value.問題文章,
        難易度: model.value.難易度,
        スキル: model.value.スキル,
        模範回答: model.value.模範回答,
        模範回答理由: model.value.模範回答理由,
        自動生成フラグ: model.value.自動生成フラグ,
        選択肢: model.value.選択肢,
      });
      model.value.問題ＩＤ = newId;
    } else {
      await saveProblem(model.value);
    }
    emit('saved');
  }

  async function onDelete() {
    if (!model.value.問題ＩＤ) return;
    await deleteProblem(model.value.問題ＩＤ);
    emit('deleted');
  }

  async function onAIGen() {
    const gen = await aiGenerateProblem({
      スキル: model.value.スキル || undefined,
      難易度: model.value.難易度 || undefined,
    });
    if (props.mode === 'create') {
      gen.問題ＩＤ = '';
    }
    model.value = gen;
  }

  function addChoice() {
    const id =
      globalThis.crypto && 'randomUUID' in globalThis.crypto
        ? globalThis.crypto.randomUUID()
        : Math.random().toString(36).slice(2);
    model.value.選択肢.push({ 選択肢ＩＤ: id, 選択肢文章: '', 回答理由: '' });
  }

  function removeChoice(idx: number) {
    model.value.選択肢.splice(idx, 1);
  }
</script>

<style scoped>
  .grid {
    display: grid;
  }
  .gap-4 {
    gap: 1rem;
  }
  .md\:grid-cols-2 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  @media (min-width: 960px) {
    .md\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
</style>
