import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// uikit lib
import SuiVue from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css';
import '../public/main.css';
Vue.use(SuiVue);

// toast lib
import Toasted from 'vue-toasted';
Vue.use(Toasted,{ 
  theme: "primary", 
  position: "bottom-center", 
  duration : 3000
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
