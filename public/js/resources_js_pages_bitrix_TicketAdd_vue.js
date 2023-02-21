"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_bitrix_TicketAdd_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/bitrix/TicketAdd.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/bitrix/TicketAdd.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var bitrix24_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bitrix24-vue */ "./node_modules/bitrix24-vue/dist/bitrix24-vue.common.js");
/* harmony import */ var bitrix24_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bitrix24_vue__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "TicketAdd",
  data: function data() {
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
      requiredRules: [function (v) {
        return !!v || 'Обязательное поле';
      }],
      information: [{
        id: 0,
        name: 'Без дополнительной информации'
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
    };
  },
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_1__.mapState)(['currentToken', 'currentUser', 'isManager', 'isAdmin'])), {}, {
    items: function items() {
      return this.isManager && this.isAdmin ? this.buildTree(this.reasonsList) : this.buildTree(this.reasonsList, 0);
    },
    hints: function hints() {
      var _this = this;
      console.log(this.hintList);
      this.openedHint = this.hintList.filter(function (h) {
        return h.reason_id === _this.reasonsActive.id;
      }).length === 1 ? [0] : [];
      return this.hintList.filter(function (h) {
        return h.reason_id === _this.reasonsActive.id;
      });
    }
  }),
  watch: {
    active: function active(newVal) {
      var _this2 = this;
      if (newVal == 108) {
        this.getListBitrixData();
      }
      if (newVal == 109) {
        this.getListCallData();
      }
      if (newVal.length >= 1 && !this.reasonsList.find(function (user) {
        return user.id === newVal[0];
      }).children) {
        if (this.$refs.formTicket) this.$refs.formTicket.reset();
        this.reasonsActive = this.reasonsList.find(function (user) {
          return user.id === newVal[0];
        });
        this.skippedHint = false;
        this.ticket_information_show = false;
        this.ticket_information = null;
        if (this.reasonsList.find(function (r) {
          return r.id === newVal[0];
        }).information_id) {
          this.ticket_information_loading = true;
          axios.post('/api/reason/information', {
            id: newVal
          }, {
            headers: {
              Authorization: 'Bearer ' + this.currentToken
            }
          }).then(function (resp) {
            _this2.ticket_information = resp.data.join('\n');
            console.log(_this2.ticket_information);
            _this2.ticket_information_show = true;
          })["catch"](function (err) {
            console.error(err);
          })["finally"](function () {
            _this2.ticket_information_loading = false;
          });
        }
      }
    }
  },
  methods: {
    closeCreateTemplate: function closeCreateTemplate() {
      this.dialogCreateTemplate = false;
      this.templateResponses = [];
      this.messageCreateTemplate = '';
    },
    addTemplate: function addTemplate() {
      var _this3 = this;
      axios.post('/api/template_response/add', {
        template_response: this.messageCreateTemplate,
        reason_id: this.editId
      }, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      }).then(function (res) {
        console.log(res);
        _this3.templateResponses = [];
        _this3.getTemplates();
        _this3.messageCreateTemplate = '';
      })["catch"](function (err) {
        return console.log(err);
      })["finally"](this.messageCreateTemplate = '');
    },
    getTemplates: function getTemplates() {
      var _this4 = this;
      axios.post('/api/template_response/get', {
        reason_id: this.editId
      }, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      }).then(function (res) {
        res.data.forEach(function (el) {
          _this4.templateResponses.push(el);
        });
        console.log(_this4.templateResponses);
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    deleteTemplate: function deleteTemplate(template) {
      var _this5 = this;
      axios.post('/api/template_response/delete', {
        data: template
      }, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      }).then(function (res) {
        var index = _this5.templateResponses.indexOf(template);
        _this5.templateResponses.splice(index, 1);
        console.log(res);
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    showFormAddTemplate: function showFormAddTemplate(item) {
      console.log(item);
      this.editId = item.id;
      this.dialogCreateTemplate = true;
      this.getTemplates();
    },
    showFormAddHint: function showFormAddHint() {
      this.shortHint = null;
      this.fullHint = null;
      this.iframeHint = null;
      this.openFormAddHint = true;
    },
    showFormAddReason: function showFormAddReason(item) {
      var isEdit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this.parent_id = item.id;
      this.name = isEdit ? item.name : null;
      this.weight = isEdit ? item.weight : null;
      this.group_id = isEdit ? item.group_id : null;
      this.visibility = isEdit ? item.visibility : null;
      this.information_id = isEdit ? item.information_id : null;
      this.newReasonDialog = true;
      this.editId = isEdit ? item.id : null;
      if (this.$refs.formAddReason) this.$refs.formAddReason.resetValidation();
    },
    buildTree: function buildTree(elements, parent_id) {
      var _this6 = this;
      var branch = [];
      elements.forEach(function (i) {
        if (i.parent_id === parent_id) {
          var parent = _this6.buildTree(elements, i.id);
          if (parent && parent.length) i.children = parent;
          branch.push(i);
        }
      });
      console.log(branch);
      return branch;
    },
    getInformation: function getInformation() {
      var _this7 = this;
      axios.post('/api/information/get', {}, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      }).then(function (resp) {
        return _this7.information = [{
          id: 0,
          name: 'Без дополнительной информации'
        }].concat(resp.data);
      })["catch"](function (err) {
        return console.error(err);
      });
    },
    getReason: function getReason() {
      var _this8 = this;
      axios.post('/api/reason/get', {}, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      }).then(function (resp) {
        return _this8.reasonsList = [{
          id: 0,
          name: 'Корневой каталог',
          children: []
        }].concat(resp.data);
      })["catch"](function (err) {
        return console.error(err);
      });
    },
    addReason: function addReason() {
      var _this9 = this;
      if (this.$refs.formAddReason.validate()) {
        this.reasonAddLoading = true;
        axios.post(this.editId === null ? '/api/reason/add' : '/api/reason/update', Object.assign({
          name: this.name,
          weight: this.weight,
          group_id: this.group_id,
          visibility: this.visibility,
          information_id: this.information_id
        }, this.editId !== null ? {} : {
          parent_id: this.parent_id
        }, this.editId === null ? {} : {
          id: this.editId
        }), {
          headers: {
            Authorization: 'Bearer ' + this.currentToken
          }
        }).then(function () {
          _this9.$refs.formAddReason.reset();
          _this9.newReasonDialog = false;
          _this9.getReason();
        })["catch"](function (err) {
          return console.error(err);
        })["finally"](function () {
          return _this9.reasonAddLoading = false;
        });
      }
    },
    addTicket: function addTicket() {
      var _this10 = this;
      if (this.$refs.formTicket.validate()) {
        this.addingTicket = true;
        axios.post('/api/ticket/add', {
          data: this.selectedData,
          message: this.ticket_information !== null ? this.ticket_information + "\n\n" + this.ticket_message : this.ticket_message + (this.anyDeskNumber ? "\n\n" + "Номер моего AnyDesk: " + this.anyDeskNumber : ""),
          reason_id: this.reasonsActive.id
        }, {
          headers: {
            Authorization: 'Bearer ' + this.currentToken
          }
        }).then(function (res) {
          _this10.$router.replace({
            name: 'bitrix-tickets'
          });
          console.log(res.data);
        })["catch"](function (err) {
          return _this10.$store.dispatch('notice', err.response.data.error);
        })["finally"](function () {
          _this10.addingTicket = false;
          _this10.anyDeskNumber = null;
        });
      }
    },
    getHint: function getHint(item) {
      var _this11 = this;
      axios.post('/api/hint/get', {}, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      }).then(function (resp) {
        _this11.hintList = resp.data;
      })["catch"](function (err) {
        console.error(err);
      });
    },
    addHint: function addHint() {
      var _this12 = this;
      if (this.$refs.formAddHint.validate()) {
        this.addingHint = true;
        axios.post('/api/hint/add', {
          "short": this.shortHint,
          full: this.fullHint,
          iframeHint: this.iframeHint,
          reason_id: this.reasonsActive.id
        }, {
          headers: {
            Authorization: 'Bearer ' + this.currentToken
          }
        }).then(function (resp) {
          _this12.hintList.push(resp.data);
          _this12.$refs.formAddHint.reset();
          _this12.openFormAddHint = false;
          _this12.skippedHint = false;
        })["catch"](function (err) {
          return console.error(err);
        })["finally"](function () {
          return _this12.addingHint = false;
        });
      }
    },
    getGroups: function getGroups() {
      var _this13 = this;
      axios.post('/api/group/list', {}, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      }).then(function (resp) {
        return _this13.groups = resp.data;
      })["catch"](function (err) {
        return console.error(err);
      });
    },
    addImage: function addImage(event) {
      if (event.size > 2e+6) {
        alert('Вы можете добавлять изображения весом до 2мб');
      }
      if (event.type.includes('image') !== true) {
        alert('Вы можете добавлять только изображения');
      } else {
        this.isFileUploading = true;
        this.imagesForAdd.push(event);
        console.log(this.imagesForAdd);
        this.isFileUploading = false;
      }
    },
    createImage: function createImage() {
      var _this14 = this;
      var data = new FormData();
      this.imagesForAdd.forEach(function (image) {
        data.append("images[]", image);
        data.append('hint_id', _this14.hintActive);
      });
      axios.post('/api/hint/add_image', data, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      }).then(function (res) {
        console.log(res);
        _this14.dialogImageForAdd = false;
        _this14.imagesForAdd = [];
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    getImage: function getImage() {
      var _this15 = this;
      this.dialogImageForSolutions = true;
      axios.post('/api/hint/get_image', {
        hint_id: this.hintActive
      }, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      }).then(function (res) {
        _this15.imagesForDisplay = res.data.map(function (el) {
          return el.image_path;
        });
        console.log(_this15.imagesForDisplay);
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    deleteImage: function deleteImage(image, id) {
      this.imagesForDisplay.splice(id, 1);
      axios.post('/api/hint/delete_image', {
        image_path: image
      }, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      }).then(function (res) {
        return console.log(res);
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    showFormAddImage: function showFormAddImage() {
      this.dialogImageForAdd = true;
    },
    getHintId: function getHintId(id) {
      this.hintActive = id;
    },
    getListCallData: function getListCallData() {
      var _this16 = this;
      axios.post('/api/city/get_call_managers', {}, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      }).then(function (res) {
        console.log(res.data);
        res.data.forEach(function (element) {
          BX24.callBatch({
            get_department: {
              method: 'department.get',
              params: {
                ID: element.structure_id
              }
            }
          }, function (result) {
            var department = result.get_department.answer.result[0].NAME;
            _this16.callData.push({
              department: department,
              manager: element.trainer_id
            });
          });
        });
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    getListBitrixData: function getListBitrixData() {
      var _this17 = this;
      axios.post('/api/city/get_bitrix_managers', {}, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      }).then(function (res) {
        res.data.forEach(function (element) {
          BX24.callBatch({
            get_department: {
              method: 'department.get',
              params: {
                ID: element.structure_id
              }
            }
          }, function (result) {
            var department = result.get_department.answer.result[0].NAME;
            _this17.bitrixData.push({
              department: department,
              manager: element.manager_id
            });
          });
        });
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    getParentId: function getParentId(value) {
      var _this18 = this;
      axios.post('/api/reason/parent_id', {
        id: value
      }, {
        headers: {
          Authorization: 'Bearer ' + this.currentToken
        }
      }).then(function (res) {
        return _this18.parentId = res.data;
      })["catch"](function (err) {
        return console.log(err);
      });
    }
  },
  mounted: function mounted() {
    this.getReason();
    this.getHint();
    this.getGroups();
    this.getInformation();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/bitrix/TicketAdd.vue?vue&type=template&id=5b38fae3&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/bitrix/TicketAdd.vue?vue&type=template&id=5b38fae3&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("v-row", {
    staticStyle: {
      height: "calc(100vh - 64px)"
    },
    attrs: {
      justify: "space-between",
      "max-height": "100%"
    }
  }, [_c("v-col", {
    attrs: {
      cols: "5"
    }
  }, [_c("v-sheet", {
    staticClass: "pa-4",
    attrs: {
      color: "#6A76AB",
      dark: ""
    }
  }, [_c("v-text-field", {
    attrs: {
      label: "Поиск по названию проблемы",
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
  })], 1), _vm._v(" "), _c("v-treeview", {
    staticStyle: {
      "overflow-y": "auto",
      "max-height": "calc(100vh - 168px)"
    },
    attrs: {
      active: _vm.active,
      items: _vm.items,
      search: _vm.search,
      open: _vm.open,
      activatable: "",
      color: "warning",
      transition: ""
    },
    on: {
      "update:active": [function ($event) {
        _vm.active = $event;
      }, _vm.getParentId],
      "update:open": function updateOpen($event) {
        _vm.open = $event;
      }
    },
    scopedSlots: _vm._u([{
      key: "prepend",
      fn: function fn(_ref) {
        var item = _ref.item;
        return [!item.children && _vm.reasonsActive && _vm.reasonsActive.id === item.id ? _c("v-icon", {
          attrs: {
            color: "primary"
          }
        }, [_vm._v("\n                        mdi-radiobox-marked\n                    ")]) : !item.children ? _c("v-icon", {
          attrs: {
            color: "black"
          }
        }, [_vm._v("\n                        mdi-radiobox-blank\n                    ")]) : _c("v-icon", {
          attrs: {
            color: "black"
          }
        }, [_vm._v("\n                        mdi-google-circles-extended\n                    ")])];
      }
    }, {
      key: "append",
      fn: function fn(_ref2) {
        var item = _ref2.item;
        return [_vm.isAdmin || _vm.isManager ? _c("v-icon", {
          attrs: {
            small: ""
          },
          on: {
            click: function click($event) {
              return _vm.showFormAddReason(item, true);
            }
          }
        }, [_vm._v("\n                        mdi-pencil\n                    ")]) : _vm._e(), _vm._v(" "), _vm.isAdmin || _vm.isManager ? _c("v-icon", {
          on: {
            click: function click($event) {
              return _vm.showFormAddReason(item);
            }
          }
        }, [_vm._v("\n                        mdi-plus\n                    ")]) : _vm._e(), _vm._v(" "), _vm.isAdmin || _vm.isManager ? _c("v-icon", {
          attrs: {
            small: ""
          },
          on: {
            click: function click($event) {
              return _vm.showFormAddTemplate(item);
            }
          }
        }, [_vm._v("\n                        mdi-pencil-plus-outline\n                    ")]) : _vm._e()];
      }
    }])
  })], 1), _vm._v(" "), _c("v-col", {
    staticStyle: {
      padding: "12px 12px 12px 0",
      "overflow-y": "auto",
      "max-height": "calc(100vh - 60px)"
    }
  }, [!_vm.reasonsActive || _vm.reasonsActive.children ? _c("v-row", [_c("v-col", [_c("v-card", [_c("v-card-text", [_vm._v("\n                            Выбери проблему\n                        ")])], 1)], 1)], 1) : _c("v-row", [_c("v-col", {
    attrs: {
      "y-axis": "end"
    }
  }, [!_vm.skippedHint && _vm.hints.length ? _c("v-expansion-panels", {
    staticClass: "mb-4",
    model: {
      value: _vm.openedHint,
      callback: function callback($$v) {
        _vm.openedHint = $$v;
      },
      expression: "openedHint"
    }
  }, _vm._l(_vm.hints, function (item) {
    return _c("v-expansion-panel", {
      key: item.id,
      attrs: {
        "single-expand": ""
      }
    }, [_c("v-expansion-panel-header", {
      domProps: {
        innerHTML: _vm._s(item["short"])
      },
      on: {
        click: function click($event) {
          return _vm.getHintId(item.id);
        }
      }
    }), _vm._v(" "), _c("v-expansion-panel-content", [_c("v-row", {
      staticStyle: {
        "white-space": "pre"
      }
    }, [item.full ? _c("v-col", {
      attrs: {
        cols: "12"
      }
    }, [_c("bbob-bbcode", {
      staticStyle: {
        "white-space": "pre-wrap"
      },
      attrs: {
        container: "div"
      }
    }, [_vm._v(_vm._s(item.full))])], 1) : _vm._e(), _vm._v(" "), item.iframe ? _c("v-col", {
      attrs: {
        cols: "12"
      }
    }, [_c("iframe", {
      staticStyle: {
        "max-width": "100%"
      },
      attrs: {
        width: "560",
        height: "315",
        frameborder: "0",
        src: item.iframe,
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
        allowfullscreen: ""
      }
    })]) : _vm._e(), _vm._v(" "), _c("v-col", {
      attrs: {
        cols: "6"
      }
    }, [_vm.isManager || _vm.isAdmin ? _c("v-btn", {
      attrs: {
        text: "",
        color: "primary",
        small: ""
      },
      on: {
        click: _vm.showFormAddImage
      }
    }, [_vm._v("\n                                        Добавить изображение\n                                        ")]) : _vm._e()], 1), _vm._v(" "), _c("v-col", {
      attrs: {
        cols: "6"
      }
    }, [_c("v-btn", {
      attrs: {
        text: "",
        color: "primary",
        small: ""
      },
      on: {
        click: _vm.getImage
      }
    }, [_vm._v("\n                                            Просмотреть изображения\n                                        ")])], 1)], 1)], 1)], 1);
  }), 1) : _vm._e(), _vm._v(" "), !_vm.skippedHint && _vm.hints.length ? _c("v-btn", {
    staticClass: "float-right",
    attrs: {
      color: "primary"
    },
    on: {
      click: function click($event) {
        _vm.skippedHint = true;
      }
    }
  }, [_vm._v("Рекомендации не помогли")]) : !_vm.skippedHint && _vm.hints.length ? _c("v-btn", {
    staticClass: "float-right",
    attrs: {
      color: "success"
    }
  }, [_vm._v("Ознакомьтесь с подсказкой")]) : _vm._e(), _vm._v(" "), _vm.skippedHint || !_vm.hints.length ? _c("v-card", [_c("v-card-text", [_vm.ticket_information_show || _vm.ticket_information_loading ? _c("v-textarea", {
    attrs: {
      loading: _vm.ticket_information_loading,
      readonly: "",
      "auto-grow": "",
      outlined: "",
      label: "Дополнительные сведения"
    },
    model: {
      value: _vm.ticket_information,
      callback: function callback($$v) {
        _vm.ticket_information = $$v;
      },
      expression: "ticket_information"
    }
  }) : _vm._e(), _vm._v(" "), _c("v-form", {
    ref: "formTicket",
    attrs: {
      "lazy-validation": ""
    },
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        return _vm.addTicket.apply(null, arguments);
      }
    },
    model: {
      value: _vm.validTicket,
      callback: function callback($$v) {
        _vm.validTicket = $$v;
      },
      expression: "validTicket"
    }
  }, [_vm.active == 109 ? _c("v-select", {
    attrs: {
      items: _vm.callData,
      "item-text": function itemText(item) {
        return item.department;
      },
      "item-value": function itemValue(item) {
        return item;
      },
      label: "Выберите город",
      active: _vm.active,
      "search-input": ""
    },
    model: {
      value: _vm.selectedData,
      callback: function callback($$v) {
        _vm.selectedData = $$v;
      },
      expression: "selectedData"
    }
  }) : _vm._e(), _vm._v(" "), _vm.active == 108 ? _c("v-select", {
    attrs: {
      items: _vm.bitrixData,
      "item-text": function itemText(item) {
        return item.department;
      },
      "item-value": function itemValue(item) {
        return item;
      },
      label: "Выберите город",
      active: _vm.active,
      "search-input": ""
    },
    model: {
      value: _vm.selectedData,
      callback: function callback($$v) {
        _vm.selectedData = $$v;
      },
      expression: "selectedData"
    }
  }) : _vm._e(), _vm._v(" "), _c("v-textarea", {
    attrs: {
      rules: _vm.requiredRules,
      "auto-grow": "",
      outlined: "",
      clearable: "",
      "clear-icon": "mdi-close-circle",
      label: "Подробно распишите суть проблемы"
    },
    model: {
      value: _vm.ticket_message,
      callback: function callback($$v) {
        _vm.ticket_message = $$v;
      },
      expression: "ticket_message"
    }
  }), _vm._v(" "), _c("v-text-field", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.parentId === 5,
      expression: "parentId === 5"
    }],
    attrs: {
      rules: _vm.parentId === 5 ? _vm.requiredRules : [],
      label: "Введите номер вашего AnyDesk",
      type: "number",
      min: "1"
    },
    model: {
      value: _vm.anyDeskNumber,
      callback: function callback($$v) {
        _vm.anyDeskNumber = $$v;
      },
      expression: "anyDeskNumber"
    }
  }), _vm._v(" "), _c("v-row", [_c("v-col", [_c("v-btn", {
    staticClass: "mr-4",
    attrs: {
      disabled: !_vm.valid,
      color: "success",
      loading: _vm.addingTicket,
      type: "submit"
    }
  }, [_vm._v("\n                                            Добавить\n                                        ")]), _vm._v(" "), _c("v-btn", {
    attrs: {
      color: "error"
    },
    on: {
      click: function click($event) {
        return _vm.$refs.formTicket.reset();
      }
    }
  }, [_vm._v("\n                                            Сброс\n                                        ")]), _vm._v(" "), _vm.isManager || _vm.isAdmin ? _c("v-btn", {
    staticClass: "float-right",
    attrs: {
      color: "primary"
    },
    on: {
      click: _vm.showFormAddHint
    }
  }, [_vm._v("\n                                            Новая подсказка\n                                        ")]) : _vm._e()], 1)], 1)], 1)], 1)], 1) : _vm._e()], 1)], 1)], 1), _vm._v(" "), _c("v-dialog", {
    attrs: {
      persistent: "",
      "max-width": "350px"
    },
    model: {
      value: _vm.newReasonDialog,
      callback: function callback($$v) {
        _vm.newReasonDialog = $$v;
      },
      expression: "newReasonDialog"
    }
  }, [_c("v-card", [_vm.editId === null ? _c("v-card-title", [_vm._v("Новая проблема")]) : _c("v-card-title", [_vm._v("Редактирование проблемы")]), _vm._v(" "), _c("v-divider"), _vm._v(" "), _c("v-form", {
    ref: "formAddReason",
    attrs: {
      "lazy-validation": ""
    },
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        return _vm.addReason.apply(null, arguments);
      }
    },
    model: {
      value: _vm.valid,
      callback: function callback($$v) {
        _vm.valid = $$v;
      },
      expression: "valid"
    }
  }, [_c("v-card-text", [_c("v-text-field", {
    attrs: {
      rules: _vm.requiredRules,
      label: "Название",
      "prepend-icon": "mdi-message-text",
      required: ""
    },
    model: {
      value: _vm.name,
      callback: function callback($$v) {
        _vm.name = $$v;
      },
      expression: "name"
    }
  }), _vm._v(" "), _c("v-select", {
    attrs: {
      rules: _vm.requiredRules,
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 30],
      label: "Вес",
      "prepend-icon": "mdi-weight-kilogram",
      "single-line": "",
      required: ""
    },
    model: {
      value: _vm.weight,
      callback: function callback($$v) {
        _vm.weight = $$v;
      },
      expression: "weight"
    }
  }), _vm._v(" "), _c("v-select", {
    attrs: {
      rules: _vm.requiredRules,
      items: _vm.groups,
      label: "Группа",
      "item-text": "name",
      "item-value": "id",
      "prepend-icon": "mdi-account-multiple",
      "single-line": "",
      required: ""
    },
    model: {
      value: _vm.group_id,
      callback: function callback($$v) {
        _vm.group_id = $$v;
      },
      expression: "group_id"
    }
  }), _vm._v(" "), _c("v-select", {
    attrs: {
      rules: _vm.requiredRules,
      items: [{
        value: 1,
        text: "Для всех"
      }, {
        value: 2,
        text: "Только РОП"
      }, {
        value: 3,
        text: "Для студента"
      }, {
        value: 4,
        text: "СБ"
      }],
      label: "Целевая аудитория",
      "prepend-icon": "mdi-account-group",
      "single-line": "",
      required: ""
    },
    model: {
      value: _vm.visibility,
      callback: function callback($$v) {
        _vm.visibility = $$v;
      },
      expression: "visibility"
    }
  }), _vm._v(" "), _c("v-select", {
    attrs: {
      items: _vm.information,
      label: "Дополнительная информация",
      "item-text": "name",
      "item-value": "id",
      "prepend-icon": "mdi-information-variant",
      "single-line": ""
    },
    model: {
      value: _vm.information_id,
      callback: function callback($$v) {
        _vm.information_id = $$v;
      },
      expression: "information_id"
    }
  })], 1), _vm._v(" "), _c("v-card-actions", [_c("v-spacer"), _vm._v(" "), _c("v-btn", {
    attrs: {
      color: "blue darken-1",
      text: ""
    },
    on: {
      click: function click($event) {
        _vm.newReasonDialog = false;
      }
    }
  }, [_vm._v("\n                            Отмена\n                        ")]), _vm._v(" "), _vm.editId === null ? _c("v-btn", {
    attrs: {
      disabled: !_vm.valid,
      loading: _vm.reasonAddLoading,
      color: "success",
      type: "submit"
    }
  }, [_vm._v("\n                            Добавить\n                        ")]) : _c("v-btn", {
    attrs: {
      disabled: !_vm.valid,
      loading: _vm.reasonAddLoading,
      color: "success",
      type: "submit"
    }
  }, [_vm._v("\n                            Сохранить\n                        ")])], 1)], 1)], 1)], 1), _vm._v(" "), _c("v-dialog", {
    attrs: {
      width: 550
    },
    model: {
      value: _vm.dialogCreateTemplate,
      callback: function callback($$v) {
        _vm.dialogCreateTemplate = $$v;
      },
      expression: "dialogCreateTemplate"
    }
  }, [_c("v-card", [_c("v-card-title", [_vm._v("Введите текст для создания шаблонного ответа")]), _vm._v(" "), _c("v-col", {
    attrs: {
      "md-4": ""
    }
  }, [_c("v-text-field", {
    attrs: {
      required: ""
    },
    model: {
      value: _vm.messageCreateTemplate,
      callback: function callback($$v) {
        _vm.messageCreateTemplate = $$v;
      },
      expression: "messageCreateTemplate"
    }
  })], 1), _vm._v(" "), _c("v-card-actions", [_c("v-btn", {
    on: {
      click: _vm.closeCreateTemplate
    }
  }, [_vm._v("Закрыть")]), _vm._v(" "), _c("v-btn", {
    attrs: {
      color: "success"
    },
    on: {
      click: _vm.addTemplate
    }
  }, [_vm._v("Создать")])], 1), _vm._v(" "), _c("v-card-title", [_vm._v("Шаблонные ответы в данной теме:")]), _vm._v(" "), _vm._l(_vm.templateResponses, function (template) {
    return _c("v-card", {
      key: template,
      staticClass: "pa-2 justify-content-between d-flex"
    }, [_vm._v("\n                    " + _vm._s(template.length > 25 ? template.slice(0, 25) + "..." : template) + "\n                    "), _c("v-icon", {
      staticClass: "ml-2",
      attrs: {
        color: "red"
      },
      on: {
        click: function click($event) {
          return _vm.deleteTemplate(template);
        }
      }
    }, [_vm._v("\n                        mdi-close\n                    ")])], 1);
  }), _vm._v(" "), _vm.templateResponses.length < 1 ? _c("v-card", {
    staticClass: "pa-2"
  }, [_vm._v("В данной теме шаблонные ответы отсутствуют")]) : _vm._e()], 2)], 1), _vm._v(" "), _c("v-dialog", {
    attrs: {
      "max-width": "600"
    },
    model: {
      value: _vm.dialogImageForSolutions,
      callback: function callback($$v) {
        _vm.dialogImageForSolutions = $$v;
      },
      expression: "dialogImageForSolutions"
    }
  }, [_c("v-card", [_c("v-card-title", [_vm._v(" Пошаговая инструкция: ")]), _vm._v(" "), _vm._l(_vm.imagesForDisplay, function (image, id) {
    return _c("v-col", {
      key: id,
      staticClass: "d-flex align-items-center",
      attrs: {
        cols: "12"
      }
    }, [_c("img", {
      staticClass: "pa-2",
      staticStyle: {
        width: "304px",
        "margin-left": "20%",
        height: "210px",
        cursor: "pointer"
      },
      attrs: {
        src: image
      },
      on: {
        click: function click($event) {
          _vm.dialogFullImage = true;
          _vm.currentImg = image;
        }
      }
    }), _vm._v(" "), _vm.isManager || _vm.isAdmin ? _c("v-icon", {
      attrs: {
        color: "red"
      },
      on: {
        click: function click($event) {
          return _vm.deleteImage(image, id);
        }
      }
    }, [_vm._v("\n                            mdi-close\n                        ")]) : _vm._e()], 1);
  }), _vm._v(" "), _c("v-card-actions", [_c("v-btn", {
    attrs: {
      text: ""
    },
    on: {
      click: function click($event) {
        _vm.dialogImageForSolutions = false;
      }
    }
  }, [_vm._v("Закрыть")])], 1)], 2)], 1), _vm._v(" "), _c("v-dialog", {
    attrs: {
      "max-width": "1000"
    },
    model: {
      value: _vm.dialogFullImage,
      callback: function callback($$v) {
        _vm.dialogFullImage = $$v;
      },
      expression: "dialogFullImage"
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
        _vm.dialogFullImage = false;
      }
    }
  }, [_vm._v("Закрыть")])], 1)], 1)], 1), _vm._v(" "), _c("v-dialog", {
    attrs: {
      "max-width": "600"
    },
    model: {
      value: _vm.dialogImageForAdd,
      callback: function callback($$v) {
        _vm.dialogImageForAdd = $$v;
      },
      expression: "dialogImageForAdd"
    }
  }, [_c("v-card", [_c("v-card-title", [_vm._v(" Прикрепите изображения ")]), _vm._v(" "), !_vm.isImageUploading ? _c("v-file-input", {
    ref: "fileInput",
    staticClass: "mb-9 pa-2",
    on: {
      change: _vm.addImage,
      paste: function paste($event) {
        $event.preventDefault();
        return _vm.addImage.apply(null, arguments);
      }
    },
    model: {
      value: _vm.image,
      callback: function callback($$v) {
        _vm.image = $$v;
      },
      expression: "image"
    }
  }) : _vm._e(), _vm._v(" "), _vm.isImageUploading ? _c("div", {
    staticClass: "mb-9"
  }, [_c("v-progress-circular", {
    attrs: {
      indeterminate: "",
      color: "primary"
    }
  }), _vm._v(" "), _c("p", [_vm._v("Загрузка изображения...")])], 1) : _vm._e(), _vm._v(" "), _c("v-col", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.imagesForAdd.length > 0,
      expression: "imagesForAdd.length > 0"
    }],
    attrs: {
      cols: "12"
    }
  }, [_c("v-card-title", [_vm._v("Прикрепленные изображения:")]), _vm._v(" "), _vm._l(_vm.imagesForAdd, function (image, index) {
    return _c("v-card", {
      key: index,
      staticClass: "pa-1 ma-1 d-inline-block"
    }, [_vm._v("\n                            " + _vm._s(image.name) + "\n                            "), _c("v-icon", {
      attrs: {
        small: "",
        color: "red"
      },
      on: {
        click: function click($event) {
          return _vm.imagesForAdd.splice(index, 1);
        }
      }
    }, [_vm._v("\n                                mdi-close\n                            ")])], 1);
  })], 2), _vm._v(" "), _c("v-card-actions", [_c("v-btn", {
    attrs: {
      text: ""
    },
    on: {
      click: function click($event) {
        _vm.dialogImageForAdd = false;
      }
    }
  }, [_vm._v("Отмена")]), _vm._v(" "), _c("v-btn", {
    attrs: {
      text: "",
      color: "primary"
    },
    on: {
      click: _vm.createImage
    }
  }, [_vm._v("Добавить")])], 1)], 1)], 1), _vm._v(" "), _c("v-dialog", {
    attrs: {
      persistent: ""
    },
    model: {
      value: _vm.openFormAddHint,
      callback: function callback($$v) {
        _vm.openFormAddHint = $$v;
      },
      expression: "openFormAddHint"
    }
  }, [_c("v-card", [_c("v-card-title", {
    staticClass: "text-h5"
  }, [_vm._v("\n                    Новая подсказка\n                ")]), _vm._v(" "), _c("v-form", {
    ref: "formAddHint",
    attrs: {
      "lazy-validation": ""
    },
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        return _vm.addHint.apply(null, arguments);
      }
    },
    model: {
      value: _vm.validFormAddHint,
      callback: function callback($$v) {
        _vm.validFormAddHint = $$v;
      },
      expression: "validFormAddHint"
    }
  }, [_c("v-row", {
    staticClass: "ma-0"
  }, [_c("v-col", {
    attrs: {
      cols: "12",
      sm: "6"
    }
  }, [_c("v-text-field", {
    attrs: {
      rules: _vm.requiredRules,
      outlined: "",
      label: "Короткое описание"
    },
    model: {
      value: _vm.shortHint,
      callback: function callback($$v) {
        _vm.shortHint = $$v;
      },
      expression: "shortHint"
    }
  })], 1), _vm._v(" "), _c("v-col", {
    attrs: {
      cols: "12",
      sm: "6"
    }
  }, [_c("v-text-field", {
    attrs: {
      outlined: "",
      label: "Ссылка на видео (https://www.youtube.com/embed/MmdKeypSxE8)"
    },
    model: {
      value: _vm.iframeHint,
      callback: function callback($$v) {
        _vm.iframeHint = $$v;
      },
      expression: "iframeHint"
    }
  })], 1), _vm._v(" "), _c("v-col", {
    attrs: {
      cols: "12"
    }
  }, [_c("v-textarea", {
    attrs: {
      rules: _vm.requiredRules,
      "auto-grow": "",
      outlined: "",
      clearable: "",
      "clear-icon": "mdi-close-circle",
      label: "Подробное описание действий"
    },
    model: {
      value: _vm.fullHint,
      callback: function callback($$v) {
        _vm.fullHint = $$v;
      },
      expression: "fullHint"
    }
  })], 1)], 1), _vm._v(" "), _c("v-card-actions", [_c("v-spacer"), _vm._v(" "), _c("v-btn", {
    attrs: {
      text: ""
    },
    on: {
      click: function click($event) {
        _vm.openFormAddHint = false;
      }
    }
  }, [_vm._v("\n                            Отмена\n                        ")]), _vm._v(" "), _c("v-btn", {
    attrs: {
      color: "success",
      type: "submit",
      disabled: !_vm.validFormAddHint || _vm.addingHint,
      loading: _vm.addingHint
    },
    model: {
      value: _vm.imagesForAdd,
      callback: function callback($$v) {
        _vm.imagesForAdd = $$v;
      },
      expression: "imagesForAdd"
    }
  }, [_vm._v("\n                            Добавить\n                        ")])], 1)], 1)], 1)], 1)], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/pages/bitrix/TicketAdd.vue":
