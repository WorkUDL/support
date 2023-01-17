import Vue from 'vue'
import Vuex from 'vuex'
import Bitrix24 from "bitrix24-vue"

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: {
        currentToken: null,
        currentUser: {},
        Department: {},
        isManager: false,
        isLoggedIn: false,
        isAdmin: false,
        authInfo: [],
        placementInfo: [],
        projects: [],
        dialogs: [],
        users: [],
    },
    getters: {

    },
    mutations: {
        setAuthInfo(state, data) {
            return state.authInfo = data
        },
        setCurrentToken(state, data) {
            state.currentToken = data.token
            state.currentUser = data.user
            state.isManager = data.is_manager
        },
        setCurrentUserOnline(state, data) {
            state.currentUser.online = data
        },
        setProject(state, data) {
            state.projects = data
        },
        addProject(state, data) {
            return state.projects.push(data)
        },
        addDialogs(state, data) {
            return state.dialogs = data
        },
        setUsers(state, data) {
            return state.users = data
        },
        setIsAdmin(state, data) {
            return state.isAdmin = data
        },
        setPlacementInfo(state, data) {
            console.log({
                point: 'setPlacementInfo',
                data: data
            })

            return state.placementInfo = data
        }
    },
    actions: {
        login({commit}, data){
            return new Promise((resolve, reject) => {
                axios
                    .post('/login', data)
                    .then(resp => {
                        commit('setAuthStatus', true)
                        console.log(resp)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('setAuthStatus', false)
                        reject(err)
                    })
            })
        },
        register({commit}, data){
            return new Promise((resolve, reject) => {
                axios
                    .post('/register', data)
                    .then(resp => {
                        commit('setAuthStatus', true)
                        console.log(resp)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('setAuthStatus', false)
                        reject(err)
                    })
            })
        },
        getDialogs({commit}){
            return new Promise((resolve, reject) => {
                axios
                    .get('/api/dialog/get')
                    .then(resp => {
                        commit('addDialogs',resp.data)
                        resolve(resp)
                    })
                    .catch(err => reject(err))
            })
        },
        checkAuth({commit}){
            return new Promise((resolve, reject) => {
                axios
                    .get('/api/session/check')
                    .then(resp => {
                        commit('setAuthStatus', Boolean(resp.data))
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('setAuthStatus', false)
                        reject(err)
                    })
            })
        },
        getUsers({commit}){
            return new Promise((resolve, reject) => {
                axios.post('/api/user/list', {}, {
                    headers: {
                        Authorization: 'Bearer '+this.state.currentToken
                    }
                }).then(resp => {
                    commit('setUsers', resp.data)
                    resolve(resp.data)
                }).catch(err => {
                    this.dispatch('notice', err.response.data.error)
                })
            })
        },
        notice({commit}, message){
            Bitrix24.callMethod('im.notify.system.add', {
                USER_ID: this.state.currentUser.bitrix_id,
                MESSAGE: message
            }).catch(err => {
                console.log(err)
            })
        },
        isAdmin({commit}){
            Bitrix24.callMethod('user.admin').then(resp => {
                commit('setIsAdmin', resp.answer.result)
            }).catch(err => {
                commit('setIsAdmin', false)
            })
        }
    }
})
