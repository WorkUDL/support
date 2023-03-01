<template>
    <v-row
        justify="space-between"
        max-height="100%"
        style="height: calc(100vh - 64px);"
    >
        <v-col cols="5">
            <v-sheet
                class="pa-4"
                color="#6A76AB"
                dark
            >
                <v-text-field
                    v-model="search"
                    label="Поиск по названию проблемы"
                    dark
                    flat
                    solo-inverted
                    hide-details
                    clearable
                    clear-icon="mdi-close-circle-outline"
                />
            </v-sheet>
            <v-treeview
                :active.sync="active"
                :items="items"
                :search="search"
                :open.sync="open"
                @update:active="getParentId"
                activatable
                color="warning"
                transition
                style="overflow-y: auto;max-height: calc(100vh - 168px);"
            >
                <template v-slot:prepend="{ item }">
                    <v-icon v-if="!item.children && reasonsActive && reasonsActive.id === item.id" color="primary">
                        mdi-radiobox-marked
                    </v-icon>
                    <v-icon v-else-if="!item.children" color="black">
                        mdi-radiobox-blank
                    </v-icon>
                    <v-icon v-else color="black">
                        mdi-google-circles-extended
                    </v-icon>
                </template>
                <template v-slot:append="{ item }">
                    <v-icon @click="showFormAddReason(item, true)" v-if="isAdmin || isManager" small>
                        mdi-pencil
                    </v-icon>
                    <v-icon @click="showFormAddReason(item)" v-if="isAdmin || isManager">
                        mdi-plus
                    </v-icon>
                    <v-icon @click="showFormAddTemplate(item)" v-if="isAdmin || isManager" small>
                        mdi-pencil-plus-outline
                    </v-icon>
                </template>
            </v-treeview>
        </v-col>
        <v-col style="padding: 12px 12px 12px 0;overflow-y: auto;max-height: calc(100vh - 60px);">
            <v-row v-if="!reasonsActive || reasonsActive.children">
                <v-col>
                    <v-card>
                        <v-card-text>
                            Выбери проблему
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row v-else>
                <v-col y-axis="end">
                    <v-expansion-panels
                        v-if="!skippedHint && hints.length"
                        v-model="openedHint"
                        class="mb-4"
                    >
                        <v-expansion-panel v-for="item in hints" :key="item.id" single-expand>
                            <v-expansion-panel-header @click="getHintId(item.id)" v-html="item.short"/>
                            <v-expansion-panel-content>
                                <v-row style="white-space: pre;">
                                    <v-col cols="12" v-if="item.full">
                                        <bbob-bbcode container="div" style="white-space: pre-wrap;">{{ item.full }}</bbob-bbcode>  <!-- текст подсказки -->
                                        <v-checkbox v-model="item.checked" color="green" label="Изучено" class="float-right"/>
                                    </v-col>
                                    <v-col cols="12" v-if="item.iframe">
                                        <iframe style="max-width: 100%;"
                                            width="560"
                                            height="315"
                                            frameborder="0"
                                            :src="item.iframe"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowfullscreen
                                        />
                                    </v-col>
                                    <v-col cols="6">
                                        <v-btn
                                        text
                                        color="primary"
                                        small
                                        @click="showFormAddImage"
                                        v-if="isManager || isAdmin"
                                        >
                                        Добавить изображение
                                        </v-btn>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-btn
                                        text
                                        color="primary"
                                        small
                                        @click="getImage"
                                        >
                                            Просмотреть изображения
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>

                    <v-btn
                        color="primary"
                        v-if="!skippedHint && hints.length && checkedHint"
                        @click="skippedHint = true"
                        class="float-right"
                    >Рекомендации не помогли</v-btn>
                    <v-card
                    v-else-if="!checkedHint"
                    >
                        <v-card-text>
                            Изучите все подсказки, после появится возможность создать тикет!
                        </v-card-text>
                    </v-card>

                    <v-card v-if="skippedHint || !hints.length">
                        <v-card-text>
                            <v-textarea
                                v-model="ticket_information"
                                v-if="ticket_information_show || ticket_information_loading"
                                :loading="ticket_information_loading"
                                readonly
                                auto-grow
                                outlined
                                label="Дополнительные сведения"
                            />

                            <v-form
                                ref="formTicket"
                                v-model="validTicket"
                                lazy-validation
                                @submit.prevent="addTicket"
                            >
                                <v-select
                                    v-model="selectedData"
                                    :items="callData"
                                    :item-text="item => item.department"
                                    :item-value="item => item"
                                    label="Выберите город"
                                    :active="active"
                                    v-if="active == 109"
                                    search-input
                                >
                                    <!--Этот элемент привязан к id проблемы(reason) нужно заменить на актуальный id,  "==" на "===" не менять!-->
                                </v-select>
                                <v-select
                                    v-model="selectedData"
                                    :items="bitrixData"
                                    :item-text="item => item.department"
                                    :item-value="item => item"
                                    label="Выберите город"
                                    :active="active"
                                    v-if="active == 108"
                                    search-input
                                >
                                    <!--Этот элемент привязан к id проблемы(reason) нужно заменить на актуальный id,  "==" на "===" не менять!-->
                                </v-select>
                                <v-textarea
                                    v-model="ticket_message"
                                    :rules="requiredRules"
                                    auto-grow
                                    outlined
                                    clearable
                                    clear-icon="mdi-close-circle"
                                    label="Подробно распишите суть проблемы"
                                />
                                <v-text-field
                                    :rules="parentId === 5 ? requiredRules : []"
                                    v-model="anyDeskNumber"
                                    v-show="parentId === 5"
                                    label="Введите номер вашего AnyDesk"
                                    type="number" min="1">