/*!*************************************************!*\
  !*** ./resources/js/pages/bitrix/TicketAdd.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TicketAdd_vue_vue_type_template_id_5b38fae3_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TicketAdd.vue?vue&type=template&id=5b38fae3&scoped=true& */ "./resources/js/pages/bitrix/TicketAdd.vue?vue&type=template&id=5b38fae3&scoped=true&");
/* harmony import */ var _TicketAdd_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TicketAdd.vue?vue&type=script&lang=js& */ "./resources/js/pages/bitrix/TicketAdd.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TicketAdd_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TicketAdd_vue_vue_type_template_id_5b38fae3_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _TicketAdd_vue_vue_type_template_id_5b38fae3_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "5b38fae3",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/bitrix/TicketAdd.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/bitrix/TicketAdd.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/pages/bitrix/TicketAdd.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TicketAdd_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TicketAdd.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/bitrix/TicketAdd.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TicketAdd_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/bitrix/TicketAdd.vue?vue&type=template&id=5b38fae3&scoped=true&":
/*!********************************************************************************************!*\
  !*** ./resources/js/pages/bitrix/TicketAdd.vue?vue&type=template&id=5b38fae3&scoped=true& ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_TicketAdd_vue_vue_type_template_id_5b38fae3_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_TicketAdd_vue_vue_type_template_id_5b38fae3_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_TicketAdd_vue_vue_type_template_id_5b38fae3_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TicketAdd.vue?vue&type=template&id=5b38fae3&scoped=true& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/bitrix/TicketAdd.vue?vue&type=template&id=5b38fae3&scoped=true&");


/***/ })

}]);