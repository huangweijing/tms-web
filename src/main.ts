import { createApp } from 'vue';
// import './style.css';
import App from './App.vue';
import router from './router';

// Vuetify関連のimport
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';

import './style.css';

// アイコン（Material Design Iconsなど）

const vuetify = createVuetify({
  //   defaults: {
  //     global: {
  //       density: 'compact',
  //     },
  //   },
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1976D2', // 青系テーマ
          secondary: '#2196F3',
        },
      },
    },
  },
});

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.mount('#app');
