<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="tickets"
            :loading="loadingTickets"
            :sort-by="['status','queue']"
            :sort-desc="[true,false]"
            multi-sort
            :items-per-page="perPage"
            @update:items-per-page="updatePerPage"
            class="elevation-1"
        >
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
                    >
                        mdi-message-text
                    </v-icon>
                </v-badge>
            </template>

        </v-data-table>
    </div>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "Archive",
    data() {
        return {
            perPage: null,
            loadingTickets: false,
            tickets: [],
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
        ...mapState(['currentToken']),
    },
    methods: {
        updatePerPage(val) {
          this.perPage = 10
          this.perPage = val
          this.getTickets()
        },
        getDateTime(time){
            const date = new Date(time * 1000)
            return date.toLocaleString()
        },
        openMessage(ticket){
            this.$router.push({
                name: 'bitrix-archive-message',
                params: {
                    ticket_id: ticket.id
                }
            })
        },
        getTickets(){
            this.loadingTickets = true

            axios
                .post('/api/ticket/list', {
                    page: this.perPage,
                    active: 0,
                }, {
                    headers: {
                        Authorization: 'Bearer '+this.currentToken
                    }
                })
                .then(resp => this.tickets = resp.data.map(i => {
                    i.user_id = i.user.last_name+' '+i.user.name+' '+i.user.second_name
                    return i
                }))
                .catch(err => console.error(err))
                .finally(() => this.loadingTickets = false)
        }
    },
    mounted() {
        // this.getTickets()
        this.updatePerPage()
    }
}
</script>

<style scoped>

</style>
