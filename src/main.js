import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Button, Card, Empty, Input, Segmented, Tag } from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import './styles/global.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Button);
app.use(Card);
app.use(Empty);
app.use(Input);
app.use(Segmented);
app.use(Tag);

app.mount('#app');
