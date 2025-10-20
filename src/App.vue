<script setup lang="ts"></script>

<template>
  <v-app>
    <v-container class="pa-8 text-center">
      <h1 class="text-h5 mb-6">Demo Navigation Menu</h1>

      <v-row justify="center" class="ga-4">
        <v-col cols="auto">
          <RouterLink to="/ExamPaper">
            <v-btn color="primary" prepend-icon="mdi-file-document-outline" variant="elevated">
              Exam Paper
            </v-btn>
          </RouterLink>
        </v-col>

        <v-col cols="auto">
          <RouterLink to="/ExamPaper2">
            <v-btn color="secondary" prepend-icon="mdi-file-edit-outline" variant="elevated">
              Exam Paper 2
            </v-btn>
          </RouterLink>
        </v-col>

        <v-col cols="auto">
          <RouterLink to="/TalentView">
            <v-btn color="info" prepend-icon="mdi-account-star-outline" variant="elevated">
              Talent View
            </v-btn>
          </RouterLink>
        </v-col>

        <v-col cols="auto">
          <RouterLink to="/PersonnelView">
            <v-btn color="success" prepend-icon="mdi-account-group-outline" variant="elevated">
              Personnel View
            </v-btn>
          </RouterLink>
        </v-col>

        <v-col cols="auto">
          <RouterLink to="/ProblemList">
            <v-btn color="error" prepend-icon="mdi-clipboard-list-outline" variant="elevated">
              Problem List
            </v-btn>
          </RouterLink>
        </v-col>
      </v-row>

      <v-divider class="my-6" />

      <router-view />
    </v-container>
  </v-app>
</template>

<style scoped>
  h1 {
    font-weight: 600;
    letter-spacing: 0.5px;
  }
</style>