<!--                                в parentId нужно указать id проблемы(группы) Комьютер-->
                                </v-text-field>
                                <v-row>
                                    <v-col>
                                        <v-btn
                                            :disabled="!valid"
                                            color="success"
                                            class="mr-4"
                                            :loading="addingTicket"
                                            type="submit"
                                        >
                                            Добавить
                                        </v-btn>
                                        <v-btn
                                            color="error"
                                            @click="$refs.formTicket.reset()"
                                        >
                                            Сброс
                                        </v-btn>
                                        <v-btn
                                            v-if="isManager || isAdmin"
                                            color="primary"
                                            @click="showFormAddHint"
                                            class="float-right"
                                        >
                                            Новая подсказка
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
        <v-dialog
            v-model="newReasonDialog"
            persistent
            max-width="350px"
        >
            <v-card>
                <v-card-title v-if="editId === null">Новая проблема</v-card-title>
                <v-card-title v-else>Редактирование проблемы</v-card-title>
                <v-divider></v-divider>
                <v-form
                    ref="formAddReason"
                    v-model="valid"
                    lazy-validation
                    @submit.prevent="addReason"
                >
                    <v-card-text>
                        <v-text-field
                            v-model="name"
                            :rules="requiredRules"
                            label="Название"
                            prepend-icon="mdi-message-text"
                            required
                        />
                        <v-select
                            v-model="weight"
                            :rules="requiredRules"
                            :items="[1,2,3,4,5,6,7,8,9,10,30]"
                            label="Вес"
                            prepend-icon="mdi-weight-kilogram"
                            single-line
                            required
                        />
                        <v-select
                            v-model="group_id"
                            :rules="requiredRules"
                            :items="groups"
                            label="Группа"
                            item-text="name"
                            item-value="id"
                            prepend-icon="mdi-account-multiple"
                            single-line
                            required
                        />
                        <v-select
                            v-model="visibility"
                            :rules="requiredRules"
                            :items="[{
                                value: 1,
                                text: 'Для всех'
                            },{
                                value: 2,
                                text: 'Только РОП'
                            },{
                                value: 3,
                                text: 'Для студента'
                            },{
                                value: 4,
                                text: 'СБ'
                            }]"
                            label="Целевая аудитория"
                            prepend-icon="mdi-account-group"
                            single-line
                            required
                        />
                        <v-select
                            v-model="information_id"
                            :items="information"
                            label="Дополнительная информация"
                            item-text="name"
                            item-value="id"
                            prepend-icon="mdi-information-variant"
                            single-line
                        />
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer/>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="newReasonDialog = false"
                        >
                            Отмена
                        </v-btn>
                        <v-btn
                            :disabled="!valid"
                            :loading="reasonAddLoading"
                            color="success"
                            type="submit"
                            v-if="editId === null"
                        >
                            Добавить
                        </v-btn>
                        <v-btn
                            :disabled="!valid"
                            :loading="reasonAddLoading"
                            color="success"
                            type="submit"
                            v-else
                        >
                            Сохранить
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="dialogCreateTemplate"
            :width="550"
        >
            <v-card>
                <v-card-title>Введите текст для создания шаблонного ответа</v-card-title>
                <v-col md-4>
                    <v-text-field v-model="messageCreateTemplate"
                                  required
                    ></v-text-field>
                </v-col>
                <v-card-actions>
                    <v-btn @click="closeCreateTemplate">Закрыть</v-btn>
                    <v-btn @click="addTemplate"
                           color="success"
                    >Создать</v-btn>
                </v-card-actions>
                <v-card-title>Шаблонные ответы в данной теме:</v-card-title>
                <v-card v-for="template in templateResponses" :key="template" class="pa-2 justify-content-between d-flex">
                    {{ template.length > 25 ? template.slice(0,25)+'...' : template }}
                    <v-icon
                        @click="deleteTemplate(template)"
                        color="red"
                        class="ml-2">
                        mdi-close
                    </v-icon>
                </v-card>
                <v-card v-if="templateResponses.length < 1" class="pa-2">В данной теме шаблонные ответы отсутствуют</v-card>
            </v-card>
        </v-dialog>
        <v-dialog
        v-model="dialogImageForSolutions"
        max-width="600"
        >
            <v-card>
                <v-card-title> Пошаговая инструкция: </v-card-title>
                    <v-col cols="12" v-for="(image, id) in imagesForDisplay" :key="id" class="d-flex align-items-center">
                        <img :src="image" class="pa-2"
                             style="width: 304px;
                             margin-left: 20%;
                             height: 210px;
                             cursor: pointer;"
                             @click="dialogFullImage = true; currentImg = image"
                        >
                        <v-icon
                        v-if="isManager || isAdmin"
                        color="red"
                        @click="deleteImage(image, id)"
                        >
                            mdi-close
                        </v-icon>
                    </v-col>
                <v-card-actions>
                    <v-btn
                    text
                    @click="dialogImageForSolutions = false"
                    >Закрыть</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
        v-model="dialogFullImage"
        max-width="1000"
        >
          <v-card>
              <v-img href="#" :src="currentImg"></v-img>
              <v-card-actions>
                  <v-btn color="primary" text @click="dialogFullImage = false">Закрыть</v-btn>
              </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog
            v-model="dialogImageForAdd"
            max-width="600"
        >
            <v-card>
                <v-card-title> Прикрепите изображения </v-card-title>
                        <v-file-input
                            @change="addImage"
                            @paste.prevent="addImage"
                            v-model="image"
                            ref="fileInput"
                            class="mb-9 pa-2"
                            v-if="!isImageUploading"
                        >

                        </v-file-input>
                        <div v-if="isImageUploading"
                             class="mb-9"
                        >
                            <v-progress-circular
                                indeterminate
                                color="primary"
                            ></v-progress-circular>
                            <p>Загрузка изображения...</p>
                        </div>
                    <v-col cols="12" v-show="imagesForAdd.length > 0">
                        <v-card-title>Прикрепленные изображения:</v-card-title>
                        <v-card v-for="(image, index) in imagesForAdd" :key="index" class="pa-1 ma-1 d-inline-block">
                            {{ image.name }}
                            <v-icon small color="red" @click="imagesForAdd.splice(index, 1)">
                                mdi-close
                            </v-icon>
                        </v-card>
                    </v-col>
                <v-card-actions>
                        <v-btn
                            text
                            @click="dialogImageForAdd = false"
                        >Отмена</v-btn>
                        <v-btn
                            @click="createImage"
                            text
                            color="primary"
                        >Добавить</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="openFormAddHint"
            persistent
        >
            <v-card>
                <v-card-title class="text-h5">
                    Новая подсказка
                </v-card-title>
                <v-form
                    ref="formAddHint"
                    v-model="validFormAddHint"
                    lazy-validation
                    @submit.prevent="addHint"
                >
                    <v-row class="ma-0">
                        <v-col cols="12" sm="6">
                            <v-text-field
                                v-model="shortHint"
                                :rules="requiredRules"
                                outlined
                                label="Короткое описание"
                            />
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                v-model="iframeHint"
                                outlined
                                label="Ссылка на видео (https://www.youtube.com/embed/MmdKeypSxE8)"
                            />
                        </v-col>
                        <v-col cols="12">
                            <v-textarea
                                v-model="fullHint"
                                :rules="requiredRules"
                                auto-grow
                                outlined
                                clearable
                                clear-icon="mdi-close-circle"
                                label="Подробное описание действий"
                            />
                        </v-col>
                    </v-row>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            @click="openFormAddHint = false"
                        >
                            Отмена
                        </v-btn>
                        <v-btn
                            v-model="imagesForAdd"
                            color="success"
                            type="submit"
                            :disabled="!validFormAddHint || addingHint"
                            :loading="addingHint"
                        >
                            Добавить
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import {mapState} from "vuex";
import Bitrix24 from "bitrix24-vue";

