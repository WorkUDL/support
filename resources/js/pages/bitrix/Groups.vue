<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="groups"
            multi-sort
            :items-per-page="10"
            class="elevation-1"
            :loading="groupLoading"
        >
            <template v-slot:item.actions="{ item }">
                <v-icon
                    small
                    class="mr-2"
                    @click="editGroup(item)"
                >
                    mdi-pencil
                </v-icon>
                <v-icon
                    small
                    @click="deleteConfirmGroup(item)"
                >
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>
        <v-btn
            class="mx-2"
            fixed
            bottom
            right
            fab
            dark
            color="indigo"
            @click="showNewGroupForm"
        >
            <v-icon dark>
                mdi-plus
            </v-icon>
        </v-btn>
        <v-dialog
            v-model="newGroupForm"
            persistent
            scrollable
            max-width="400px"
        >
            <v-card>
                <v-card-title v-if="update === null">Новая группа</v-card-title>
                <v-card-title v-else>Редактирование группы</v-card-title>
                <v-divider></v-divider>
                <v-card-text style="padding: 16px;">
                    <v-form
                        ref="newGroupForm"
                        v-model="newGroupFormValid"
                        lazy-validation
                    >
                        <v-text-field
                            v-model="name"
                            :rules="requiredRules"
                            label="Название"
                            prepend-icon="mdi-weight-kilogram"
                            required
                        />
                        <v-autocomplete
                            v-model="managers"
                            :items="users.filter(i => i.is_manager)"
                            :loading="isLoadingUsers"
                            :rules="requiredRules"
                            hide-no-data
                            item-value="id"
                            item-text="name"
                            label="Менеджеры"
                            placeholder="Введите имя получателя"
                            prepend-icon="mdi-database-search"
                            multiple
                            hide-selected
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
                                    @click:close="managers = managers.filter(i => i.id !== item.id)"
                                >
                                    <v-avatar left>
                                        <v-img :src="item.photo"></v-img>
                                    </v-avatar>
                                    {{ item.name }}
                                </v-chip>
                            </template>
                        </v-autocomplete>
                    </v-form>
                </v-card-text>

                <v-card-actions style="padding: 8px;">
                    <v-spacer/>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="newGroupForm = false"
                    >
                        Отмена
                    </v-btn>
                    <v-btn
                        :disabled="!newGroupFormValid || newGroupFormLoading"
                        :loading="newGroupFormLoading"
                        color="success"
                        @click="addGroup"
                        v-if="update === null"
                    >
                        Добавить
                    </v-btn>
                    <v-btn
                        :disabled="!newGroupFormValid || newGroupFormLoading || isLoadingUsers"
                        :loading="newGroupFormLoading"
                        color="success"
                        @click="addGroup"
                        v-else
                    >
                        Сохранить
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="openConfirm"
            persistent
            max-width="250"
        >
            <v-card>
                <v-card-title class="text-h5">
                    Подтверждение
                </v-card-title>
                <v-card-text>Удалить группу?</v-card-text>
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
                        :loading="deleteGroupLoading"
                        @click="deleteGroup"
                    >
                        Удалить
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "Groups",
    data() {
        return {
            managerList: [],
            isLoadingUsers: false,

            groupLoading: false,
            openConfirm: false,
            deleteGroupLoading: false,
            name: null,
            managers: [],

            update: null,
            newGroupForm: false,
            newGroupFormValid: false,
            newGroupFormLoading: false,

            headers: [
                {
                    text: 'Название',
                    value: 'name',
                    sortable: true
                },
                {
                    text: 'Действия',
                    value: 'actions'
                }
            ],
            groups: [],
            requiredRules: [
                v => (!!v && !!v.length) || 'Обязательное поле'
            ]
        }
    },
    watch: {
        newGroupForm(newVal){
            if(!newVal){
                this.name = null
                this.update = null
            }
        }
    },
    computed: {
        ...mapState(['currentToken', 'currentUser', 'users', 'isManager', 'isAdmin']),
    },
    methods: {
        showNewGroupForm(){
            if(this.$refs.newGroupForm)   this.$refs.newGroupForm.reset()
            this.update = null
            this.newGroupForm = true
        },
        editGroup(item){
            if(this.$refs.newGroupForm)    this.$refs.newGroupForm.reset()
            this.name = item.name
            this.update = item.id
            this.newGroupForm = true
            this.isLoadingUsers = true
            this.managers = []

            axios.post('/api/group/managers', {
                id: item.id
            }, {
                headers: {
                    Authorization: 'Bearer '+this.currentToken
                }
            }).then(resp => {
                this.managers = resp.data.map(i => {
                    return Object.assign({
                        id: i.bitrix_id.toString(),
                        name: i.name,
                        photo: i.photo,
                    }, this.users.find(u => u.id === i.bitrix_id.toString()))
                })
            }).catch(err => {
                console.log(err)
            }).finally(() => {
                this.isLoadingUsers = false
            })
        },
        deleteConfirmGroup(item){
            this.update = item.id
            this.openConfirm = true
        },
        deleteGroup(){
            this.deleteGroupLoading = true

            axios.post('/api/group/delete', {
                id: this.update
            }, {
                headers: {
                    Authorization: 'Bearer '+this.currentToken
                }
            }).then(() => {
                this.openConfirm = false
                this.groups = this.groups.filter(i => i.id !== this.update)
            }).finally(() => {
                this.deleteGroupLoading = false
            })
        },
        addGroup() {
            if(this.$refs.newGroupForm.validate()) {
                this.newGroupFormLoading = true

                if(this.update === null){
                    axios.post('/api/group/add', {
                        name: this.name,
                        managers: this.managers
                    }, {
                        headers: {
                            Authorization: 'Bearer '+this.currentToken
                        }
                    }).then(resp => {
                        this.groups.push(resp.data)
                        this.newGroupForm = false
                    }).catch(err => {
                        this.$store.dispatch('notice', err.response.data.error)
                    }).finally(() => {
                        this.newGroupFormLoading = false
                    })
                }else{
                    axios.post('/api/group/update', {
                        id: this.update,
                        name: this.name,
                        managers: this.managers
                    }, {
                        headers: {
                            Authorization: 'Bearer '+this.currentToken
                        }
                    }).then(() => this.getGroups().then(() => {
                        this.newGroupForm = false
                        this.newGroupFormLoading = false
                    })).catch(err => {
                        this.$store.dispatch('notice', err.response.data.error)
                        this.newGroupFormLoading = false
                    })
                }
            }
        },
        getGroups() {
            this.groupLoading = true

            return new Promise((resolve, reject) => {
                axios
                    .post('/api/group/list', {}, {
                        headers: {
                            Authorization: 'Bearer '+this.currentToken
                        }
                    })
                    .then(resp => this.groups = resp.data)
                    .catch(err => this.$store.dispatch('notice', err.response.data.error))
                    .finally(() => {
                        this.groupLoading = false
                        resolve()
                    })
            })
        }
    },
    mounted() {
        this.getGroups()
        this.$store.dispatch('getUsers').then(() => {
            this.loadingUsers = true
        }).catch(() => {})
    }
}
</script>

<style scoped>

</style>
