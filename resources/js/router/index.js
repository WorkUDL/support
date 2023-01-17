import Vue       from 'vue';
import store     from '../store';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

function loadView(view) {
    return () => import(`../pages/${view}.vue`);
}

Vue.router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    linkActiveClass: 'active',
    hashbang: false,
    routes: [
        {
            path: '/',
            name: 'home',
            component: loadView('site/Home'),
        },
        {
            path: '/de882a5907b86bcb151b4f726b19a3c0',
            name: 'bitrix',
            component: loadView('bitrix/Index'),
            redirect: {
                name: 'bitrix-tickets'
            },
            children: [
                {
                    path: 'tickets',
                    name: 'bitrix-tickets',
                    component: loadView('bitrix/Tickets')
                },
                {
                    path: 'tickets-add',
                    name: 'bitrix-tickets-add',
                    component: loadView('bitrix/TicketAdd')
                },
                {
                    path: 'tickets-message/:ticket_id',
                    name: 'bitrix-tickets-message',
                    component: loadView('bitrix/TicketMessage'),
                    props: true
                },
                {
                    path: 'coupons',
                    name: 'bitrix-coupons',
                    component: loadView('bitrix/Coupons')
                },
                {
                    path: 'groups',
                    name: 'bitrix-groups',
                    component: loadView('bitrix/Groups')
                },
                {
                    path: 'users',
                    name: 'bitrix-users',
                    component: loadView('bitrix/Users')
                },
                {
                    path: 'archive',
                    name: 'bitrix-archive',
                    component: loadView('bitrix/Archive')
                },
                {
                    path: 'tickets-archive/:ticket_id',
                    name: 'bitrix-archive-message',
                    component: loadView('bitrix/TicketMessage'),
                    props: true
                },
                // {
                //     path: 'schedule',
                //     name: 'bitrix-schedule',
                //     component: loadView('bitrix/Schedule')
                // },
            ]
        }
    ]
})

Vue.router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.authOnly)) {
        console.log('authOnly')
        console.log(to.matched)
        console.log(store.state.isLoggedIn)

        store
            .dispatch('checkAuth')
            .then(resp => {
                Boolean(resp.data) ? next() : next({ name: "auth-login" })
            })
            .catch(() => next({ name: "auth-login" }))
    } else if(to.matched.some(record => record.meta.guestOnly) && !store.state.isLoggedIn) {
        console.log('guestOnly')
        console.log(store.state.isLoggedIn)

        store
            .dispatch('checkAuth')
            .then(resp => {
                console.log('checkAuth true')
                console.log(resp)

                Boolean(resp.data) ? next({ name: "monitoring" }) : next()
            })
            .catch(() => {
                console.log('checkAuth false')
                next()
            })
    } else {
        console.log('other')
        console.log(store.state.isLoggedIn)

        next()
    }
})

export default Vue.router;
