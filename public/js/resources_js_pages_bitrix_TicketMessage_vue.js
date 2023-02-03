"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_bitrix_TicketMessage_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/bitrix/TicketMessage.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/bitrix/TicketMessage.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _Users_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Users.vue */ "./resources/js/pages/bitrix/Users.vue");
/* harmony import */ var bitrix24_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bitrix24-vue */ "./node_modules/bitrix24-vue/dist/bitrix24-vue.common.js");
/* harmony import */ var bitrix24_vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bitrix24_vue__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Tickets_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Tickets.vue */ "./resources/js/pages/bitrix/Tickets.vue");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "TicketMessage",
  props: {
    ticket_id: [Number, String]
  },
  data: function data() {
    return {
      newParticipantForm: false,
      newParticipantFormValid: false,
      newParticipantFormLoading: false,
      showParticipants: false,
      ticketAction: null,
      archive: false,
      openDialog: false,
      dialogImg: false,
      currentImg: null,
      dialogForTransfer: false,
      ticketForTransfer: null,
      selectManager: null,
      managers: [],
      manager: '',
      reasonId: '',
      reasonName: '',
      loadingParticipants: false,
      userCreatedTicket: null,
      workPosition: '',
      departmentPosition: '',
      newParticipants: [],
      participants: [],
      participantStatuses: ['Прочие участники', 'Ответственный сотрудник', 'Ответственный менеджер', 'Прочие менеджеры'],
      headers: [{
        text: 'Имя',
        align: 'start',
        value: 'user_id'
      }, {
        text: 'Статус',
        value: 'status'
      }],
      ticketInfo: {
        handler: function handler() {
          this.saveToLocalStorage();
        },
        deep: true
      },
      active: false,
      file: null,
      isFileUploading: false,
      sendingMessage: false,
      message: null,
      scrollInvoked: 0,
      templateResponses: [],
      items: [],
      requiredRules: [function (v) {
        return !!v && !!v.length || 'Обязательное поле';
      }]
    };
  },
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_3__.mapState)(['currentToken', 'currentUser', 'isManager', 'isAdmin', 'users'])), {}, {
    empty: function empty() {
      return this.message === null || this.message.replace(/(\r\n|\n|\r)/gm, '').length === 0;
    }
  }),
  watch: {
    items: function items(newVal) {
      var _this = this;
      this.scrollToElement();
      axios.post('/api/message_read/read', {
        ticket_id: this.ticket_id,
        message_id: newVal[newVal.length - 1].id
      }, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      }).then(function (resp) {
        _this.ticketForTransfer = resp.data;
        console.log(resp.data);
      })["catch"](function (err) {
        return console.error(err);
      });
    },
    newParticipantForm: function newParticipantForm() {
      if (this.$refs.newParticipantForm) this.$refs.newParticipantForm.reset();
    }
  },
  methods: {
    openProfile: function openProfile(id) {
      console.log('openProfile', id);
      BX24.openPath('/company/personal/user/' + id + '/', function (result) {
        return console.log(result);
      });
    },
    pressKey: function pressKey(e) {
      if (e.ctrlKey) {
        this.message = this.message === null ? "\n" : this.message + "\n";
      } else if (!this.empty) {
        this.sendMessage();
      }
    },
    scrollToElement: function scrollToElement() {
      setTimeout(function () {
        window.scrollTo({
          top: document.getElementsByClassName('message_list')[0].scrollHeight,
          behavior: 'smooth'
        });
      }, 10);
    },
    getMessages: function getMessages() {
      var _this2 = this;
      axios.post('/api/message/get', {
        ticket_id: this.ticket_id
      }, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      }).then(function (resp) {
        _this2.items = resp.data.map(function (item) {
          return {
            id: item.id,
            photo: item.photo,
            message: item.message,
            user_id: item.user_id,
            bitrix_id: item.bitrix_id,
            last_name: item.last_name,
            name: item.name,
            second_name: item.second_name,
            path: item.path,
            date: item.date
          };
        });
        _this2.getFiles();
      })["catch"](function () {
        return _this2.$router.replace({
          name: 'bitrix-tickets'
        });
      });
    },
    getParticipants: function getParticipants() {
      var _this3 = this;
      this.loadingParticipants = true;
      axios.post('/api/participant/list', {
        ticket_id: this.ticket_id
      }, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      }).then(function (resp) {
        _this3.participants = resp.data;
        _this3.showParticipants = true;
      })["catch"](function (err) {
        return _this3.$store.dispatch('notice', err.response.data.error);
      })["finally"](function () {
        return _this3.loadingParticipants = false;
      });
    },
    addParticipants: function addParticipants() {
      var _this4 = this;
      if (this.$refs.newParticipantForm.validate()) {
        this.newParticipantFormLoading = true;
        axios.post('/api/participant/add', {
          ticket_id: this.ticket_id,
          users: this.newParticipants
        }, {
          headers: {
            Authorization: 'Bearer ' + this.currentToken
          }
        }).then(function () {
          _this4.newParticipantForm = false;
          _this4.getParticipants();
        })["catch"](function (err) {
          return _this4.$store.dispatch('notice', err.response.data.error);
        })["finally"](function () {
          return _this4.newParticipantFormLoading = false;
        });
      }
    },
    sendMessage: function sendMessage() {
      var _this5 = this;
      this.sendingMessage = true;
      axios.post('/api/message/add', {
        ticket_id: this.ticket_id,
        message: this.message
      }, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      }).then(function () {
        return _this5.message = null;
      })["catch"](function (err) {
        return console.error(err);
      })["finally"](function () {
        return _this5.sendingMessage = false;
      });
    },
    sendTemplate: function sendTemplate(item) {
      this.message = item;
      this.sendMessage();
    },
    addFile: function addFile(event) {
      var _this6 = this;
      if (event.type.includes('image') !== true) {
        alert('Вы можете добавлять только изображения');
      } else {
        console.log(event);
        this.isFileUploading = true;
        var file = event;
        var data = new FormData();
        data.append('file', file);
        data.append('ticket_id', this.ticket_id);
        axios.post('/api/message/add', data, {
          headers: {
            Authorization: 'Bearer ' + this.currentToken
          }
        }).then(function (resp) {
          _this6.isFileUploading = false;
          _this6.file = resp.data.body;
        })["catch"](function (err) {
          _this6.isFileUploading = false;
          console.log(err);
        })["finally"](this.file = null);
      }
    },
    getFiles: function getFiles() {
      var _this7 = this;
      axios.post('/api/file/get', {
        ticket_id: this.ticket_id
      }, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      }).then(function (resp) {})["catch"](function () {
        return _this7.$router.replace({
          name: 'bitrix-tickets'
        });
      });
    },
    getTicket: function getTicket() {
      var _this8 = this;
      axios.post('/api/ticket/get', {
        id: this.ticket_id
      }, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      }).then(function (resp) {
        _this8.reasonId = resp.data.reason_id;
        console.log(_this8.reasonId);
        _this8.active = resp.data.active;
      })["catch"](function (err) {
        return console.error(err);
      })["finally"](function () {
        return _this8.sendingMessage = false;
      });
    },
    getUser: function getUser(item) {
      var user = this.users.find(function (i) {
        return i.user_id === item.user_id;
      });
      return user ? user.name : item.user_id;
    },
    getReasonName: function getReasonName() {
      var _this9 = this;
      axios.post('/api/reason/get', {
        id: this.reasonId
      }, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      }).then(function (resp) {
        var reasonsList = resp.data; // Список проблем
        var result = reasonsList.filter(function (el) {
          if (_this9.reasonId === el.id) {
            return el.name;
          }
        });
        _this9.reasonName = result[0].name;
      })["catch"](function (err) {
        return console.error(err);
      });
    },
    getTemplates: function getTemplates() {
      var _this10 = this;
      axios.post('/api/template_response/get_inside_ticket_massage', {
        ticket_id: this.ticket_id
      }, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      }).then(function (res) {
        var temp = res.data.map(function (el) {
          _this10.templateResponses.push(el.template_response);
        });
        console.log(_this10.templateResponses);
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    dataOfCreator: function dataOfCreator() {
      var _this11 = this;
      axios.post('/api/user/data', {
        id: this.ticket_id
      }, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      }).then(function (resp) {
        _this11.userCreatedTicket = resp.data;
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
        }, function (result) {
          console.log(result);
          var l = result.get_department.data().length;
          var wrk = result.get_user.data()[0].WORK_POSITION;
          var str = '';
          for (var i = 0; i < l; i++) {
            str += i === 0 ? '' : ', ';
            str += result.get_department.data()[i].NAME;
          }
          _this11.departmentPosition = str;
          _this11.workPosition = wrk;
        });
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    archiveConfirm: function archiveConfirm() {
      this.openDialog = true;
    },
    toArchive: function toArchive() {
      var _this12 = this;
      this.archive = true;
      axios.post('/api/ticket/archive', {
        id: this.ticket_id,
        active: 0
      }, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      }).then(function () {
        _this12.openDialog = false;
        console.log('Тикет отправлен в архив');
      })["catch"](function (err) {
        return console.error(err);
      })["finally"](function () {
        _this12.archive = false;
        _this12.$router.push({
          name: 'bitrix-tickets'
        });
      });
    },
    saveToLocalStorage: function saveToLocalStorage() {
      localStorage.setItem('ticketInfo', this.ticketInfo);
    },
    loadFromLocalStorage: function loadFromLocalStorage() {
      var ticketInfo = localStorage.getItem('ticketInfo');
      if (ticketInfo) {
        this.ticketInfo = ticketInfo === 'true';
      }
    },
    transferToAnotherManager: function transferToAnotherManager() {
      axios.post('/api/user/transfer_manager_inside_dialog', {
        user_id: this.currentUser.id,
        manager: this.selectManager,
        ticket: this.ticketForTransfer
      }, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      }).then(function (res) {
        return console.log(res);
      })["catch"](function (err) {
        return console.log(err);
      })["finally"](this.dialogForTransfer = false);
    },
    getAllManagers: function getAllManagers() {
      var _this13 = this;
      this.dialogForTransfer = true;
      axios.post('/api/user/all_managers', {}, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      }).then(function (res) {
        res.data.forEach(function (el) {
          _this13.managers.push({
            name: el.name,
            lastName: el.last_name
          });
        });
      })["catch"](function (err) {
        return console.log(err);
      });
    }
  },
  mounted: function mounted() {
    this.loadFromLocalStorage();
    this.getTicket();
    this.getMessages();
    this.getReasonName();
    this.dataOfCreator();
    this.getTemplates();
    this.$socket.emit('messages', {
      ticket_id: this.ticket_id
    }, function (response) {
      console.log('messages return');
      console.log(response);
    });
  },
  sockets: {
    connect: function connect() {
      console.log('socket connected');
    },
    messageAdd: function messageAdd(data) {
      this.items.push(data);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/bitrix/Tickets.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/bitrix/Tickets.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Success",
  data: function data() {
    return {
      loadingTickets: false,
      openConfirm: false,
      validCouponForm: false,
      loadingCouponForm: false,
      readyWorking: false,
      dialogForTransfer: false,
      ticketForTransfer: null,
      selectManager: null,
      managers: [],
      manager: '',
      openCoupon: false,
      couponCode: null,
      couponCodesLoading: false,
      couponCodes: [],
      couponRules: [function (v) {
        return !!v || 'Не указали номер купона';
      }],
      tickets: [],
      transferingToArchive: false,
      ticketAction: null,
      statusName: ['Сообщений нет', 'Ожидает ваших действий', 'Ожидает ответа', 'Новое сообщение'],
      headers: [{
        text: 'Создатель',
        align: 'start',
        value: 'user_id'
      }, {
        text: 'Проблема',
        value: 'name'
      }, {
        text: 'Статус',
        value: 'status'
      }, {
        text: 'Очередь',
        value: 'queue'
      }, {
        text: 'Дата создания',
        value: 'created_at'
      }, {
        text: 'Действия',
        sortable: false,
        value: 'actions'
      }]
    };
  },
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_0__.mapState)(['currentUser', 'currentToken', 'isAdmin', 'isManager'])), {}, {
    isOnline: {
      get: function get() {
        var _this$$store$state$cu;
        return !!((_this$$store$state$cu = this.$store.state.currentUser) !== null && _this$$store$state$cu !== void 0 && _this$$store$state$cu.online);
      },
      set: function set(value) {
        this.$store.commit('setCurrentUserOnline', value);
      }
    }
  }),
  methods: {
    getAllManagers: function getAllManagers(ticket) {
      var _this = this;
      console.log(ticket);
      this.dialogForTransfer = true;
      this.ticketForTransfer = ticket;
      axios.post('/api/user/all_managers', {}, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      }).then(function (res) {
        res.data.forEach(function (el) {
          _this.managers.push({
            name: el.name,
            lastName: el.last_name
          });
        });
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    transferToAnotherManager: function transferToAnotherManager() {
      axios.post('/api/user/transfer_manager', {
        user_id: this.currentUser.id,
        manager: this.selectManager,
        ticket: this.ticketForTransfer
      }, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      }).then(function (res) {
        return console.log(res);
      })["catch"](function (err) {
        return console.log(err);
      })["finally"](this.dialogForTransfer = false);
    },
    getDateTime: function getDateTime(time) {
      var date = new Date(time * 1000);
      return date.toLocaleString();
    },
    openMessage: function openMessage(ticket) {
      this.$router.push({
        name: 'bitrix-tickets-message',
        params: {
          ticket_id: ticket.id
        }
      });
    },
    openCouponForm: function openCouponForm(ticket) {
      var _this2 = this;
      if (this.$refs.couponForm) {
        this.$refs.couponForm.reset();
      }
      this.openCoupon = true;
      this.couponCodesLoading = true;
      this.ticketAction = ticket.id;
      axios.post('/api/coupon/list', {}, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      }).then(function (resp) {
        _this2.couponCodes = resp.data.filter(function (i) {
          return i.status === 1;
        });
      })["catch"](function (err) {
        _this2.$store.dispatch('notice', err.response.data.error);
      })["finally"](function () {
        _this2.couponCodesLoading = false;
      });
    },
    ApplyCoupon: function ApplyCoupon() {
      var _this3 = this;
      if (this.$refs.couponForm.validate()) {
        this.loadingCouponForm = true;
        axios.post('/api/coupon/apply', {
          ticket_id: this.ticketAction,
          code: this.couponCode
        }, {
          headers: {
            Authorization: 'Bearer ' + this.currentToken
          }
        }).then(function () {
          _this3.openCoupon = false;
          _this3.getTickets();
          _this3.$store.dispatch('notice', 'Купон принят');
        })["catch"](function (err) {
          return _this3.$store.dispatch('notice', err.response.data.error);
        })["finally"](function () {
          return _this3.loadingCouponForm = false;
        });
      }
    },
    toArchive: function toArchive(ticket) {
      this.openConfirm = true;
      this.ticketAction = ticket.id;
    },
    transferToArchive: function transferToArchive() {
      var _this4 = this;
      this.transferingToArchive = true;
      axios.post('/api/ticket/archive', {
        id: this.ticketAction,
        active: 0
      }, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      }).then(function () {
        _this4.tickets = _this4.tickets.filter(function (t) {
          return t.id !== _this4.ticketAction;
        });
        _this4.openConfirm = false;
      })["catch"](function (err) {
        return console.error(err);
      })["finally"](function () {
        return _this4.transferingToArchive = false;
      });
    },
    getTickets: function getTickets() {
      var _this5 = this;
      this.loadingTickets = true;
      axios.post('/api/ticket/list', {}, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      }).then(function (resp) {
        _this5.tickets = resp.data.map(function (ticket) {
          if (ticket.queue === null) {
            ticket.queue = 999999;
          }
          ticket.user_id = ticket.user.last_name + ' ' + ticket.user.name + ' ' + ticket.user.second_name;
          console.log(ticket);
          return ticket;
        });
      })["catch"](function (err) {
        return console.error(err);
      })["finally"](function () {
        return _this5.loadingTickets = false;
      });
    },
    setOnline: function setOnline(status) {
      var _this6 = this;
      axios.post('/api/user/is_online', {
        status: status
      }, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      }).then(function (resp) {
        _this6.getTickets();
        _this6.isOnline = status;
        console.log(resp);
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    takeTickets: function takeTickets() {
      axios.post('/api/user/take_tickets', {
        manager_id: this.currentUser.id
      }, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      }).then(function (resp) {
        console.log(resp);
      })["catch"](function (err) {
        return console.log(err);
      });
    }
  },
  mounted: function mounted() {
    this.takeTickets();
    this.getTickets();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/bitrix/Users.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/bitrix/Users.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Managers",
  data: function data() {
    return {
      search: null,
      managerLoading: false,
      managers: [],
      headers: [{
        text: 'ID',
        value: 'ID'
      }, {
        text: 'Имя',
        value: 'name'
      }, {
        text: 'Должность',
        value: 'work_position'
      }, {
        text: 'Менеджер поддержки',
        value: 'is_manager'
      }]
    };
  },
  computed: _objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_0__.mapState)(['currentToken', 'currentUser', 'isManager', 'isAdmin'])),
  methods: {
    isManagerChange: function isManagerChange(item) {
      var _this = this;
      item.loading = true;
      console.log('isManagerChange');
      console.log(item);
      axios.post('/api/user/set', {
        id: item.id,
        is_manager: item.is_manager
      }, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      })["catch"](function (err) {
        _this.dispatch('notice', err.response.data.error);
      })["finally"](function () {
        item.loading = false;
      });
    }
  },
  mounted: function mounted() {
    var _this2 = this;
    this.managerLoading = true;
    axios.post('/api/user/list', {}, {
      headers: {
        Authorization: 'Bearer ' + this.currentToken
      }
    }).then(function (resp) {
      _this2.managers = resp.data.map(function (i) {
        i.loading = false;
        return i;
      });
    })["catch"](function (err) {
      _this2.dispatch('notice', err.response.data.error);
    })["finally"](function () {
      _this2.managerLoading = false;
    });
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/bitrix/TicketMessage.vue?vue&type=template&id=029f8b6e&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/bitrix/TicketMessage.vue?vue&type=template&id=029f8b6e& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("v-col", [_c("v-row", {
    staticClass: "message_list",
    staticStyle: {
      "padding-bottom": "150px"
    }
  }, [_c("v-list", {
    staticStyle: {
      width: "100%"
    },
    attrs: {
      "three-line": ""
    }
  }, [[_c("v-row", {
    staticClass: "pa-2",
    staticStyle: {
      color: "#202326",
      "justify-content": "space-between",
      "align-items": "flex-start",
      display: "flex"
    }
  }, [_vm.isAdmin || _vm.isManager && _vm.ticketInfo ? _c("v-card", {
    staticClass: "pa-2",
    staticStyle: {
      width: "94%"
    }
  }, [_vm._v("\n                         Отдел продаж: " + _vm._s(_vm.departmentPosition) + "\n                    "), _c("br"), _vm._v(" Тема тикета: " + _vm._s(_vm.reasonName) + "\n                    "), _c("br"), _vm._v(" Должность сотрудника: " + _vm._s(_vm.workPosition) + "\n                    "), _c("br"), _vm._v(" б24.юдл.рф/company/personal/user/" + _vm._s(_vm.userCreatedTicket) + "/\n                    "), _c("br"), _vm._v(" "), _c("div", {
    staticClass: "justify-content-around d-flex"
  }, _vm._l(_vm.templateResponses.slice(0, 5), function (template) {
    return _c("div", {
      key: template,
      staticClass: "justify-content-around d-flex"
    }, [_c("div", {
      staticClass: "rounded ma-2 pa-2 primary white--text",
      staticStyle: {
        cursor: "pointer"
      },
      on: {
        click: function click($event) {
          return _vm.sendTemplate(template);
        }
      }
    }, [_vm._v("\n                                " + _vm._s(template.length > 15 ? template.slice(0, 15) + "..." : template) + "\n                            ")])]);
  }), 0)]) : _vm._e(), _vm._v(" "), _c("div"), _vm._v(" "), _c("div", {
    staticStyle: {
      height: "30px"
    }
  }, [_vm.isAdmin || _vm.isManager ? _c("v-switch", {
    staticStyle: {
      "box-sizing": "border-box",
      margin: "0",
      padding: "0"
    },
    attrs: {
      color: "info"
    },
    on: {
      click: _vm.saveToLocalStorage
    },
    model: {
      value: _vm.ticketInfo,
      callback: function callback($$v) {
        _vm.ticketInfo = $$v;
      },
      expression: "ticketInfo"
    }
  }) : _vm._e()], 1)], 1)], _vm._v(" "), _vm._l(_vm.items, function (item, index) {
    return [item.user_id === _vm.currentUser.id ? _c("v-list-item", {
      key: index
    }, [_c("v-list-item-content", {
      staticClass: "text-right"
    }, [_c("v-list-item-title", [_c("div"), _vm._v(" "), _c("div", {
      staticClass: "font-weight-bold"
    }, [_vm._v(_vm._s(item.last_name) + " " + _vm._s(item.name) + " " + _vm._s(item.second_name))]), _vm._v(" "), !item.message.includes("/storage/files/") ? _c("div", {
      staticClass: "pre"
    }, [_vm._v(" " + _vm._s(item.message) + " ")]) : _vm._e(), _vm._v(" "), item.message && item.message.includes("/storage/files/") ? _c("div", {
      staticClass: "pre"
    }, [_c("img", {
      staticStyle: {
        width: "250px",
        height: "200px",
        cursor: "pointer"
      },
      attrs: {
        src: item.message
      },
      on: {
        click: function click($event) {
          _vm.dialogImg = true;
          _vm.currentImg = item.message;
        }
      }
    })]) : _vm._e()]), _vm._v(" "), _c("v-list-item-subtitle", [_vm._v("\n                            " + _vm._s(new Date(item.date).toLocaleString()) + "\n                        ")])], 1), _vm._v(" "), _c("v-list-item-avatar", {
      staticClass: "float-right"
    }, [_c("v-img", {
      attrs: {
        src: item.photo
      }
    })], 1)], 1) : _c("v-list-item", {
      key: index
    }, [_c("v-list-item-avatar", [_c("v-img", {
      staticStyle: {
        cursor: "pointer"
      },
      attrs: {
        src: item.photo
      },
      on: {
        click: function click($event) {
          return _vm.openProfile(item.bitrix_id);
        }
      }
    })], 1), _vm._v(" "), _c("v-list-item-content", [_c("v-list-item-title", [_c("div", {
      staticClass: "font-weight-bold"
    }, [_vm._v(_vm._s(item.last_name) + " " + _vm._s(item.name) + " " + _vm._s(item.second_name))]), _vm._v(" "), !item.message.includes("/storage/files/") ? _c("div", {
      staticClass: "pre"
    }, [_vm._v(_vm._s(item.message))]) : _vm._e(), _vm._v(" "), item.message && item.message.includes("/storage/files/") ? _c("div", {
      staticClass: "pre"
    }, [_c("img", {
      staticStyle: {
        width: "250px",
        height: "200px",
        cursor: "pointer"
      },
      attrs: {
        src: item.message
      },
      on: {
        click: function click($event) {
          _vm.dialogImg = true;
          _vm.currentImg = item.message;
        }
      }
    })]) : _vm._e()]), _vm._v(" "), _c("v-list-item-subtitle", {
      staticClass: "grey--text caption"
    }, [_vm._v("\n                            " + _vm._s(new Date(item.date).toLocaleString()) + "\n                        ")])], 1)], 1)];
  })], 2)], 1), _vm._v(" "), _vm.active ? _c("v-row", {
    staticClass: "sticky-bottom"
  }, [_c("v-col", [_c("v-card", {
    staticStyle: {
      padding: "12px 12px 0 12px"
    }
  }, [_c("v-textarea", {
    attrs: {
      name: "input-7-1",
      label: "Введите текст сообщения",
      "no-resize": "",
      rows: "3",
      required: ""
    },
    on: {
      keydown: function keydown($event) {
        if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
        $event.preventDefault();
        return _vm.pressKey.apply(null, arguments);
      }
    },
    scopedSlots: _vm._u([{
      key: "append",
      fn: function fn() {
        return [_c("div", {
          staticClass: "d-flex justify-content-around",
          staticStyle: {
            position: "relative",
            top: "-25px"
          }
        }, [!_vm.isFileUploading ? _c("v-file-input", {
          ref: "fileInput",
          staticClass: "mb-9",
          attrs: {
            "hide-input": ""
          },
          on: {
            change: _vm.addFile,
            paste: function paste($event) {
              $event.preventDefault();
              return _vm.addFile.apply(null, arguments);
            }
          },
          model: {
            value: _vm.file,
            callback: function callback($$v) {
              _vm.file = $$v;
            },
            expression: "file"
          }
        }) : _vm._e(), _vm._v(" "), _vm.isFileUploading ? _c("div", {
          staticClass: "mb-9"
        }, [_c("v-progress-circular", {
          attrs: {
            indeterminate: "",
            color: "primary"
          }
        }), _vm._v(" "), _c("p", [_vm._v("Uploading file...")])], 1) : _vm._e(), _vm._v(" "), _c("v-speed-dial", {
          scopedSlots: _vm._u([{
            key: "activator",
            fn: function fn() {
              return [_c("v-btn", {
                staticClass: "my-3 mb-9",
                attrs: {
                  color: "primary",
                  dark: "",
                  fab: "",
                  small: ""
                }
              }, [_c("v-icon", [_vm._v("mdi-widgets")])], 1)];
            },
            proxy: true
          }], null, false, 984443452)
        }, [_vm._v(" "), _c("v-btn", {
          attrs: {
            fab: "",
            small: "",
            color: "red"
          },
          on: {
            click: _vm.archiveConfirm
          }
        }, [_c("v-icon", {
          attrs: {
            color: "white"
          }
        }, [_vm._v("\n                                        mdi-delete\n                                    ")])], 1), _vm._v(" "), _c("v-btn", {
          attrs: {
            loading: _vm.loadingParticipants,
            fab: "",
            small: "",
            color: "blue"
          },
          on: {
            click: _vm.getParticipants
          }
        }, [_c("v-icon", {
          attrs: {
            color: "white"
          }
        }, [_vm._v("\n                                        mdi-account-supervisor\n                                    ")])], 1), _vm._v(" "), _c("v-btn", {
          attrs: {
            small: "",
            fab: "",
            color: "success"
          },
          on: {
            click: _vm.getAllManagers
          }
        }, [_c("v-icon", {
          attrs: {
            color: "white"
          }
        }, [_vm._v("\n                                        mdi-account-switch\n                                    ")])], 1)], 1)], 1), _vm._v(" "), _c("v-btn", {
          staticClass: "mx-2",
          staticStyle: {
            bottom: "10px",
            right: "-8px"
          },
          attrs: {
            fab: "",
            absolute: "",
            color: "success",
            small: "",
            disabled: _vm.empty || _vm.message.length === 0 || _vm.sendingMessage,
            loading: _vm.sendingMessage
          },
          on: {
            click: _vm.sendMessage
          }
        }, [_c("v-icon", {
          attrs: {
            dark: ""
          }
        }, [_vm._v("\n                                mdi-send\n                            ")])], 1)];
      },
      proxy: true
    }], null, false, 130455134),
    model: {
      value: _vm.message,
      callback: function callback($$v) {
        _vm.message = $$v;
      },
      expression: "message"
    }
  })], 1)], 1)], 1) : _vm._e(), _vm._v(" "), _c("v-dialog", {
    attrs: {
      width: 500
    },
    model: {
      value: _vm.dialogForTransfer,
      callback: function callback($$v) {
        _vm.dialogForTransfer = $$v;
      },
      expression: "dialogForTransfer"
    }
  }, [_c("v-card", [_c("v-card-title", [_vm._v("Выберите другого сотрудника техподдержки")]), _vm._v(" "), _c("v-card", [_c("v-select", {
    staticClass: "pa-2 ma-2",
    attrs: {
      items: _vm.managers,
      "item-text": function itemText(manager) {
        return manager.name + " " + manager.lastName;
      },
      "item-value": function itemValue(manager) {
        return manager.lastName;
      },
      width: 450
    },
    model: {
      value: _vm.selectManager,
      callback: function callback($$v) {
        _vm.selectManager = $$v;
      },
      expression: "selectManager"
    }
  }), _vm._v(" "), _c("v-btn", {
    staticClass: "ma-2",
    on: {
      click: function click($event) {
        _vm.dialogForTransfer = false;
      }
    }
  }, [_vm._v("\n                Отменить\n            ")]), _vm._v(" "), _c("v-btn", {
    staticClass: "ma-2",
    attrs: {
      color: "success"
    },
    on: {
      click: _vm.transferToAnotherManager
    }
  }, [_vm._v("\n                Отправить\n            ")])], 1)], 1)], 1), _vm._v(" "), _c("v-dialog", {
    attrs: {
      "max-width": "600px"
    },
    model: {
      value: _vm.showParticipants,
      callback: function callback($$v) {
        _vm.showParticipants = $$v;
      },
      expression: "showParticipants"
    }
  }, [_c("v-card", [_c("v-card-title", [_vm._v("Участники")]), _vm._v(" "), _c("v-divider"), _vm._v(" "), _c("v-data-table", {
    staticClass: "elevation-1",
    attrs: {
      headers: _vm.headers,
      items: _vm.participants,
      "multi-sort": "",
      "items-per-page": 10
    },
    scopedSlots: _vm._u([{
      key: "item.user_id",
      fn: function fn(_ref) {
        var item = _ref.item;
        return [_vm._v("\n                    " + _vm._s(_vm.getUser(item)) + "\n                ")];
      }
    }, {
      key: "item.status",
      fn: function fn(_ref2) {
        var item = _ref2.item;
        return [_vm._v("\n                    " + _vm._s(_vm.participantStatuses[item.status] || _vm.participantStatuses[0]) + "\n                ")];
      }
    }])
  }), _vm._v(" "), _vm.isAdmin || _vm.isManager ? _c("v-card-actions", [_c("v-spacer"), _vm._v(" "), _c("v-btn", {
    attrs: {
      color: "blue darken-1",
      text: ""
    },
    on: {
      click: function click($event) {
        _vm.showParticipants = false;
      }
    }
  }, [_vm._v("\n                    Отмена\n                ")]), _vm._v(" "), _c("v-btn", {
    attrs: {
      color: "success"
    },
    on: {
      click: function click($event) {
        _vm.newParticipantForm = true;
      }
    }
  }, [_vm._v("\n                    Добавить\n                ")])], 1) : _vm._e()], 1)], 1), _vm._v(" "), _c("v-dialog", {
    attrs: {
      persistent: "",
      scrollable: "",
      "max-width": "400px"
    },
    model: {
      value: _vm.newParticipantForm,
      callback: function callback($$v) {
        _vm.newParticipantForm = $$v;
      },
      expression: "newParticipantForm"
    }
  }, [_c("v-card", [_c("v-card-title", [_vm._v("Новые участники")]), _vm._v(" "), _c("v-divider"), _vm._v(" "), _c("v-form", {
    ref: "newParticipantForm",
    attrs: {
      "lazy-validation": ""
    },
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        return _vm.addParticipants.apply(null, arguments);
      }
    },
    model: {
      value: _vm.newParticipantFormValid,
      callback: function callback($$v) {
        _vm.newParticipantFormValid = $$v;
      },
      expression: "newParticipantFormValid"
    }
  }, [_c("v-card-text", {
    staticStyle: {
      padding: "16px"
    }
  }, [_c("v-autocomplete", {
    attrs: {
      items: _vm.users.filter(function (i) {
        return !_vm.participants.map(function (p) {
          return p.user_id;
        }).includes(i.user_id);
      }),
      rules: _vm.requiredRules,
      "hide-no-data": "",
      "item-value": "id",
      "item-text": "name",
      label: "Участники",
      placeholder: "Введите имя нового участника",
      "prepend-icon": "mdi-database-search",
      multiple: "",
      chips: "",
      "return-object": ""
    },
    scopedSlots: _vm._u([{
      key: "item",
      fn: function fn(_ref3) {
        var item = _ref3.item;
        return [_c("v-list-item-avatar", {
          staticClass: "text-h5 font-weight-light white--text",
          attrs: {
            color: "indigo"
          }
        }, [_c("v-img", {
          attrs: {
            src: item.photo
          }
        })], 1), _vm._v(" "), _c("v-list-item-content", [_c("v-list-item-title", [_vm._v("\n                                    " + _vm._s(item.name) + "\n                                ")]), _vm._v(" "), _c("v-list-item-subtitle", [_vm._v("\n                                    " + _vm._s(item.work_position) + "\n                                ")])], 1)];
      }
    }, {
      key: "selection",
      fn: function fn(_ref4) {
        var item = _ref4.item;
        return [_c("v-chip", _vm._b({
          attrs: {
            close: _vm.isAdmin
          },
          on: {
            "click:close": function clickClose($event) {
              _vm.newParticipants = _vm.newParticipants.filter(function (i) {
                return i.id !== item.id;
              });
            }
          }
        }, "v-chip", item.attrs, false), [_c("v-avatar", {
          attrs: {
            left: ""
          }
        }, [_c("v-img", {
          attrs: {
            src: item.photo
          }
        })], 1), _vm._v("\n                                " + _vm._s(item.name) + "\n                            ")], 1)];
      }
    }]),
    model: {
      value: _vm.newParticipants,
      callback: function callback($$v) {
        _vm.newParticipants = $$v;
      },
      expression: "newParticipants"
    }
  })], 1), _vm._v(" "), _c("v-card-actions", {
    staticStyle: {
      padding: "8px"
    }
  }, [_c("v-spacer"), _vm._v(" "), _c("v-btn", {
    attrs: {
      color: "blue darken-1",
      text: ""
    },
    on: {
      click: function click($event) {
        _vm.newParticipantForm = false;
      }
    }
  }, [_vm._v("\n                        Отмена\n                    ")]), _vm._v(" "), _c("v-btn", {
    attrs: {
      color: "success",
      disabled: !_vm.newParticipantFormValid || _vm.newParticipantFormLoading,
      loading: _vm.newParticipantFormLoading,
      type: "submit"
    }
  }, [_vm._v("\n                        Добавить\n                    ")])], 1)], 1)], 1)], 1), _vm._v(" "), [_c("v-row", {
    attrs: {
      justify: "center"
    }
  }, [_c("v-dialog", {
    attrs: {
      "max-width": "250"
    },
    model: {
      value: _vm.openDialog,
      callback: function callback($$v) {
        _vm.openDialog = $$v;
      },
      expression: "openDialog"
    }
  }, [_c("v-card", [_c("v-card-title", {
    staticClass: "text-h5"
  }, [_vm._v("\n                        Подтверждение\n                    ")]), _vm._v(" "), _c("v-card-text", [_vm._v("\n                        Завершить работу с тикетом и отправить его в архив?\n                    ")]), _vm._v(" "), _c("v-card-actions", [_c("v-spacer"), _vm._v(" "), _c("v-btn", {
    attrs: {
      text: ""
    },
    on: {
      click: function click($event) {
        _vm.openDialog = false;
      }
    }
  }, [_vm._v("\n                            Отмена\n                        ")]), _vm._v(" "), _c("v-btn", {
    attrs: {
      color: "red",
      dark: ""
    },
    on: {
      click: _vm.toArchive
    }
  }, [_vm._v("\n                           В архив\n                        ")])], 1)], 1)], 1)], 1)], _vm._v(" "), [_c("v-dialog", {
    attrs: {
      "max-width": "1000"
    },
    model: {
      value: _vm.dialogImg,
      callback: function callback($$v) {
        _vm.dialogImg = $$v;
      },
      expression: "dialogImg"
    }
  }, [_c("v-card", [_c("v-img", {
    attrs: {
      href: "#",
      src: _vm.currentImg
    }
  }), _vm._v(" "), _c("v-card-actions", [_c("v-btn", {
    attrs: {
      color: "primary",
      text: ""
    },
    on: {
      click: function click($event) {
        _vm.dialogImg = false;
      }
    }
  }, [_vm._v("Закрыть")]), _vm._v(" "), _c("v-btn", {
    attrs: {
      color: "primary",
      text: ""
    },
    on: {
      click: function click($event) {
        _vm.dialogImg = false;
      }
    }
  }, [_c("a", {
    staticStyle: {
      "text-decoration": "none"
    },
    attrs: {
      href: _vm.currentImg,
      download: ""
    }
  }, [_vm._v("Скачать изображение")])])], 1)], 1)], 1)]], 2);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/bitrix/Tickets.vue?vue&type=template&id=a4738756&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/bitrix/Tickets.vue?vue&type=template&id=a4738756&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_c("v-data-table", {
    staticClass: "elevation-1",
    attrs: {
      headers: _vm.headers,
      items: _vm.tickets,
      loading: _vm.loadingTickets,
      "multi-sort": "",
      "items-per-page": 15,
      "item-key": "id"
    },
    scopedSlots: _vm._u([{
      key: "item.status",
      fn: function fn(_ref) {
        var item = _ref.item;
        return [item.status ? _c("span", {
          staticClass: "green--text"
        }, [_vm._v("Новое сообщение")]) : _vm._e()];
      }
    }, {
      key: "item.queue",
      fn: function fn(_ref2) {
        var item = _ref2.item;
        return [item.queue < 999999 ? _c("span", [_vm._v(_vm._s(item.queue))]) : _vm._e()];
      }
    }, {
      key: "item.created_at",
      fn: function fn(_ref3) {
        var item = _ref3.item;
        return [_c("span", [_vm._v(_vm._s(_vm.getDateTime(item.created_at)))])];
      }
    }, {
      key: "item.actions",
      fn: function fn(_ref4) {
        var item = _ref4.item;
        return [_c("v-badge", {
          attrs: {
            content: item.unread,
            value: item.unread,
            bordered: "",
            overlap: ""
          }
        }, [_c("v-icon", {
          on: {
            click: function click($event) {
              return _vm.openMessage(item);
            }
          }
        }, [_vm._v("\n                    mdi-message-text\n                ")])], 1), _vm._v(" "), item.coupon ? _c("v-icon", {
          staticClass: "ml-2",
          attrs: {
            color: "amber darken-2"
          }
        }, [_vm._v("\n                mdi-ticket\n            ")]) : _vm.isAdmin || _vm.isManager ? _c("v-icon", {
          staticClass: "ml-2"
        }, [_vm._v("\n                mdi-ticket\n            ")]) : _c("v-icon", {
          staticClass: "ml-2",
          on: {
            click: function click($event) {
              return _vm.openCouponForm(item);
            }
          }
        }, [_vm._v("\n                mdi-ticket\n            ")]), _vm._v(" "), _vm.isAdmin || _vm.isManager ? _c("v-icon", {
          staticClass: "ml-2",
          on: {
            click: function click($event) {
              return _vm.getAllManagers(item);
            }
          }
        }, [_vm._v("\n                mdi-account-switch\n            ")]) : _vm._e(), _vm._v(" "), _c("v-icon", {
          staticClass: "ml-2",
          on: {
            click: function click($event) {
              return _vm.toArchive(item);
            }
          }
        }, [_vm._v("\n                mdi-delete\n            ")])];
      }
    }])
  }), _vm._v(" "), _c("v-dialog", {
    attrs: {
      persistent: "",
      "max-width": "250"
    },
    model: {
      value: _vm.openConfirm,
      callback: function callback($$v) {
        _vm.openConfirm = $$v;
      },
      expression: "openConfirm"
    }
  }, [_c("v-card", [_c("v-card-title", {
    staticClass: "text-h5"
  }, [_vm._v("\n                Подтверждение\n            ")]), _vm._v(" "), _c("v-card-text", [_vm._v("Завершить работу с тикетом и отправить его в архив?")]), _vm._v(" "), _c("v-card-actions", [_c("v-spacer"), _vm._v(" "), _c("v-btn", {
    attrs: {
      text: ""
    },
    on: {
      click: function click($event) {
        _vm.openConfirm = false;
      }
    }
  }, [_vm._v("\n                    Отмена\n                ")]), _vm._v(" "), _c("v-btn", {
    attrs: {
      color: "red",
      dark: "",
      loading: _vm.transferingToArchive
    },
    on: {
      click: function click($event) {
        return _vm.transferToArchive(_vm.item);
      }
    }
  }, [_vm._v("\n                    В архив\n                ")])], 1)], 1)], 1), _vm._v(" "), _c("v-dialog", {
    attrs: {
      persistent: "",
      "max-width": "300"
    },
    model: {
      value: _vm.openCoupon,
      callback: function callback($$v) {
        _vm.openCoupon = $$v;
      },
      expression: "openCoupon"
    }
  }, [_c("v-card", [_c("v-card-title", {
    staticClass: "text-h5"
  }, [_vm._v("\n                Применить купон\n            ")]), _vm._v(" "), _c("v-form", {
    ref: "couponForm",
    attrs: {
      "lazy-validation": ""
    },
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        return _vm.ApplyCoupon.apply(null, arguments);
      }
    },
    model: {
      value: _vm.validCouponForm,
      callback: function callback($$v) {
        _vm.validCouponForm = $$v;
      },
      expression: "validCouponForm"
    }
  }, [_c("v-card-text", [_c("v-autocomplete", {
    attrs: {
      disabled: _vm.couponCodesLoading,
      items: _vm.couponCodes,
      rules: _vm.couponRules,
      label: "Купон",
      "no-data-text": "Нет доступных купонов",
      "item-text": "code",
      "item-value": "code"
    },
    scopedSlots: _vm._u([{
      key: "selection",
      fn: function fn(_ref5) {
        var item = _ref5.item;
        return [_vm._v("\n                            " + _vm._s(item.code) + " (+" + _vm._s(item.weight) + ")\n                        ")];
      }
    }, {
      key: "item",
      fn: function fn(_ref6) {
        var item = _ref6.item;
        return [[_c("v-list-item-content", [_c("v-list-item-title", [_vm._v("\n                                        " + _vm._s(item.code) + " (+" + _vm._s(item.weight) + ")\n                                    ")]), _vm._v(" "), _c("v-list-item-subtitle", [_vm._v("\n                                        Годен до: " + _vm._s(new Date(item.expiration_date * 1000).toLocaleDateString()) + "\n                                    ")])], 1)]];
      }
    }]),
    model: {
      value: _vm.couponCode,
      callback: function callback($$v) {
        _vm.couponCode = $$v;
      },
      expression: "couponCode"
    }
  })], 1), _vm._v(" "), _c("v-card-actions", [_c("v-spacer"), _vm._v(" "), _c("v-btn", {
    attrs: {
      text: ""
    },
    on: {
      click: function click($event) {
        _vm.openCoupon = false;
      }
    }
  }, [_vm._v("\n                        Отмена\n                    ")]), _vm._v(" "), _c("v-btn", {
    attrs: {
      disabled: !_vm.validCouponForm,
      color: "primary",
      loading: _vm.loadingCouponForm,
      type: "submit"
    }
  }, [_vm._v("\n                        Применить\n                    ")])], 1)], 1)], 1)], 1), _vm._v(" "), _c("v-dialog", {
    attrs: {
      width: 500
    },
    model: {
      value: _vm.dialogForTransfer,
      callback: function callback($$v) {
        _vm.dialogForTransfer = $$v;
      },
      expression: "dialogForTransfer"
    }
  }, [_c("v-card", [_c("v-card-title", [_vm._v("Выберите другого сотрудника техподдержки")]), _vm._v(" "), _c("v-card", [_c("v-select", {
    staticClass: "pa-2 ma-2",
    attrs: {
      items: _vm.managers,
      "item-text": function itemText(manager) {
        return manager.name + " " + manager.lastName;
      },
      "item-value": function itemValue(manager) {
        return manager.lastName;
      },
      width: 450
    },
    model: {
      value: _vm.selectManager,
      callback: function callback($$v) {
        _vm.selectManager = $$v;
      },
      expression: "selectManager"
    }
  }), _vm._v(" "), _c("v-btn", {
    staticClass: "ma-2",
    on: {
      click: function click($event) {
        _vm.dialogForTransfer = false;
      }
    }
  }, [_vm._v("\n                    Отменить\n                ")]), _vm._v(" "), _c("v-btn", {
    staticClass: "ma-2",
    attrs: {
      color: "success"
    },
    on: {
      click: _vm.transferToAnotherManager
    }
  }, [_vm._v("\n                    Отправить\n                ")])], 1)], 1)], 1), _vm._v(" "), _vm.isAdmin || _vm.isManager ? _c("v-btn", {
    staticClass: "mx-2",
    attrs: {
      fixed: "",
      bottom: "",
      dark: "",
      color: !_vm.isOnline ? "indigo" : "red"
    },
    on: {
      click: function click($event) {
        return _vm.setOnline(!_vm.isOnline);
      }
    }
  }, [_vm._v("\n        " + _vm._s(!_vm.isOnline ? "Получить тикеты" : "Завершить работу") + "\n    ")]) : _vm._e(), _vm._v(" "), _c("v-btn", {
    staticClass: "mx-2",
    attrs: {
      fixed: "",
      bottom: "",
      right: "",
      fab: "",
      dark: "",
      color: "indigo",
      to: {
        name: "bitrix-tickets-add"
      }
    }
  }, [_c("v-icon", {
    attrs: {
      dark: ""
    }
  }, [_vm._v("\n            mdi-plus\n        ")])], 1)], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/bitrix/Users.vue?vue&type=template&id=2804f876&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/bitrix/Users.vue?vue&type=template&id=2804f876&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_c("v-sheet", {
    staticClass: "pa-4",
    attrs: {
      color: "#6A76AB",
      dark: ""
    }
  }, [_c("v-text-field", {
    attrs: {
      label: "Поиск",
      dark: "",
      flat: "",
      "solo-inverted": "",
      "hide-details": "",
      clearable: "",
      "clear-icon": "mdi-close-circle-outline"
    },
    model: {
      value: _vm.search,
      callback: function callback($$v) {
        _vm.search = $$v;
      },
      expression: "search"
    }
  })], 1), _vm._v(" "), _c("v-data-table", {
    staticClass: "elevation-1",
    attrs: {
      headers: _vm.headers,
      items: _vm.managers,
      loading: _vm.managerLoading,
      "multi-sort": "",
      "items-per-page": 10,
      search: _vm.search
    },
    scopedSlots: _vm._u([{
      key: "item.is_manager",
      fn: function fn(_ref) {
        var item = _ref.item;
        return [_vm.isAdmin ? _c("v-switch", {
          staticStyle: {
            margin: "0 0 -16px 0"
          },
          attrs: {
            loading: item.loading,
            dense: ""
          },
          on: {
            change: function change($event) {
              return _vm.isManagerChange(item);
            }
          },
          model: {
            value: item.is_manager,
            callback: function callback($$v) {
              _vm.$set(item, "is_manager", $$v);
            },
            expression: "item.is_manager"
          }
        }) : _c("v-switch", {
          staticStyle: {
            margin: "0 0 -16px 0"
          },
          attrs: {
            dense: "",
            readonly: ""
          },
          on: {
            change: function change($event) {
              return _vm.isManagerChange(item);
            }
          },
          model: {
            value: item.is_manager,
            callback: function callback($$v) {
              _vm.$set(item, "is_manager", $$v);
            },
            expression: "item.is_manager"
          }
        })];
      }
    }])
  })], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/bitrix/TicketMessage.vue?vue&type=style&index=0&id=029f8b6e&lang=scss&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/bitrix/TicketMessage.vue?vue&type=style&index=0&id=029f8b6e&lang=scss& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".image {\n  width: 50px;\n  height: 50px;\n  cursor: pointer;\n}\n.sticky-bottom {\n  position: fixed;\n  left: 12px;\n  bottom: 12px;\n  background: #fff;\n  width: 100%;\n}\n.pre {\n  white-space: pre-wrap;\n}\n.transit {\n  height: 21px;\n  width: 24px;\n  padding: 1px;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/bitrix/TicketMessage.vue?vue&type=style&index=0&id=029f8b6e&lang=scss&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/bitrix/TicketMessage.vue?vue&type=style&index=0&id=029f8b6e&lang=scss& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TicketMessage_vue_vue_type_style_index_0_id_029f8b6e_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TicketMessage.vue?vue&type=style&index=0&id=029f8b6e&lang=scss& */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/bitrix/TicketMessage.vue?vue&type=style&index=0&id=029f8b6e&lang=scss&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TicketMessage_vue_vue_type_style_index_0_id_029f8b6e_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TicketMessage_vue_vue_type_style_index_0_id_029f8b6e_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/pages/bitrix/TicketMessage.vue":
