<template>
    <v-col>
        <v-row style="padding-bottom: 150px;" class="message_list">
            <v-list three-line style="width: 100%">
                <template>
                    <div
                        style="
                        padding: 4px;
                        color: #202326;
                        justify-content: space-between;
                        align-items: flex-start;
                        display: flex;"
                    > <div
                        style="height: 90px;"
                        v-if="isAdmin || isManager && ticketInfo"
                    >
                             Отдел продаж: {{departmentPosition}}
                        <br> Тема тикета: {{ reasonName }}
                        <br> Должность сотрудника: {{ workPosition }}
                        <br> б24.юдл.рф/company/personal/user/{{ userCreatedTicket }}/
                    </div>
                    <div></div> <!-- Этот див нужен для фиксации v-switch  -->
                        <div
                        style="height: 20px"
                        >
                            <v-switch
                                style="box-sizing: border-box;
                                margin: 0;
                                padding: 0;"
                                color="info"
                                v-model="ticketInfo"
                                @click="saveToLocalStorage"
                                v-if="isAdmin || isManager"
                            >
                            </v-switch>
                        </div>
                    </div>
                    <hr class="mt-1"
                        v-if="isAdmin || isManager && ticketInfo"
                    >
                </template>
                <template v-for="(item, index) in items">
                    <v-list-item :key="index"
                                 v-if="item.user_id === currentUser.id"
                    >
                        <v-list-item-content class="text-right">
                            <v-list-item-title>
                                <div></div>
                                <div class="font-weight-bold">{{ item.last_name }} {{ item.name }} {{ item.second_name }}</div>
                                <div class="pre">{{ item.message }}</div>
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                {{ new Date(item.date).toLocaleString() }}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-avatar class="float-right">
                            <v-img :src="item.photo"/>
                        </v-list-item-avatar>
                    </v-list-item>
                    <v-list-item :key="index" v-else>
                        <v-list-item-avatar>
                            <v-img :src="item.photo"
                                   @click="openProfile(item.bitrix_id)"
                                   style="cursor:pointer"
                            />
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>
                                <div class="font-weight-bold">{{ item.last_name }} {{ item.name }} {{ item.second_name }}</div>
                                <div class="pre">{{ item.message }}</div>
                            </v-list-item-title>
                            <v-list-item-subtitle class="grey--text caption">
                                {{ new Date(item.date).toLocaleString() }}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </v-row>
        <v-row class="sticky-bottom" v-if="active">
            <v-col>
                <v-card style="padding: 12px 12px 0 12px">
                    <v-textarea
                        v-model="message"
                        name="input-7-1"
                        label="Введите текст сообщения"
                        no-resize
                        rows="3"
                        required
                        @keydown.prevent.enter="pressKey"
                    >
                        <template v-slot:append>
                            <v-speed-dial>
                                <template v-slot:activator>
                                    <v-btn
                                        color="primary"
                                        dark
                                        fab
                                        small
                                        style="bottom: 17px"
                                    >
                                        <v-icon>mdi-widgets</v-icon>
                                    </v-btn>
                                </template>
                                <v-btn
                                    @click="archiveConfirm"
                                    fab
                                    small
                                    color="red"
                                >
                                    <v-icon
                                    color="white"
                                    >
                                        mdi-delete
                                    </v-icon>
                                </v-btn>
                                <v-btn
                                    :loading="loadingParticipants"
                                    @click="getParticipants"
                                    fab
                                    small
                                    color="blue"
                                >
                                    <v-icon
                                        color="white"
                                    >
                                        mdi-account-supervisor
                                    </v-icon>
                                </v-btn>
                                <v-btn
                                small
                                fab
                                color="green"
                                >
                                    <v-file-input
                                        class="mb-4 ml-2"
                                        color="white"
                                        hide-input
                                    ></v-file-input>
                                </v-btn>
                            </v-speed-dial>
                            <v-btn
                                class="mx-2"
                                fab
                                absolute
                                color="success"
                                small
                                :disabled="empty || message.length === 0 || sendingMessage"
                                :loading="sendingMessage"
                                style="bottom: 10px; right: -8px;"
                                @click="sendMessage"
                            >
                                <v-icon dark>
                                    mdi-send
                                </v-icon>
                            </v-btn>
                        </template>
                    </v-textarea>
                </v-card>
            </v-col>
        </v-row>
        <v-dialog
            v-model="showParticipants"
            max-width="600px"
        >
            <v-card>
                <v-card-title>Участники</v-card-title>
                <v-divider></v-divider>
                <v-data-table
                    :headers="headers"
                    :items="participants"
                    multi-sort
                    :items-per-page="10"
                    class="elevation-1"
                >
                    <template v-slot:item.user_id="{ item }">
                        {{ getUser(item) }}
                    </template>
                    <template v-slot:item.status="{ item }">
                        {{ participantStatuses[item.status] || participantStatuses[0] }}
                    </template>
                </v-data-table>
                <v-card-actions v-if="isAdmin || isManager">
                    <v-spacer/>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="showParticipants = false"
                    >
                        Отмена
                    </v-btn>
                    <v-btn
                        color="success"
                        @click="newParticipantForm = true"
                    >
                        Добавить
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="newParticipantForm"
            persistent
            scrollable
            max-width="400px"
        >
            <v-card>
                <v-card-title>Новые участники</v-card-title>
                <v-divider></v-divider>
                <v-form
                    ref="newParticipantForm"
                    v-model="newParticipantFormValid"
                    lazy-validation
                    @submit.prevent="addParticipants"
                >
                    <v-card-text style="padding: 16px;">
                        <v-autocomplete
                            v-model="newParticipants"
                            :items="users.filter(i => !participants.map(p => p.user_id).includes(i.user_id))"
                            :rules="requiredRules"
                            hide-no-data
                            item-value="id"
                            item-text="name"
                            label="Участники"
                            placeholder="Введите имя нового участника"
                            prepend-icon="mdi-database-search"
                            multiple
                            chips
                            return-object
                        >
                            <template v-slot:item="{ item }">
                                <v-list-item-avatar
                                    color="indigo"
                                    class="text-h5 font-weight-light white--text"
                                >
                                    <v-img :src="item.photo"/>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        {{ item.name }}
                                    </v-list-item-title>
                                    <v-list-item-subtitle>
                                        {{ item.work_position }}
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                            </template>
                            <template v-slot:selection="{ item }">
                                <v-chip
                                    v-bind="item.attrs"
                                    :close="isAdmin"
                                    @click:close="newParticipants = newParticipants.filter(i => i.id !== item.id)"
                                >
                                    <v-avatar left>
                                        <v-img :src="item.photo"></v-img>
                                    </v-avatar>
                                    {{ item.name }}
                                </v-chip>
                            </template>
                        </v-autocomplete>
                    </v-card-text>

                    <v-card-actions style="padding: 8px;">
                        <v-spacer/>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="newParticipantForm = false"
                        >
                            Отмена
                        </v-btn>
                        <v-btn
                            color="success"
                            :disabled="!newParticipantFormValid || newParticipantFormLoading"
                            :loading="newParticipantFormLoading"
                            type="submit"
                        >
                            Добавить
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
        <template>
            <v-row justify="center">
                <v-dialog
                    v-model="openDialog"
                    max-width="250"
                >
                    <v-card>
                        <v-card-title class="text-h5">
                            Подтверждение
                        </v-card-title>
                        <v-card-text>
                            Завершить работу с тикетом и отправить его в архив?
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                @click="openDialog = false"
                            >
                                Отмена
                            </v-btn>

                            <v-btn
                                @click="toArchive"
                                color="red"
                                dark
                            >
                               В архив
                            </v-btn>

                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </template>
    </v-col>
