<template>
  <div class="p-4 border rounded-lg mb-4 bg-white">
    <h2 class="font-semibold mb-1">問題: {{ question.問題文章 }}</h2>
    <p class="text-sm text-gray-500 mb-2">
      スキル分類: {{ question.スキル分類 }} / 難易度: {{ question.難易度 }}
    </p>
    <ul class="space-y-2">
      <li v-for="c in choices" :key="c.選択肢ID">
        <label class="flex items-center space-x-2">
          <input
            type="radio"
            :name="question.問題ID"
            :value="c.選択肢ID"
            v-model="modelValueLocal"
          />
          <span>{{ c.選択肢文章 }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Question {
  問題ID: string;
  問題文章: string;
  スキル分類: string;
  難易度: number;
  問題タイプ: string;
}

interface Choice {
  選択肢ID: string;
  所属問題ID: string;
  選択肢文章: string;
}

const props = defineProps<{
  question: Question;
  choices: Choice[];
  modelValue?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const modelValueLocal = computed({
  get: () => props.modelValue,
  set: (val: string) => emit("update:modelValue", val),
});
</script>