/*!*****************************************************!*\
  !*** ./resources/js/pages/bitrix/TicketMessage.vue ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TicketMessage_vue_vue_type_template_id_029f8b6e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TicketMessage.vue?vue&type=template&id=029f8b6e& */ "./resources/js/pages/bitrix/TicketMessage.vue?vue&type=template&id=029f8b6e&");
/* harmony import */ var _TicketMessage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TicketMessage.vue?vue&type=script&lang=js& */ "./resources/js/pages/bitrix/TicketMessage.vue?vue&type=script&lang=js&");
/* harmony import */ var _TicketMessage_vue_vue_type_style_index_0_id_029f8b6e_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TicketMessage.vue?vue&type=style&index=0&id=029f8b6e&lang=scss& */ "./resources/js/pages/bitrix/TicketMessage.vue?vue&type=style&index=0&id=029f8b6e&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _TicketMessage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TicketMessage_vue_vue_type_template_id_029f8b6e___WEBPACK_IMPORTED_MODULE_0__.render,
  _TicketMessage_vue_vue_type_template_id_029f8b6e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/bitrix/TicketMessage.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/bitrix/Tickets.vue":
/*!***********************************************!*\
  !*** ./resources/js/pages/bitrix/Tickets.vue ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Tickets_vue_vue_type_template_id_a4738756_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tickets.vue?vue&type=template&id=a4738756&scoped=true& */ "./resources/js/pages/bitrix/Tickets.vue?vue&type=template&id=a4738756&scoped=true&");
