import Vue from 'vue'
import App from './app.vue'
import Game from './game.vue'
import VueRouter from 'vue-router';
Vue.config.productionTip = false

Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    { path: "*", component: Game },
  ],
  mode: "history",
  fallback: true
})
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
