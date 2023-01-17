import axios from 'axios'
import store from './store'

export default
axios.interceptors.response.use(
    response => {
        console.log('response ok')
        return response
    },
    error => {
        console.log('response error')

        if(error.response.status === 401){
            store.commit('setAuthStatus', false)
        }

        return Promise.reject(error)
    }
)