/* harmony import */ var _Tickets_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tickets.vue?vue&type=script&lang=js& */ "./resources/js/pages/bitrix/Tickets.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Tickets_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Tickets_vue_vue_type_template_id_a4738756_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Tickets_vue_vue_type_template_id_a4738756_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "a4738756",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/bitrix/Tickets.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/bitrix/Users.vue":
/*!*********************************************!*\
  !*** ./resources/js/pages/bitrix/Users.vue ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Users_vue_vue_type_template_id_2804f876_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Users.vue?vue&type=template&id=2804f876&scoped=true& */ "./resources/js/pages/bitrix/Users.vue?vue&type=template&id=2804f876&scoped=true&");
/* harmony import */ var _Users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Users.vue?vue&type=script&lang=js& */ "./resources/js/pages/bitrix/Users.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Users_vue_vue_type_template_id_2804f876_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Users_vue_vue_type_template_id_2804f876_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "2804f876",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/bitrix/Users.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/bitrix/TicketMessage.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/pages/bitrix/TicketMessage.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TicketMessage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TicketMessage.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/bitrix/TicketMessage.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TicketMessage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/bitrix/Tickets.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/pages/bitrix/Tickets.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tickets_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Tickets.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/bitrix/Tickets.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tickets_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/bitrix/Users.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./resources/js/pages/bitrix/Users.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Users.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/bitrix/Users.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/bitrix/TicketMessage.vue?vue&type=template&id=029f8b6e&":
/*!************************************************************************************!*\
  !*** ./resources/js/pages/bitrix/TicketMessage.vue?vue&type=template&id=029f8b6e& ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_TicketMessage_vue_vue_type_template_id_029f8b6e___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_TicketMessage_vue_vue_type_template_id_029f8b6e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_TicketMessage_vue_vue_type_template_id_029f8b6e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TicketMessage.vue?vue&type=template&id=029f8b6e& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/bitrix/TicketMessage.vue?vue&type=template&id=029f8b6e&");


/***/ }),

