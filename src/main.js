import Vue from 'vue'
import App from './App.vue'
import Home from './Home.vue'
import Game from './game.vue'
import VueRouter from 'vue-router';
Vue.config.productionTip = false

Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    { path: "/", component: Home },
    { path: "/app", component: Game },
  ],
  mode: "hash",
  fallback: true
})
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
