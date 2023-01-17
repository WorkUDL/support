<!--<template>-->
<!--    <div>-->
<!--        <v-select v-model="selectedYear" :items="years"></v-select>-->
<!--        <v-select v-model="selectedMonth" :items="months"></v-select>-->
<!--        <v-data-table :headers="header" :items="items" @click:row="showDialog">-->
<!--        </v-data-table>-->
<!--        <v-dialog v-model="dialog" max-width="250">-->
<!--            <v-card>-->
<!--                <v-card-title class="headline">Назначить смену данному сотруднику?</v-card-title>-->
<!--                <v-card-actions>-->
<!--                    <v-spacer></v-spacer>-->
<!--                    <v-btn color="green" text @click="dialog = false">Отменить</v-btn>-->
<!--                    <v-btn color="green" text @click="dialog = false">Принять</v-btn>-->
<!--                </v-card-actions>-->
<!--            </v-card>-->
<!--        </v-dialog>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--import {mapState} from "vuex";-->
<!--export default {-->
<!--    name: "Schedule",-->
<!--    data() {-->
<!--        return {-->
<!--            selectedYear: null,-->
<!--            selectedMonth: null,-->
<!--            years: [2023, 2024, 2025, 2026, 2027],-->
<!--            months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],-->
<!--            header: [-->
<!--                {text: 'Менеджеры', align: 'start', sortable: false }-->
<!--            ],-->
<!--            items: [{name: 'Ефим'}],-->
<!--            dialog: false-->
<!--        }-->
<!--    },-->
<!--    computed: {-->
<!--        ...mapState(['currentUser', 'currentToken', 'isAdmin', 'isManager']),-->
<!--        daysInMonth() {-->
<!--            const days = new Date(this.selectedYear, this.selectedMonth, 0).getDate();-->
<!--            for (let i = 1; i <= days; i++) {-->
<!--                this.header.push({ text: i, align: "left", sortable: false });-->
<!--            }-->
<!--        }-->
<!--    },-->
<!--    methods: {-->
<!--        showDialog(item) {-->
<!--            this.dialog = true;-->
<!--        }-->
<!--    },-->
<!--    watch: {-->
<!--        selectedMonth() {-->
<!--            this.header = [-->
<!--                { text: "Менеджеры", align: "left", sortable: false },-->
<!--            ];-->
<!--            this.daysInMonth;-->
<!--        },-->
<!--        selectedYear() {-->
<!--            this.header = [-->
<!--                { text: "Менеджеры", align: "left", sortable: false },-->
<!--            ];-->
<!--            this.daysInMonth;-->
<!--        }-->

<!--    }-->
<!--}-->
<!--</script>-->

