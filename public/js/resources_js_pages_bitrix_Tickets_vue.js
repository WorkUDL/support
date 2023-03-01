"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_bitrix_Tickets_vue"],{

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
      }],
      sortBy: null,
      sortDesc: null,
      filters: {
        sortBy: [],
        sortDesc: []
      }
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
      console.log(this.$router);
      this.$router.push({
        name: 'bitrix-tickets-message',
        params: {
          ticket_id: ticket.id
        }
      });
      console.log(this.$router);
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
    getTicketsParticipants: function getTicketsParticipants() {
      var _this7 = this;
      axios.post('/api/ticket/participants', {}, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      }).then(function (res) {
        console.log(res.data);
        res.data.forEach(function (ticket) {
          ticket.user_id = ticket.user_id.last_name + ' ' + ticket.user_id.name + ' ' + ticket.user_id.second_name;
          _this7.tickets.push(ticket);
        });
        console.log(_this7.tickets);
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    loadFiltersFromDB: function loadFiltersFromDB() {
      var _this8 = this;
      axios.post('/api/table_filter/get_filters', {
        userId: this.currentUser.id
      }, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      }).then(function (res) {
        _this8.sortBy = res.data.sortBy;
        _this8.sortDesc = res.data.sortDesc;
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    saveFiltersToDB: function saveFiltersToDB() {
      var _this9 = this;
      window.addEventListener('beforeunload', function () {
        _this9.filters.sortBy = _this9.sortBy;
        _this9.filters.sortDesc = _this9.sortDesc;
        axios.post('/api/table_filter/add_filters', {
          filters: JSON.stringify(_this9.filters)
        }, {
          headers: {
            Authorization: 'Bearer ' + _this9.currentToken
          }
        }).then(function (res) {
          return console.log(res);
        })["catch"](function (err) {
          return console.log(err);
        });
      });
    },
    openDialogInNewWindow: function openDialogInNewWindow(ticket) {
      window.open("https://xn--24-9kc.xn--d1ao9c.xn--p1ai/marketplace/app/74/?ticket_id=".concat(ticket.id));
    }
  },
  created: function created() {
    this.loadFiltersFromDB();
    this.saveFiltersToDB();
  },
  mounted: function mounted() {
    this.getTickets();
    this.getTicketsParticipants();
  }
});

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
      "item-key": "id",
      search: _vm.filters.search,
      "sort-by": _vm.sortBy,
      "sort-desc": _vm.sortDesc
    },
    on: {
      "update:sortBy": function updateSortBy($event) {
        _vm.sortBy = $event;
      },
      "update:sort-by": function updateSortBy($event) {
        _vm.sortBy = $event;
      },
      "update:sortDesc": function updateSortDesc($event) {
        _vm.sortDesc = $event;
      },
      "update:sort-desc": function updateSortDesc($event) {
        _vm.sortDesc = $event;
      }
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
          attrs: {
            id: "message"
          },
          on: {
            click: function click($event) {
              return _vm.openMessage(item);
            },
            mousedown: function mousedown($event) {
              if ("button" in $event && $event.button !== 1) return null;
              return _vm.openDialogInNewWindow(item);
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


/***/ })

}]);