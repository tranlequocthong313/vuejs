import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import worker from '@/mocks/browser'
import { createPinia } from 'pinia'

worker.start()

createApp(App)
    .mount(createPinia())
    .mount('#app')