/***/ "./resources/js/pages/bitrix/Tickets.vue?vue&type=template&id=a4738756&scoped=true&":
/*!******************************************************************************************!*\
  !*** ./resources/js/pages/bitrix/Tickets.vue?vue&type=template&id=a4738756&scoped=true& ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Tickets_vue_vue_type_template_id_a4738756_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Tickets_vue_vue_type_template_id_a4738756_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Tickets_vue_vue_type_template_id_a4738756_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Tickets.vue?vue&type=template&id=a4738756&scoped=true& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/bitrix/Tickets.vue?vue&type=template&id=a4738756&scoped=true&");


/***/ }),

/***/ "./resources/js/pages/bitrix/Users.vue?vue&type=template&id=2804f876&scoped=true&":
/*!****************************************************************************************!*\
  !*** ./resources/js/pages/bitrix/Users.vue?vue&type=template&id=2804f876&scoped=true& ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_template_id_2804f876_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_template_id_2804f876_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_template_id_2804f876_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Users.vue?vue&type=template&id=2804f876&scoped=true& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/bitrix/Users.vue?vue&type=template&id=2804f876&scoped=true&");


/***/ }),

/***/ "./resources/js/pages/bitrix/TicketMessage.vue?vue&type=style&index=0&id=029f8b6e&lang=scss&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/pages/bitrix/TicketMessage.vue?vue&type=style&index=0&id=029f8b6e&lang=scss& ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TicketMessage_vue_vue_type_style_index_0_id_029f8b6e_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TicketMessage.vue?vue&type=style&index=0&id=029f8b6e&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/bitrix/TicketMessage.vue?vue&type=style&index=0&id=029f8b6e&lang=scss&");


/***/ })

}]);