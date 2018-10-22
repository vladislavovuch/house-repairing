import Vue from 'vue'
import Vuex  from 'vuex'
import store from './store/index'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App.vue'

Vue.use(BootstrapVue);
Vue.use(Vuex);

new Vue({
    el: '#app',
    render: h => h(App),
    store,
    data: {
        number: 0,
        statusList: [
            {
                text: "запланирован"
            },
            {
                text: "начат"
            },
            {
                text: "окончен"
            }
        ],
    }
})
