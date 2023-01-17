<template>
    <v-app>
        <v-app-bar absolute
                   color="#6A76AB"
                   dark
                   style="position: sticky;max-height: 64px;z-index:2;"
                   v-if="auth && loadingUsers"
        >
            <v-tabs align-with-title>
                <v-tab :to="{name: 'bitrix-tickets'}">Активные тикеты</v-tab>
                <v-tab :to="{name: 'bitrix-archive'}">Архив</v-tab>
                <v-tab :to="{name: 'bitrix-coupons'}">Купоны</v-tab>
                <v-tab :to="{name: 'bitrix-groups'}" v-if="isAdmin || isManager">Группы</v-tab>
                <v-tab :to="{name: 'bitrix-users'}" v-if="isAdmin || isManager">Пользователи</v-tab>
<!--                <v-tab :to="{name: 'bitrix-schedule'}" v-if="isAdmin || isManager">График дежурств</v-tab>-->
            </v-tabs>
        </v-app-bar>

        <v-main v-if="auth && loadingUsers">
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-main>

        <div class="d-flex justify-center align-center fill-height" v-else>
            <v-progress-circular
                :size="180"
                :width="7"
                color="primary"
                indeterminate
            />
        </div>
    </v-app>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "App",
    data() {
        return {
            test: false,
            auth: false,
            loadingUsers: false,
            placementOptions: {}
        }
    },
    computed: {
        ...mapState(['isAdmin', 'isManager'])
    },
    mounted() {
        this.$Bitrix24.placementInfo().then(resp => {
            console.log(resp)
            this.placementOptions = resp.options
        }).catch(err => {
            console.error(err)
        })

        this.$store.dispatch('isAdmin')
        this.$Bitrix24.callMethod('user.current').then(user => {
            axios.post('/api/login', user.answer.result).then(login => {
                this.$store.commit('setCurrentToken', login.data)
                this.auth = true

                this.$store.dispatch('getUsers').then(() => {
                    this.loadingUsers = true
                }).catch(() => {})

                if(this.placementOptions.hasOwnProperty('ticket_id')){
                    this.$router.replace({
                        name: 'bitrix-tickets-message',
                        params: {
                            ticket_id: this.placementOptions.ticket_id
                        }
                    })
                }
            }).catch(err => {
                console.error(err)
            })
        }).catch(err => {
            console.error(err)
        })

    }
}
</script>
