import { createRouter, createWebHistory } from 'vue-router'
import ExamPaper from '../views/ExamPaper.vue'
import ExamPaper2 from '../views/ExamPaper2.vue'
import TalentView from '../views/TalentView.vue'

const routes = [
  { path: '/ExamPaper', name: 'ExamPaper', component: ExamPaper },
  { path: '/ExamPaper2', name: 'ExamPaper2', component: ExamPaper2 },
  { path: '/TalentView', name: 'TalentView', component: TalentView },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
