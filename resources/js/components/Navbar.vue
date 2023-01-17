<template>
    <v-navigation-drawer v-model="drawer"
                         color="grey"
                         dark
                         app>
        <v-sheet class="pa-4"
                 color="grey">
            <v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>
            <div>Пользователь</div>
        </v-sheet>

        <v-divider></v-divider>

        <v-list shaped>
            <v-list-group
                v-for="item in items"
                :key="item.title"
                v-model="item.active"
                :prepend-icon="item.action"
                no-action
            >
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item-content>
                </template>

                <v-list-item v-for="child in item.items" :key="child.title" :to="child.link">
                    <v-list-item-content>
                        <v-list-item-title v-text="child.title"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "Navbar",
    data() {
        return {
            drawer: null,
            items: [
                {
                    action: 'mdi-silverware-fork-knife',
                    items: [
                        {
                            title: 'Новый проект',
                            link: {
                                name: 'project-add'
                            }
                        }
                    ],
                    name: 'projects',
                    title: 'Проекты'
                },
                {
                    action: 'mdi-silverware-fork-knife',
                    items: [
                        {
                            title: 'Все',
                            link: {
                                name: 'dialog-all'
                            }
                        }
                    ],
                    title: 'Диалоги',
                },
                {
                    action: 'mdi-silverware-fork-knife',
                    items: [
                        {
                            title: 'Постановка задач',
                            link: {
                                name: 'monitoring-new-task'
                            }
                        }
                    ],
                    title: 'Настройки',
                },
                {
                    action: 'mdi-tag',
                    items: [
                        {
                            title: 'List Item',
                            link: '/promotions'
                        }
                    ],
                    title: 'Promotions'
                },
            ],
        }
    },
    computed: {
        ...mapState(['projects']),
    },
    watch: {
        projects(newVal){
            this.items.map(i => {
                if(i.name === 'projects'){
                    i.items = [{
                        title: 'Новый проект',
                        link: {
                            name: 'project-add'
                        }
                    },{
                        title: 'Тест',
                        link: {
                            name: 'project-test'
                        }
                    }].concat(newVal.map(n => {
                        return {
                            title: n.name,
                            link: {
                                name: 'project-item',
                                params: {
                                    id: n.id
                                }
                            }
                        }
                    }))
                }

                return i
            })
        }
    }
}
</script>

<style scoped>

</style>
