"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_bitrix_Groups_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/bitrix/Groups.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/bitrix/Groups.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************/
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
  name: "Groups",
  data: function data() {
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
      headers: [{
        text: 'Название',
        value: 'name',
        sortable: true
      }, {
        text: 'Действия',
        value: 'actions'
      }],
      groups: [],
      requiredRules: [function (v) {
        return !!v && !!v.length || 'Обязательное поле';
      }]
    };
  },
  watch: {
    newGroupForm: function newGroupForm(newVal) {
      if (!newVal) {
        this.name = null;
        this.update = null;
      }
    }
  },
  computed: _objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_0__.mapState)(['currentToken', 'currentUser', 'users', 'isManager', 'isAdmin'])),
  methods: {
    showNewGroupForm: function showNewGroupForm() {
      if (this.$refs.newGroupForm) this.$refs.newGroupForm.reset();
      this.update = null;
      this.newGroupForm = true;
    },
    editGroup: function editGroup(item) {
      var _this = this;
      if (this.$refs.newGroupForm) this.$refs.newGroupForm.reset();
      this.name = item.name;
      this.update = item.id;
      this.newGroupForm = true;
      this.isLoadingUsers = true;
      this.managers = [];
      axios.post('/api/group/managers', {
        id: item.id
      }, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      }).then(function (resp) {
        _this.managers = resp.data.map(function (i) {
          return Object.assign({
            id: i.bitrix_id.toString(),
            name: i.name,
            photo: i.photo
          }, _this.users.find(function (u) {
            return u.id === i.bitrix_id.toString();
          }));
        });
      })["catch"](function (err) {
        console.log(err);
      })["finally"](function () {
        _this.isLoadingUsers = false;
      });
    },
    deleteConfirmGroup: function deleteConfirmGroup(item) {
      this.update = item.id;
      this.openConfirm = true;
    },
    deleteGroup: function deleteGroup() {
      var _this2 = this;
      this.deleteGroupLoading = true;
      axios.post('/api/group/delete', {
        id: this.update
      }, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      }).then(function () {
        _this2.openConfirm = false;
        _this2.groups = _this2.groups.filter(function (i) {
          return i.id !== _this2.update;
        });
      })["finally"](function () {
        _this2.deleteGroupLoading = false;
      });
    },
    addGroup: function addGroup() {
      var _this3 = this;
      if (this.$refs.newGroupForm.validate()) {
        this.newGroupFormLoading = true;
        if (this.update === null) {
          axios.post('/api/group/add', {
            name: this.name,
            managers: this.managers
          }, {
            headers: {
              Authorization: 'Bearer ' + this.currentToken
            }
          }).then(function (resp) {
            _this3.groups.push(resp.data);
            _this3.newGroupForm = false;
          })["catch"](function (err) {
            _this3.$store.dispatch('notice', err.response.data.error);
          })["finally"](function () {
            _this3.newGroupFormLoading = false;
          });
        } else {
          axios.post('/api/group/update', {
            id: this.update,
            name: this.name,
            managers: this.managers
          }, {
            headers: {
              Authorization: 'Bearer ' + this.currentToken
            }
          }).then(function () {
            return _this3.getGroups().then(function () {
              _this3.newGroupForm = false;
              _this3.newGroupFormLoading = false;
            });
          })["catch"](function (err) {
            _this3.$store.dispatch('notice', err.response.data.error);
            _this3.newGroupFormLoading = false;
          });
        }
      }
    },
    getGroups: function getGroups() {
      var _this4 = this;
      this.groupLoading = true;
      return new Promise(function (resolve, reject) {
        axios.post('/api/group/list', {}, {
          headers: {
            Authorization: 'Bearer ' + _this4.currentToken
          }
        }).then(function (resp) {
          return _this4.groups = resp.data;
        })["catch"](function (err) {
          return _this4.$store.dispatch('notice', err.response.data.error);
        })["finally"](function () {
          _this4.groupLoading = false;
          resolve();
        });
      });
    }
  },
  mounted: function mounted() {
    var _this5 = this;
    this.getGroups();
    this.$store.dispatch('getUsers').then(function () {
      _this5.loadingUsers = true;
    })["catch"](function () {});
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/bitrix/Groups.vue?vue&type=template&id=d745fd54&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/bitrix/Groups.vue?vue&type=template&id=d745fd54&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************/
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
      items: _vm.groups,
      "multi-sort": "",
      "items-per-page": 10,
      loading: _vm.groupLoading
    },
    scopedSlots: _vm._u([{
      key: "item.actions",
      fn: function fn(_ref) {
        var item = _ref.item;
        return [_c("v-icon", {
          staticClass: "mr-2",
          attrs: {
            small: ""
          },
          on: {
            click: function click($event) {
              return _vm.editGroup(item);
            }
          }
        }, [_vm._v("\n                mdi-pencil\n            ")]), _vm._v(" "), _c("v-icon", {
          attrs: {
            small: ""
          },
          on: {
            click: function click($event) {
              return _vm.deleteConfirmGroup(item);
            }
          }
        }, [_vm._v("\n                mdi-delete\n            ")])];
      }
    }])
  }), _vm._v(" "), _c("v-btn", {
    staticClass: "mx-2",
    attrs: {
      fixed: "",
      bottom: "",
      right: "",
      fab: "",
      dark: "",
      color: "indigo"
    },
    on: {
      click: _vm.showNewGroupForm
    }
  }, [_c("v-icon", {
    attrs: {
      dark: ""
    }
  }, [_vm._v("\n            mdi-plus\n        ")])], 1), _vm._v(" "), _c("v-dialog", {
    attrs: {
      persistent: "",
      scrollable: "",
      "max-width": "400px"
    },
    model: {
      value: _vm.newGroupForm,
      callback: function callback($$v) {
        _vm.newGroupForm = $$v;
      },
      expression: "newGroupForm"
    }
  }, [_c("v-card", [_vm.update === null ? _c("v-card-title", [_vm._v("Новая группа")]) : _c("v-card-title", [_vm._v("Редактирование группы")]), _vm._v(" "), _c("v-divider"), _vm._v(" "), _c("v-card-text", {
    staticStyle: {
      padding: "16px"
    }
  }, [_c("v-form", {
    ref: "newGroupForm",
    attrs: {
      "lazy-validation": ""
    },
    model: {
      value: _vm.newGroupFormValid,
      callback: function callback($$v) {
        _vm.newGroupFormValid = $$v;
      },
      expression: "newGroupFormValid"
    }
  }, [_c("v-text-field", {
    attrs: {
      rules: _vm.requiredRules,
      label: "Название",
      "prepend-icon": "mdi-weight-kilogram",
      required: ""
    },
    model: {
      value: _vm.name,
      callback: function callback($$v) {
        _vm.name = $$v;
      },
      expression: "name"
    }
  }), _vm._v(" "), _c("v-autocomplete", {
    attrs: {
      items: _vm.users.filter(function (i) {
        return i.is_manager;
      }),
      loading: _vm.isLoadingUsers,
      rules: _vm.requiredRules,
      "hide-no-data": "",
      "item-value": "id",
      "item-text": "name",
      label: "Менеджеры",
      placeholder: "Введите имя получателя",
      "prepend-icon": "mdi-database-search",
      multiple: "",
      "hide-selected": "",
      chips: "",
      "return-object": ""
    },
    scopedSlots: _vm._u([{
      key: "item",
      fn: function fn(_ref2) {
        var item = _ref2.item;
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
      fn: function fn(_ref3) {
        var item = _ref3.item;
        return [_c("v-chip", _vm._b({
          on: {
            "click:close": function clickClose($event) {
              _vm.managers = _vm.managers.filter(function (i) {
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
      value: _vm.managers,
      callback: function callback($$v) {
        _vm.managers = $$v;
      },
      expression: "managers"
    }
  })], 1)], 1), _vm._v(" "), _c("v-card-actions", {
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
        _vm.newGroupForm = false;
      }
    }
  }, [_vm._v("\n                    Отмена\n                ")]), _vm._v(" "), _vm.update === null ? _c("v-btn", {
    attrs: {
      disabled: !_vm.newGroupFormValid || _vm.newGroupFormLoading,
      loading: _vm.newGroupFormLoading,
      color: "success"
    },
    on: {
      click: _vm.addGroup
    }
  }, [_vm._v("\n                    Добавить\n                ")]) : _c("v-btn", {
    attrs: {
      disabled: !_vm.newGroupFormValid || _vm.newGroupFormLoading || _vm.isLoadingUsers,
      loading: _vm.newGroupFormLoading,
      color: "success"
    },
    on: {
      click: _vm.addGroup
    }
  }, [_vm._v("\n                    Сохранить\n                ")])], 1)], 1)], 1), _vm._v(" "), _c("v-dialog", {
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
  }, [_vm._v("\n                Подтверждение\n            ")]), _vm._v(" "), _c("v-card-text", [_vm._v("Удалить группу?")]), _vm._v(" "), _c("v-card-actions", [_c("v-spacer"), _vm._v(" "), _c("v-btn", {
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
      loading: _vm.deleteGroupLoading
    },
    on: {
      click: _vm.deleteGroup
    }
  }, [_vm._v("\n                    Удалить\n                ")])], 1)], 1)], 1)], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/pages/bitrix/Groups.vue":
/*!**********************************************!*\
  !*** ./resources/js/pages/bitrix/Groups.vue ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Groups_vue_vue_type_template_id_d745fd54_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Groups.vue?vue&type=template&id=d745fd54&scoped=true& */ "./resources/js/pages/bitrix/Groups.vue?vue&type=template&id=d745fd54&scoped=true&");
/* harmony import */ var _Groups_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Groups.vue?vue&type=script&lang=js& */ "./resources/js/pages/bitrix/Groups.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Groups_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Groups_vue_vue_type_template_id_d745fd54_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Groups_vue_vue_type_template_id_d745fd54_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "d745fd54",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/bitrix/Groups.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/bitrix/Groups.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./resources/js/pages/bitrix/Groups.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Groups_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Groups.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/bitrix/Groups.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Groups_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/bitrix/Groups.vue?vue&type=template&id=d745fd54&scoped=true&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/pages/bitrix/Groups.vue?vue&type=template&id=d745fd54&scoped=true& ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Groups_vue_vue_type_template_id_d745fd54_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Groups_vue_vue_type_template_id_d745fd54_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Groups_vue_vue_type_template_id_d745fd54_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Groups.vue?vue&type=template&id=d745fd54&scoped=true& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/bitrix/Groups.vue?vue&type=template&id=d745fd54&scoped=true&");


/***/ })

}]);