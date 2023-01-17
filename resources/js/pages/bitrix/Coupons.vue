<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="coupons"
            :loading="couponLoading"
            multi-sort
            :items-per-page="10"
            class="elevation-1"
        >
            <template v-slot:item.user_id="{ item }">
                <span>{{ getUserName(item) }}</span>
            </template>

            <template v-slot:item.status="{ item }">
                <v-chip color="green"
                        dark
                        v-if="item.status === 1"
                >
                    Активный
                </v-chip>
                <v-chip color="orange"
                        dark
                        v-else-if="item.status === 2"
                >
                    Просрочен
                </v-chip>
                <v-chip color="red"
                        dark
                        v-else-if="item.status === 3"
                >
                    Потрачен
                </v-chip>
            </template>

            <template v-slot:item.expiration_date="{ item }">
                <span>{{ new Date(item.expiration_date * 1000).toLocaleDateString() }}</span>
            </template>

            <template v-slot:item.created_at="{ item }">
                <span>{{ new Date(item.created_at * 1000).toLocaleString() }}</span>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-icon left @click="showTransferCouponForm(item)">
                    mdi-account-arrow-right
                </v-icon>
            </template>
        </v-data-table>
        <v-btn
            v-if="(isManager && isAdmin) || [78,9943,29936,42194].includes(currentUser.bitrix_id)"
            class="mx-2"
            fixed
            bottom
            right
            fab
            dark
            color="indigo"
            @click="showNewCouponForm"
        >
            <v-icon dark>
                mdi-plus
            </v-icon>
        </v-btn>
        <v-dialog
            v-model="newCouponForm"
            persistent
            max-width="400px"
        >
            <v-card>
                <v-card-title>Новый купон</v-card-title>
                <v-divider></v-divider>
                <v-form
                    ref="newCouponForm"
                    v-model="newCouponFormValid"
                    lazy-validation
                    @submit.prevent="addCoupon"
                >
                    <v-card-text>
                        <v-autocomplete
                            v-model="user"
                            :items="users"
                            :loading="isLoadingUsers"
                            :rules="requiredRules"
                            hide-no-data
                            hide-selected
                            chips
                            item-value="id"
                            item-text="name"
                            label="Получатель купона"
                            placeholder="Введите имя получателя"
                            prepend-icon="mdi-database-search"
                        >
                            <template v-slot:item="{ item }">
                                <v-list-item-avatar
                                    color="indigo"
                                    class="text-h5 font-weight-light white--text"
                                >
                                    <v-img :src="item.photo" v-if="item.photo"/>
                                    <v-icon v-else dark>mdi-account</v-icon>
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
                                    close
                                    @click:close="remove"
                                >
                                    <v-avatar left>
                                        <v-img :src="item.photo" v-if="item.photo"/>
                                        <v-icon v-else>mdi-account-circle</v-icon>
                                    </v-avatar>
                                    {{ item.name }}
                                </v-chip>
                            </template>
                        </v-autocomplete>
                        <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :return-value.sync="expiration_date"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="expiration_date"
                                    :rules="requiredRules"
                                    label="Срок годности"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="expiration_date"
                                no-title
                                scrollable
                            >
                                <v-spacer></v-spacer>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="menu = false"
                                >
                                    Cancel
                                </v-btn>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.menu.save(expiration_date)"
                                >
                                    OK
                                </v-btn>
                            </v-date-picker>
                        </v-menu>
                        <v-select
                            v-model="weight"
                            :rules="requiredWeightRules "
                            :items="[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]"
                            label="Вес"
                            prepend-icon="mdi-weight-kilogram"
                            single-line
                            required
                        />
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer/>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="newCouponForm = false"
                        >
                            Отмена
                        </v-btn>
                        <v-btn
                            :disabled="!newCouponFormValid || newCouponFormLoading"
                            :loading="newCouponFormLoading"
                            color="success"
                            type="submit"
                        >
                            Добавить
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="transferCouponForm"
            persistent
            max-width="400px"
        >
            <v-card>
                <v-card-title>Передать купон</v-card-title>
                <v-divider></v-divider>
                <v-form
                    ref="transferCouponForm"
                    v-model="transferCouponFormValid"
                    lazy-validation
                    @submit.prevent="transferCoupon"
                >
                    <v-card-text>
                        <v-autocomplete
                            v-model="user"
                            :items="users"
                            :loading="isLoadingUsers"
                            :rules="requiredRules"
                            hide-no-data
                            hide-selected
                            chips
                            item-value="id"
                            item-text="name"
                            label="Получатель купона"
                            placeholder="Введите имя получателя"
                            prepend-icon="mdi-database-search"
                        >
                            <template v-slot:item="{ item }">
                                <v-list-item-avatar
                                    color="indigo"
                                    class="text-h5 font-weight-light white--text"
                                >
                                    <v-img :src="item.photo" v-if="item.photo"/>
                                    <v-icon v-else dark>mdi-account</v-icon>
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
                                    close
                                    @click:close="remove"
                                >
                                    <v-avatar left>
                                        <v-img :src="item.photo" v-if="item.photo"/>
                                        <v-icon v-else>mdi-account-circle</v-icon>
                                    </v-avatar>
                                    {{ item.name }}
                                </v-chip>
                            </template>
                        </v-autocomplete>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer/>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="transferCouponForm = false"
                        >
                            Отмена
                        </v-btn>
                        <v-btn
                            :disabled="!transferCouponFormValid || transferCouponLoading"
                            :loading="transferCouponLoading"
                            color="success"
                            type="submit"
                        >
                            Передать
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "Coupons",
    data() {
        return {
            couponLoading: false,

            user: null,
            search: null,
            isLoadingUsers: false,

            transferCouponForm: false,
            transferCouponFormValid: false,
            transferCouponLoading: false,
            coupon_id: null,

            newCouponForm: false,
            newCouponFormValid: false,
            newCouponFormLoading: false,
            menu: false,

            expiration_date: null,
            weight: null,
            coupons: [],
            requiredRules: [
                v => (!!v && !!v.length) || 'Обязательное поле'
            ],
            requiredWeightRules: [
                v => !!v || 'Обязательное поле'
            ],

            headerBlank: [
                {
                    text: 'Код',
                    value: 'code',
                },
                {
                    text: 'Статус',
                    value: 'status'
                },
                {
                    text: 'Вес',
                    value: 'weight'
                },
                {
                    text: 'Срок годности',
                    value: 'expiration_date'
                }
            ]
        }
    },
    watch: {
        user(newVal){
            console.log(newVal)
        }
    },
    computed: {
        ...mapState(['currentToken', 'currentUser', 'isManager', 'isAdmin', 'users']),
        headers() {
            return (this.isManager && this.isAdmin) ? [{
                text: 'Владелец',
                value: 'user_id'
            }].concat(this.headerBlank, [{
                text: 'Дата создания',
                value: 'created_at'
            },{
                text: 'Действия',
                value: 'actions'
            }]) : this.headerBlank.concat([{
                text: 'Действия',
                value: 'actions'
            }])
        }
    },
    methods: {
        remove(){
            this.user = null
        },
        getUserName(item){
            let user = this.users.find(i => parseInt(i.user_id) === parseInt(item.user_id) && parseInt(item.user_id) !== 0)
            return user ? user.LAST_NAME+' '+user.NAME+' '+user.SECOND_NAME : null
        },
        getCoupons() {
            this.couponLoading = true

            axios.post('/api/coupon/list', {}, {
                headers: {
                    Authorization: 'Bearer '+this.currentToken
                }
            }).then(resp => {
                console.log(resp.data)
                this.coupons = resp.data
            }).catch(err => {
                this.$store.dispatch('notice', err.response.data.error)
            }).finally(() => {
                this.couponLoading = false
            })
        },
        addCoupon(){
            if(this.$refs.newCouponForm.validate()){
                this.newCouponFormLoading = true

                axios
                    .post('/api/coupon/add', {
                        weight: this.weight,
                        expiration_date: this.expiration_date,
                        user: this.user
                    }, {
                        headers: {
                            Authorization: 'Bearer '+this.currentToken
                        }
                    })
                    .then(resp => {
                        this.$refs.newCouponForm.reset()
                        this.coupons.push(resp.data)
                        this.newCouponForm = false
                    })
                    .catch(err => console.error(err))
                    .finally(() => this.newCouponFormLoading = false)
            }
        },
        transferCoupon(){
            if(this.$refs.transferCouponForm.validate()){
                this.transferCouponLoading = true

                axios
                    .post('/api/coupon/transfer', {
                        id: this.coupon_id,
                        user: this.user
                    }, {
                        headers: {
                            Authorization: 'Bearer '+this.currentToken
                        }
                    })
                    .then(() => {
                        this.getCoupons()
                        this.$refs.transferCouponForm.reset()
                        this.transferCouponForm = false
                    })
                    .catch(err => console.error(err))
                    .finally(() => this.transferCouponLoading = false)
            }
        },
        showNewCouponForm(){
            if(this.$refs.newCouponForm)   this.$refs.newCouponForm.reset()
            this.newCouponForm = true
        },
        showTransferCouponForm(item){
            if(this.$refs.transferCouponForm)   this.$refs.transferCouponForm.reset()
            this.transferCouponForm = true
            this.coupon_id = item.id
        }
    },
    mounted() {
        this.getCoupons()
    }
}
</script>

<style scoped>

</style>
