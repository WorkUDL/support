/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap')

window.Vue = require('vue').default

import Vue from "vue"
import App from "./pages/App.vue"
import axiosPlugin from './axios'
import router from "./router"
import store from './store'
import vuetify from './vuetify'
import Bitrix24 from "bitrix24-vue";
import VueSocketIO from 'vue-socket.io'
import { io } from 'socket.io-client'
import VueBbob from '@bbob/vue2';

Vue.use(VueBbob);
Vue.use(Bitrix24)
Vue.component('navbar', require('./components/Navbar').default)
Vue.use(new VueSocketIO({
    debug: true,
    //connection: io('https://wa.sms19.ru:35000/web'),
    connection: io('https://sms19.ru:1002/web'),
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    }
}))

Vue.config.productionTip = false

new Vue({
    store,
    router,
    axiosPlugin,
    vuetify,
    render: h => h(App)
}).$mount("#app")
