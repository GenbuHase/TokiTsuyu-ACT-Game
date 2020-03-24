import Vue from "vue";
import Page from "./index.vue";

Vue.config.productionTip = false;

new Vue({
	render: h => h(Page)
}).$mount('#App');