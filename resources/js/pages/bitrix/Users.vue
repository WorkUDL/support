<template>
    <div>
        <v-sheet
            class="pa-4"
            color="#6A76AB"
            dark
        >
            <v-text-field
                v-model="search"
                label="Поиск"
                dark
                flat
                solo-inverted
                hide-details
                clearable
                clear-icon="mdi-close-circle-outline"
            />
        </v-sheet>
        <v-data-table
            :headers="headers"
            :items="managers"
            :loading="managerLoading"
            multi-sort
            :items-per-page="10"
            class="elevation-1"
            :search="search"
        >
            <template v-slot:item.is_manager="{ item }">
                <v-switch
                    v-model="item.is_manager"
                    :loading="item.loading"
                    dense
                    style="margin: 0 0 -16px 0;"
                    @change="isManagerChange(item)"
                    v-if="isAdmin"
                />
                <v-switch
                    v-model="item.is_manager"
                    dense
                    style="margin: 0 0 -16px 0;"
                    @change="isManagerChange(item)"
                    readonly
                    v-else
                />
            </template>
        </v-data-table>
    </div>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "Managers",
    data() {
        return {
            search: null,
            managerLoading: false,
            managers: [],
            headers: [
                {
                    text: 'ID',
                    value: 'ID'
                },
                {
                    text: 'Имя',
                    value: 'name'
                },
                {
                    text: 'Должность',
                    value: 'work_position'
                },
                {
                    text: 'Менеджер поддержки',
                    value: 'is_manager'
                }
            ]
        }
    },
    computed: {
        ...mapState(['currentToken', 'currentUser', 'isManager', 'isAdmin'])
    },
    methods: {
        isManagerChange(item){
            item.loading = true

            console.log('isManagerChange')
            console.log(item)

            axios.post('/api/user/set', {
                id: item.id,
                is_manager: item.is_manager
            }, {
                headers: {
                    Authorization: 'Bearer '+this.currentToken
                }
            }).catch(err => {
                this.dispatch('notice', err.response.data.error)
            }).finally(() => {
                item.loading = false
            })
        },
    },
    mounted() {
        this.managerLoading = true

        axios.post('/api/user/list', {}, {
            headers: {
                Authorization: 'Bearer '+this.currentToken
            }
        }).then(resp => {
            this.managers = resp.data.map(i => {
                i.loading = false
                return i
            })
        }).catch(err => {
            this.dispatch('notice', err.response.data.error)
        }).finally(() => {
            this.managerLoading = false
        })
    }
}
</script>

<style scoped>

</style>