export default {
    name: "TicketAdd",
    data() {
        return {
            openedHint: [],
            validFormAddHint: false,
            openFormAddHint: false,
            addingHint: false,
            shortHint: null,
            fullHint: null,
            iframeHint: null,
            skippedHint: false,

            dialogCreateTemplate: false,
            messageCreateTemplate: '',
            templateResponses: [],
            visibility: null,
            search: null,
            active: [],
            parentId: null,
            avatar: null,
            open: [],
            weight: null,
            group_id: null,
            groups: [],
            reasonId: null,
            reasonAddLoading: false,
            reasonsActive: null,
            reasonsList: [],
            reasons: [],
            newReasonDialog: false,
            valid: true,
            validTicket: true,
            name: '',
            requiredRules: [
                v => !!v || 'Обязательное поле'
            ],
            information: [{
                id: 0,
                name: 'Без дополнительной информации',
            }],
            information_id: null,
            ticket_information: null,
            ticket_information_loading: false,
            ticket_information_show: false,
            ticket_message: null,
            hintList: [],
            addingTicket: false,
            anyDeskNumber: null,

            image: null,
            imagesForAdd: [],
            imagesForDisplay: [],
            isImageUploading: false,
            dialogImageForSolutions: false,
            dialogImageForAdd: false,
            dialogFullImage: false,
            currentImg: null,
            hintActive: null,

            selectedData: null,
            callData: [],
            bitrixData: [],

            editId: null
        }
    },
    computed: {
        ...mapState(['currentToken', 'currentUser', 'isManager', 'isAdmin']),
        items () {
            return (this.isManager && this.isAdmin)
                ? this.buildTree(this.reasonsList)
                : this.buildTree(this.reasonsList, 0)
        },
        hints(){
            console.log(this.hintList)
            this.openedHint = this.hintList.filter(h => h.reason_id === this.reasonsActive.id).length === 1 ? [0] : []
            return this.hintList.filter(h => h.reason_id === this.reasonsActive.id)
        },
        checkedHint()  {
            const filteredItems = this.hints.filter(item => this.reasonsActive.id === item.reason_id && item.checked)
            return filteredItems.length === this.hints.length
        },
    },
    watch: {
        active(newVal){
            if(newVal == 108) {
                this.getListBitrixData()
            }
            if(newVal == 109) {
                this.getListCallData()
            }
            if(newVal.length >= 1 && !this.reasonsList.find(user => user.id === newVal[0]).children){
                if(this.$refs.formTicket)   this.$refs.formTicket.reset()

                this.reasonsActive = this.reasonsList.find(user => user.id === newVal[0])
                this.skippedHint = false
                this.ticket_information_show = false
                this.ticket_information = null

                if(this.reasonsList.find(r => r.id === newVal[0]).information_id){
                    this.ticket_information_loading = true

                    axios.post('/api/reason/information', {
                        id: newVal
                    }, {
                        headers: {
                            Authorization: 'Bearer '+this.currentToken
                        }
                    }).then(resp => {
                        this.ticket_information = resp.data.join('\n')
                        console.log(this.ticket_information);
                        this.ticket_information_show = true
                    }).catch(err => {
                        console.error(err)
                    }).finally(() => {
                        this.ticket_information_loading = false
                    })
                }
            }
        },
    },
    methods: {
        closeCreateTemplate() {
            this.dialogCreateTemplate = false
            this.templateResponses = []
            this.messageCreateTemplate = ''
        },
        addTemplate() {
            axios
                .post('/api/template_response/add', {
                    template_response: this.messageCreateTemplate,
                    reason_id: this.editId
                }, {
                    headers: {
                        Authorization: 'Bearer '+this.currentToken
                    }
                }).then(res => {
                    console.log(res)
                    this.templateResponses = []
                    this.getTemplates()
                    this.messageCreateTemplate = ''
                })
                .catch(err => console.log(err))
                .finally(this.messageCreateTemplate = '')
        },
        getTemplates() {
            axios
                .post('/api/template_response/get', {
                    reason_id: this.editId
                }, {
                    headers: {
                        Authorization: 'Bearer '+this.currentToken
                    }
                }).then(res => {
                    res.data.forEach((el) => {
                        this.templateResponses.push(el)
                    })
                    console.log(this.templateResponses)
                })
                .catch(err => console.log(err))
        },
        deleteTemplate(template) {
            axios
                .post('/api/template_response/delete', {
                    data: template
                }, {
                    headers: {
                        Authorization: 'Bearer '+this.currentToken
                    }
                }).then(res => {
                let index = this.templateResponses.indexOf(template);
                this.templateResponses.splice(index, 1);
                console.log(res)
                })
                .catch(err => console.log(err))
        },
        showFormAddTemplate(item) {
            console.log(item)
            this.editId = item.id
            this.dialogCreateTemplate = true
            this.getTemplates()
        },
        showFormAddHint () {
            this.shortHint = null
            this.fullHint = null
            this.iframeHint = null
            this.openFormAddHint = true
        },
        showFormAddReason(item, isEdit = false){
            this.parent_id = item.id
            this.name = isEdit ? item.name : null
            this.weight = isEdit ? item.weight : null
            this.group_id = isEdit ? item.group_id : null
            this.visibility = isEdit ? item.visibility : null
            this.information_id = isEdit ? item.information_id : null
            this.newReasonDialog = true

            this.editId = isEdit ? item.id : null
            if(this.$refs.formAddReason)    this.$refs.formAddReason.resetValidation()
        },
        buildTree(elements, parent_id){
            let branch = [];

            elements.forEach(i => {
                if(i.parent_id === parent_id){
                    const parent = this.buildTree(elements, i.id)
                    if(parent && parent.length)  i.children = parent
                    branch.push(i)
                }
            })

            console.log(branch)
            return branch;
        },
        getInformation() {
            axios
                .post('/api/information/get', {}, {
                    headers: {
                        Authorization: 'Bearer '+this.currentToken
                    }
                })
                .then(resp => this.information = [{
                    id: 0,
                    name: 'Без дополнительной информации',
                }].concat(resp.data))
                .catch(err => console.error(err))
        },
        getReason() {
            axios
                .post('/api/reason/get', {}, {
                    headers: {
                        Authorization: 'Bearer '+this.currentToken
                    }
                })
                .then(resp => this.reasonsList = [{
                    id: 0,
                    name: 'Корневой каталог',
                    children: [],
                }].concat(resp.data))
                .catch(err => console.error(err))
        },
        addReason(){
            if(this.$refs.formAddReason.validate()){
                this.reasonAddLoading = true

                axios
                    .post(this.editId === null ? '/api/reason/add' : '/api/reason/update', Object.assign({
                        name: this.name,
                        weight: this.weight,
                        group_id: this.group_id,
                        visibility: this.visibility,
                        information_id: this.information_id
                    },this.editId !== null ? {} : {
                        parent_id: this.parent_id,
                    },this.editId === null ? {} : {
                        id: this.editId
                    }), {
                        headers: {
                            Authorization: 'Bearer '+this.currentToken
                        }
                    })
                    .then(() => {
                        this.$refs.formAddReason.reset()
                        this.newReasonDialog = false
                        this.getReason()
                    })
                    .catch(err => console.error(err))
                    .finally(() => this.reasonAddLoading = false)
            }
        },
        addTicket(){
            if(this.$refs.formTicket.validate()){
                this.addingTicket = true

                axios
                    .post('/api/ticket/add', {
                        data: this.selectedData,
                        message: this.ticket_information !== null
                            ? this.ticket_information+"\n\n"+this.ticket_message
                            : this.ticket_message + (this.anyDeskNumber ? "\n\n" + "Номер моего AnyDesk: " + this.anyDeskNumber : ""),
                        reason_id: this.reasonsActive.id
                    }, {
                        headers: {
                            Authorization: 'Bearer '+this.currentToken
                        }
                    })
                    .then((res) => {
                            this.$router.replace({
                                name: 'bitrix-tickets'
                            })
                        console.log(res.data)
                    }
                        )
                    .catch(err => this.$store.dispatch('notice', err.response.data.error))
                    .finally(() => {
                        this.addingTicket = false
                        this.anyDeskNumber = null
                    })
            }
        },
        getHint(item) {
            axios.post('/api/hint/get', {}, {
                headers: {
                    Authorization: 'Bearer '+this.currentToken
                }
            }).then(resp => {
                this.hintList = resp.data
            }).catch(err => {
                console.error(err)
            })
        },
        addHint(){
            if(this.$refs.formAddHint.validate()){
                this.addingHint = true

                axios
                    .post('/api/hint/add', {
                        short: this.shortHint,
                        full: this.fullHint,
                        iframeHint: this.iframeHint,
                        reason_id: this.reasonsActive.id
                    }, {
                        headers: {
                            Authorization: 'Bearer '+this.currentToken
                        }
                    })
                    .then(resp => {
                        this.hintList.push(resp.data)
                        this.$refs.formAddHint.reset()
                        this.openFormAddHint = false
                        this.skippedHint = false
                    })
                    .catch(err => console.error(err))
                    .finally(() => this.addingHint = false)
            }
        },
        getGroups() {
            axios
                .post('/api/group/list', {}, {
                    headers: {
                        Authorization: 'Bearer '+this.currentToken
                    }
                })
                .then(resp => this.groups = resp.data)
                .catch(err => console.error(err))
        },
        addImage(event) {
            if(event.size > 2e+6) {
                alert('Вы можете добавлять изображения весом до 2мб')
            }
            if (event.type.includes('image') !== true){
                alert('Вы можете добавлять только изображения')
            } else {
                this.isFileUploading = true
                this.imagesForAdd.push(event)
                console.log(this.imagesForAdd)
                this.isFileUploading = false
            }
        },
        createImage() {
            let data = new FormData();
            this.imagesForAdd.forEach((image) => {
                data.append(`images[]`, image)
                data.append('hint_id', this.hintActive)
            })
            axios
                .post('/api/hint/add_image', data, {
                    headers: {
                        Authorization: 'Bearer '+this.currentToken
                    }
                }).then(res=> {
                console.log(res)
                this.dialogImageForAdd = false
                this.imagesForAdd = []
                })
                .catch(err=> console.log(err))
        },
        getImage() {
            this.dialogImageForSolutions = true
            axios
                .post('/api/hint/get_image', {
                    hint_id: this.hintActive
                }, {
                    headers: {
                        Authorization: 'Bearer '+this.currentToken
                    }
                }).then(res => {
                this.imagesForDisplay = res.data.map((el) => {
                      return  el.image_path
                    })
                console.log(this.imagesForDisplay)
                })
                .catch(err => console.log(err))
        },
        deleteImage(image, id) {
            this.imagesForDisplay.splice(id, 1)
            axios
                .post('/api/hint/delete_image', {
                    image_path: image
                }, {
                    headers: {
                        Authorization: 'Bearer '+this.currentToken
                    }
                }).then(res=> console.log(res))
                .catch(err=> console.log(err))
        },
        showFormAddImage() {
            this.dialogImageForAdd = true
        },
        getHintId(id) {
            this.hintActive = id
        },
        getListCallData() {
                axios
                    .post('/api/city/get_call_managers', {},{
                        headers: {
                            Authorization: 'Bearer '+this.currentToken
                        }
                    }).then(res=> {
                    console.log(res.data);
                    res.data.forEach((element) => {
                        BX24.callBatch({
                            get_department: {
                                method: 'department.get',
                                params: {
                                    ID: element.structure_id
                                }
                            }
                        }, (result) => {
                            let department = result.get_department.answer.result[0].NAME
                            this.callData.push({department: department, manager: element.trainer_id})
                        })
                    })
                })
                .catch(err=> console.log(err))
        },
        getListBitrixData() {
            axios
                .post('/api/city/get_bitrix_managers', {},{
                    headers: {
                        Authorization: 'Bearer '+this.currentToken
                    }
                }).then(res=> {
                res.data.forEach((element) => {
                    BX24.callBatch({
                        get_department: {
                            method: 'department.get',
                            params: {
                                ID: element.structure_id
                            }
                        }
                    }, (result) => {
                        let department = result.get_department.answer.result[0].NAME
                        this.bitrixData.push({department: department, manager: element.manager_id})
                    })
                })
            })
            .catch(err=> console.log(err))
        },
        getParentId(value) {
            axios
                .post('/api/reason/get_parent_id', {
                    id: value
                }, {
                    headers: {
                        Authorization: 'Bearer '+this.currentToken
                    }
                }).then(res => {
                    return this.parentId = res.data
                })
                .catch(err => console.log(err))
        }

    },
    mounted() {
        this.getReason()
        this.getHint()
        this.getGroups()
        this.getInformation()
    }
}
</script>

<style scoped>

</style>