</template>

<script>
import {mapState} from "vuex";
import {} from "./Users.vue"
import Bitrix24 from "bitrix24-vue";
import tickets from "./Tickets.vue";

export default {
    name: "TicketMessage",
    props: {
        ticket_id: [Number, String]
    },

    data(){
        return {
            newParticipantForm: false,
            newParticipantFormValid: false,
            newParticipantFormLoading: false,
            showParticipants: false,
            ticketAction: null,
            archive: false,
            openDialog: false,
            reasonId: '',
            reasonName: '',
            loadingParticipants: false,
            userCreatedTicket: null,
            workPosition: '',
            departmentPosition: '',
            newParticipants: [],
            participants: [],
            participantStatuses: [
                'Прочие участники',
                'Ответственный сотрудник',
                'Ответственный менеджер',
                'Прочие менеджеры',
            ],
            headers: [
                {
                    text: 'Имя',
                    align: 'start',
                    value: 'user_id',
                },
                {
                    text: 'Статус',
                    value: 'status',
                }
            ],
            ticketInfo: {
                handler: function() {
                    this.saveToLocalStorage();
                },
                deep: true,
            },
            active: false,
            sendingMessage: false,
            message: null,
            scrollInvoked: 0,
            items: [],
            requiredRules: [
                v => (!!v && !!v.length) || 'Обязательное поле'
            ]
        }
    },
    computed: {
        ...mapState(['currentToken', 'currentUser', 'isManager', 'isAdmin', 'users']),
        empty(){
            return this.message === null || this.message.replace(/(\r\n|\n|\r)/gm, '').length === 0
        }
    },
    watch: {
        items(newVal){
            this.scrollToElement()

            axios
                .post('/api/message_read/read', {
                    ticket_id: this.ticket_id,
                    message_id: newVal[newVal.length - 1].id
                }, {
                    headers: {
                        Authorization: 'Bearer '+this.currentToken
                    }
                })
                .then(resp => console.log(resp.data))
                .catch(err => console.error(err))
        },
        newParticipantForm(){
            if(this.$refs.newParticipantForm)   this.$refs.newParticipantForm.reset()
        }
    },
    methods: {
        openProfile(id) {
            console.log('openProfile', id)

            BX24.openPath(
                '/company/personal/user/'+id+'/',
                result => console.log(result)
            );
        },
        pressKey(e){
            if (e.ctrlKey) {
                this.message = this.message === null ? "\n" : this.message + "\n"
            }else if(!this.empty){
                this.sendMessage()
            }
        },
        scrollToElement() {
            setTimeout(() => {
                window.scrollTo({
                    top: document.getElementsByClassName('message_list')[0].scrollHeight,
                    behavior: 'smooth',
                })
            }, 10)
        },
        getMessages(){
            axios
                .post('/api/message/get', {
                    ticket_id: this.ticket_id
                }, {
                    headers: {
                        Authorization: 'Bearer '+this.currentToken
                    }
                })
                .then(resp => this.items = resp.data.map(item => {
                    return {
                        id: item.id,
                        photo: item.photo,
                        message: item.message,
                        user_id: item.user_id,
                        bitrix_id: item.bitrix_id,
                        last_name: item.last_name,
                        name: item.name,
                        second_name: item.second_name,
                        date: item.date,
                    }
                }))
                .catch(() => this.$router.replace({
                    name: 'bitrix-tickets'
                }))
        },
        getParticipants(){
            this.loadingParticipants = true

            axios
                .post('/api/participant/list', {
                    ticket_id: this.ticket_id
                }, {
                    headers: {
                        Authorization: 'Bearer '+this.currentToken
                    }
                })
                .then(resp => {
                    this.participants = resp.data
                    this.showParticipants = true
                })
                .catch(err => this.$store.dispatch('notice', err.response.data.error))
                .finally(() => this.loadingParticipants = false)
        },
        addParticipants(){
            if(this.$refs.newParticipantForm.validate()) {
                this.newParticipantFormLoading = true

                axios
                    .post('/api/participant/add', {
                        ticket_id: this.ticket_id,
                        users: this.newParticipants,
                    }, {
                        headers: {
                            Authorization: 'Bearer '+this.currentToken
                        }
                    })
                    .then(() => {
                        this.newParticipantForm = false
                        this.getParticipants()
                    })
                    .catch(err => this.$store.dispatch('notice', err.response.data.error))
                    .finally(() => this.newParticipantFormLoading = false)
            }
        },
        sendMessage(){
            this.sendingMessage = true

            axios
                .post('/api/message/add', {
                    ticket_id: this.ticket_id,
                    message: this.message
                }, {
                    headers: {
                        Authorization: 'Bearer '+this.currentToken
                    }
                })
                .then(() => this.message = null)
                .catch(err => console.error(err))
                .finally(() => this.sendingMessage = false)
        },
        getTicket(){
            axios
                .post('/api/ticket/get', {
                    id: this.ticket_id
                }, {
                    headers: {
                        Authorization: 'Bearer '+this.currentToken
                    }
                })
                .then(resp => {
                    this.reasonId = resp.data.reason_id
                    this.active = resp.data.active
                })
                .catch(err => console.error(err))
                .finally(() => this.sendingMessage = false)
        },
        getUser(item){
            const user = this.users.find(i => i.user_id === item.user_id)
            return user ? user.name : item.user_id
        },
        getReasonName() {
            axios
                .post('/api/reason/get', {
                        id: this.reasonId
                    },
                    {
                        headers: {
                            Authorization: 'Bearer ' + this.currentToken
                        }
                    })
                .then(resp =>{
                    const reasonsList = resp.data // Список проблем
                    const result = reasonsList.filter((el) => {
                        if (this.reasonId === el.id) {
                            return el.name
                        }
                    })
                    this.reasonName = result[0].name
                })
                .catch(err => console.error(err))
        },
        dataOfCreator() {
            axios
                .post('/api/user/data', {
                    id: this.ticket_id
                }, {
                    headers: {
                        Authorization: 'Bearer '+this.currentToken
                    }
                }).then( resp => {
                    this.userCreatedTicket = resp.data
                    BX24.callBatch({
                        get_user: {
                            method: 'user.get',
                            params: {
                                ID: resp.data
                            }
                        },
                        get_department: {
                            method: 'department.get',
                            params: {
                                ID: '$result[get_user][0][UF_DEPARTMENT]'
                            }
                        }
                    }, (result) => {
                        console.log(result)
                        let l = result.get_department.data().length;
                        let wrk = result.get_user.data()[0].WORK_POSITION
                        let str = ''
                        for(let i = 0; i < l; i++)
                        {
                            str += i === 0 ? '' : ', ';
                            str += result.get_department.data()[i].NAME;
                        }
                        this.departmentPosition = str
                        this.workPosition = wrk
                    })
                    }
                    ).catch(err => console.log(err))
        },
        archiveConfirm() {
            this.openDialog = true
        },

        toArchive(){
            this.archive = true

            axios
                .post('/api/ticket/archive', {
                    id: this.ticket_id,
                    active: 0
                }, {
                    headers: {
                        Authorization: 'Bearer '+this.currentToken
                    }
                })
                .then(() => {
                    this.openDialog = false
                 console.log('Тикет отправлен в архив')
                })
                .catch(err => console.error(err))
                .finally(() => {
                    this.archive = false
                    this.$router.push({name: 'bitrix-tickets'})
                })
        },
        saveToLocalStorage() {
            localStorage.setItem('ticketInfo', this.ticketInfo);
        },
        loadFromLocalStorage() {
            const ticketInfo = localStorage.getItem('ticketInfo');
            if (ticketInfo) {
                this.ticketInfo = (ticketInfo === 'true');
            }
        },
    },

    mounted() {
        this.loadFromLocalStorage()
        this.getTicket()
        this.getMessages()
        this.getReasonName()
        this.dataOfCreator()


        this.$socket.emit('messages', {
            ticket_id: this.ticket_id
        }, response => {
            console.log('messages return')
            console.log(response)
        })
    },

    sockets: {
        connect () {
            console.log('socket connected')
        },
        messageAdd(data){
            this.items.push(data)
        }
    }
}
</script>

<style lang="scss">
.sticky-bottom {
    position: fixed;
    left: 12px;
    bottom: 12px;
    background: #fff;
    width: 100%;
}
.pre {
    white-space: pre-wrap;
}
.transit {
    height: 21px;
    width: 24px;
    padding: 1px;
}
</style>
