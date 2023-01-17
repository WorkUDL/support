<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="tickets"
            :loading="loadingTickets"
            multi-sort
            :items-per-page="15"
            item-key="id"
            class="elevation-1"
        >
            <template v-slot:item.status="{ item }">
                <span v-if="item.status" class="green--text">Новое сообщение</span>
            </template>

            <template v-slot:item.queue="{ item }">
                <span v-if="item.queue < 999999">{{ item.queue }}</span>
            </template>

            <template v-slot:item.created_at="{ item }">
                <span>{{ getDateTime(item.created_at) }}</span>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-badge
                    :content="item.unread"
                    :value="item.unread"
                    bordered
                    overlap
                >
                    <v-icon
                        @click="openMessage(item)"
                        color="primary"
                    >
                        mdi-message-text
                    </v-icon>
                </v-badge>
                <v-icon
                    class="ml-2"
                    color="amber darken-2"
                    v-if="item.coupon"
                >
                    mdi-ticket
                </v-icon>
                <v-icon
                    class="ml-2"
                    v-else-if="isAdmin || isManager"
                >
                    mdi-ticket
                </v-icon>
                <v-icon
                    class="ml-2"
                    @click="openCouponForm(item)"
                    v-else
                    color="orange"
                >
                    mdi-ticket
                </v-icon>
                <v-icon
                    class="ml-2"
                    @click="toArchive(item)"
                    color="red"
                >
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>
        <v-dialog
            v-model="openConfirm"
            persistent
            max-width="250"
        >
            <v-card>
                <v-card-title class="text-h5">
                    Подтверждение
                </v-card-title>
                <v-card-text>Завершить работу с тикетом и отправить его в архив?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        text
                        @click="openConfirm = false"
                    >
                        Отмена
                    </v-btn>
                    <v-btn
                        color="red"
                        dark
                        :loading="transferingToArchive"
                        @click="transferToArchive"
                    >
                        В архив
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="openCoupon"
            persistent
            max-width="300"
        >
            <v-card>
                <v-card-title class="text-h5">
                    Применить купон
                </v-card-title>
                <v-form
                    ref="couponForm"
                    v-model="validCouponForm"
                    @submit.prevent="ApplyCoupon"
                    lazy-validation
                >
                    <v-card-text>
                        <v-autocomplete
                            v-model="couponCode"
                            :disabled="couponCodesLoading"
                            :items="couponCodes"
                            :rules="couponRules"
                            label="Купон"
                            no-data-text="Нет доступных купонов"
                            item-text="code"
                            item-value="code"
                        >
                            <template v-slot:selection="{item}">
                                {{ item.code }} (+{{ item.weight }})
                            </template>
                            <template v-slot:item="{item}">
                                <template>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            {{ item.code }} (+{{ item.weight }})
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            Годен до: {{ new Date(item.expiration_date * 1000).toLocaleDateString() }}
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </template>
                            </template>
                        </v-autocomplete>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            @click="openCoupon = false"
                        >
                            Отмена
                        </v-btn>
                        <v-btn
                            :disabled="!validCouponForm"
                            color="primary"
                            :loading="loadingCouponForm"
                            type="submit"
                        >
                            Применить
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
        <v-btn
            class="mx-2"
            fixed
            bottom
            dark
            :color="!isOnline ? 'indigo' : 'red'"
            @click="setOnline(!isOnline)"
            v-if="isAdmin || isManager"
        >
            {{ !isOnline ? 'Получить тикеты' : 'Завершить работу' }}
        </v-btn>
        <v-btn
            class="mx-2"
            fixed
            bottom
            right
            fab
            dark
            color="indigo"
            :to="{name: 'bitrix-tickets-add'}"
        >
            <v-icon dark>
                mdi-plus
            </v-icon>
        </v-btn>
    </div>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "Success",
    data() {
        return {
            loadingTickets: false,
            openConfirm: false,
            validCouponForm: false,
            loadingCouponForm: false,
            // idReasons: [],
            // nameTickets: [],
            readyWorking: false,
            openCoupon: false,
            couponCode: null,
            couponCodesLoading: false,
            couponCodes: [],
            couponRules: [
                v => !!v || 'Не указали номер купона',
            ],
            tickets: [],
            transferingToArchive: false,
            ticketAction: null,
            statusName: [
                'Сообщений нет',
                'Ожидает ваших действий',
                'Ожидает ответа',
                'Новое сообщение',
            ],
            headers: [
                {
                    text: 'Создатель',
                    align: 'start',
                    value: 'user_id',
                },
                {
                    text: 'Проблема',
                    value: 'name',
                },
                {
                    text: 'Статус',
                    value: 'status'
                },
                {
                    text: 'Очередь',
                    value: 'queue'
                },
                {
                    text: 'Дата создания',
                    value: 'created_at'
                },
                {
                    text: 'Действия',
                    sortable: false,
                    value: 'actions'
                }
            ],
        }
    },
    computed: {
        ...mapState(['currentUser','currentToken', 'isAdmin', 'isManager']),
        isOnline: {
            get() { return !!this.$store.state.currentUser?.online; },
            set(value) { this.$store.commit('setCurrentUserOnline', value); },
        },
    },
    methods: {
        getDateTime(time){
            const date = new Date(time * 1000)
            return date.toLocaleString()
        },
        openMessage(ticket){
            this.$router.push({
                name: 'bitrix-tickets-message',
                params: {
                    ticket_id: ticket.id
                }
            })
        },
        openCouponForm(ticket){
            if(this.$refs.couponForm){
                this.$refs.couponForm.reset()
            }

            this.openCoupon = true
            this.couponCodesLoading = true
            this.ticketAction = ticket.id

            axios.post('/api/coupon/list', {}, {
                headers: {
                    Authorization: 'Bearer '+this.currentToken
                }
            }).then(resp => {
                this.couponCodes = resp.data.filter(i => i.status === 1)
            }).catch(err => {
                this.$store.dispatch('notice', err.response.data.error)
            }).finally(() => {
                this.couponCodesLoading = false
            })
        },
        ApplyCoupon(){
            if(this.$refs.couponForm.validate()){
                this.loadingCouponForm = true

                axios
                    .post('/api/coupon/apply', {
                        ticket_id: this.ticketAction,
                        code: this.couponCode
                    }, {
                        headers: {
                            Authorization: 'Bearer '+this.currentToken
                        }
                    })
                    .then(() => {
                        this.openCoupon = false
                        this.getTickets()
                        this.$store.dispatch('notice', 'Купон принят')
                    })
                    .catch(err => this.$store.dispatch('notice', err.response.data.error))
                    .finally(() => this.loadingCouponForm = false)
            }
        },
        toArchive(ticket){
            this.openConfirm = true
            this.ticketAction = ticket.id
        },
        transferToArchive(){
            this.transferingToArchive = true

            axios
                .post('/api/ticket/archive', {
                    id: this.ticketAction,
                    active: 0
                }, {
                    headers: {
                        Authorization: 'Bearer '+this.currentToken
                    }
                })
                .then(() => {
                    this.tickets = this.tickets.filter(t => t.id !== this.ticketAction)
                    this.openConfirm = false
                })
                .catch(err => console.error(err))
                .finally(() => this.transferingToArchive = false)
        },
        // showConfirm(){
        //     this.openConfirm = true
        // },
        getTickets(){
                this.loadingTickets = true

                axios
                    .post('/api/ticket/list', {}, {
                        headers: {
                            Authorization: 'Bearer ' + this.currentToken
                        }
                    })
                    .then(resp => {
                        this.tickets = resp.data.map(ticket => {
                            if (ticket.queue === null) {
                                ticket.queue = 999999
                            }
                            ticket.user_id = ticket.user.last_name + ' ' + ticket.user.name + ' ' + ticket.user.second_name
                            console.log(ticket)
                            // this.nameTickets.push(ticket.name)
                            return ticket
                        })
                        // console.log(this.nameTickets);
                    })
                    .catch(err => console.error(err))
                    .finally(() => this.loadingTickets = false)

        },

        // getReasonId() {
        //     axios
        //         .post('/api/reason/get', {}, {
        //             headers: {
        //                 Authorization: 'Bearer '+this.currentToken
        //             }
        //         })
        //         .then(resp => {
        //             console.log(resp.data)
        //             const result = resp.data.filter((el) => {
        //                 for (let i = 0; i<this.nameTickets.length; i++){
        //                     if (this.nameTickets[i] === el.name) {
        //                         this.idReasons.push(el.id)
        //                         return true
        //                     }
        //                 }
        //                 return false
        //             })
        //             console.log(this.idReasons)
        //         })
        //         .catch(err => console.error(err))
        // },
        setOnline(status) {
            axios
                .post('/api/user/is_online', {
                    status
                }, {
                    headers: {
                        Authorization: 'Bearer '+this.currentToken
                    }
                }).then(resp => {
                    this.getTickets()
                    this.isOnline = status
                    console.log(resp)
                })
                .catch(err => console.log(err))
        },

        takeTickets() {
            axios
                .post('/api/user/take_tickets', {
                    manager_id: this.currentUser.id
                },  {
                    headers: {
                        Authorization: 'Bearer '+this.currentToken
                    }
                    }
                ).then(resp => {
                    console.log(resp);
                }
                )
                .catch(err => console.log(err))
        },
    },
    mounted() {
        this.takeTickets()
        this.getTickets()
        // this.getReasonId()
    }
}
</script>

<style scoped>

</style>
