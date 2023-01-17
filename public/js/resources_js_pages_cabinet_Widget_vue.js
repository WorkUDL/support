"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_cabinet_Widget_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/cabinet/Widget.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/cabinet/Widget.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Widget",
  data: function data() {
    return {
      viewer: {
        show: false,
        path: null,
        width: null,
        height: null
      },
      editWidget: {},
      widgets: {},
      showAddWidgetForm: false,
      showEditWidgetForm: false,
      title: '',
      widgetId: 0,
      working: false
    };
  },
  methods: {
    getWidgets: function getWidgets() {
      var _this = this;

      axios.post('/api/widget/list').then(function (response) {
        _this.widgets = response.data;
      })["catch"](function (error) {
        console.log(error);
      });
    },
    setWidgets: function setWidgets(id, active) {
      axios.post('/api/widget/update', {
        id: id,
        active: active
      })["catch"](function (error) {
        console.log(error);
      });
    },
    addWidgets: function addWidgets() {
      var _this2 = this;

      this.working = true;
      axios.post('/api/widget/add', {
        title: this.title
      }).then(function () {
        _this2.title = '';
        _this2.showAddWidgetForm = false;

        _this2.getWidgets();
      })["catch"](function (error) {
        var errors = Object.values(error.response.data.errors);
        errors.flat().forEach(function (val) {
          _this2.$notice.error({
            title: 'Ошибка',
            description: val,
            duration: 5
          });
        });
      })["finally"](function () {
        _this2.working = false;
      });
    },
    editWidgetForm: function editWidgetForm(id) {
      this.widgetId = id;
      this.showEditWidgetForm = true;
    }
  },
  mounted: function mounted() {
    this.getWidgets();
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/cabinet/Widget.vue?vue&type=style&index=0&lang=scss&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/cabinet/Widget.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".add_widget_form_bg {\n  display: flex;\n}\n.add_widget_form {\n  position: relative;\n  margin: auto;\n  top: 0;\n}\n.add_widget_form .vm-titlebar {\n  border-bottom: 0;\n  position: absolute;\n  right: 0;\n}\n.add_widget_form .vm-content {\n  padding: 64px 32px;\n  background: #2B2F40;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/cabinet/Widget.vue?vue&type=style&index=0&lang=scss&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/cabinet/Widget.vue?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Widget_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Widget.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/cabinet/Widget.vue?vue&type=style&index=0&lang=scss&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Widget_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Widget_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/pages/cabinet/Widget.vue":
/*!***********************************************!*\
  !*** ./resources/js/pages/cabinet/Widget.vue ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Widget_vue_vue_type_template_id_1deb5bb8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Widget.vue?vue&type=template&id=1deb5bb8& */ "./resources/js/pages/cabinet/Widget.vue?vue&type=template&id=1deb5bb8&");
/* harmony import */ var _Widget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Widget.vue?vue&type=script&lang=js& */ "./resources/js/pages/cabinet/Widget.vue?vue&type=script&lang=js&");
/* harmony import */ var _Widget_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Widget.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/pages/cabinet/Widget.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Widget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Widget_vue_vue_type_template_id_1deb5bb8___WEBPACK_IMPORTED_MODULE_0__.render,
  _Widget_vue_vue_type_template_id_1deb5bb8___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/cabinet/Widget.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/cabinet/Widget.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/pages/cabinet/Widget.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Widget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Widget.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/cabinet/Widget.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Widget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/cabinet/Widget.vue?vue&type=style&index=0&lang=scss&":
/*!*********************************************************************************!*\
  !*** ./resources/js/pages/cabinet/Widget.vue?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Widget_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Widget.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/cabinet/Widget.vue?vue&type=style&index=0&lang=scss&");


/***/ }),

/***/ "./resources/js/pages/cabinet/Widget.vue?vue&type=template&id=1deb5bb8&":
/*!******************************************************************************!*\
  !*** ./resources/js/pages/cabinet/Widget.vue?vue&type=template&id=1deb5bb8& ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Widget_vue_vue_type_template_id_1deb5bb8___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Widget_vue_vue_type_template_id_1deb5bb8___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Widget_vue_vue_type_template_id_1deb5bb8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Widget.vue?vue&type=template&id=1deb5bb8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/cabinet/Widget.vue?vue&type=template&id=1deb5bb8&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/cabinet/Widget.vue?vue&type=template&id=1deb5bb8&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/cabinet/Widget.vue?vue&type=template&id=1deb5bb8& ***!
  \*********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _vm._m(0),
      _vm._v(" "),
      _c("section", { staticClass: "io nx fe" }, [
        _c(
          "div",
          { staticClass: "tcontainern tcontainern-min" },
          _vm._l(_vm.widgets, function(widget) {
            return _c("div", { staticClass: "box" }, [
              _c("div", { staticClass: "box-switch box-widget-off" }, [
                _c("label", { staticClass: "k" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: widget.active,
                        expression: "widget.active"
                      }
                    ],
                    attrs: { type: "checkbox" },
                    domProps: {
                      checked: Array.isArray(widget.active)
                        ? _vm._i(widget.active, null) > -1
                        : widget.active
                    },
                    on: {
                      change: [
                        function($event) {
                          var $$a = widget.active,
                            $$el = $event.target,
                            $$c = $$el.checked ? true : false
                          if (Array.isArray($$a)) {
                            var $$v = null,
                              $$i = _vm._i($$a, $$v)
                            if ($$el.checked) {
                              $$i < 0 &&
                                _vm.$set(widget, "active", $$a.concat([$$v]))
                            } else {
                              $$i > -1 &&
                                _vm.$set(
                                  widget,
                                  "active",
                                  $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                                )
                            }
                          } else {
                            _vm.$set(widget, "active", $$c)
                          }
                        },
                        function($event) {
                          return _vm.setWidgets(widget.id, widget.active)
                        }
                      ]
                    }
                  }),
                  _vm._v(" "),
                  _c("span", { staticClass: "ta" })
                ])
              ]),
              _vm._v(" "),
              _c("h6", [_vm._v(_vm._s(widget.title))]),
              _vm._v(" "),
              _c("div", { staticClass: "box-100" }),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "box-preview-text" },
                [
                  _c(
                    "a",
                    {
                      staticClass: "box-preview-text-l",
                      attrs: { href: "/page/" + widget.short, target: "_blank" }
                    },
                    [
                      _c("div", {
                        staticClass:
                          "box-preview-text-l-ic box-preview-text-l-ic-3"
                      }),
                      _vm._v(" "),
                      _c("span", [_vm._v("открыть")])
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "router-link",
                    {
                      staticClass: "box-preview-text-l",
                      attrs: {
                        to: {
                          name: "cabinet-lead-detail",
                          params: { short: widget.short }
                        }
                      }
                    },
                    [
                      _c("div", { staticClass: "box-preview-text-l-ic" }),
                      _vm._v(" "),
                      _c("span", [_vm._v("заявки")])
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "btn-set-open box-preview-text-l" },
                    [
                      _c("div", {
                        staticClass:
                          "box-preview-text-l-ic box-preview-text-l-ic-2"
                      }),
                      _vm._v(" "),
                      _c(
                        "span",
                        {
                          on: {
                            click: function($event) {
                              return _vm.editWidgetForm(widget.id)
                            }
                          }
                        },
                        [_vm._v("настройки")]
                      )
                    ]
                  )
                ],
                1
              )
            ])
          }),
          0
        )
      ]),
      _vm._v(" "),
      _c("section", { staticClass: "rb nx sj" }, [
        _c("div", { staticClass: "tcontainern" }, [
          _c(
            "div",
            {
              staticClass: "tbuttonn fbuttonl modal-trigger",
              staticStyle: { "margin-top": "40px" },
              on: {
                click: function($event) {
                  _vm.showAddWidgetForm = true
                }
              }
            },
            [_vm._v("новый виджет")]
          )
        ])
      ]),
      _vm._v(" "),
      _c(
        "VueModal",
        {
          attrs: {
            modalClass: "add_widget_form",
            wrapperClass: "add_widget_form_bg"
          },
          model: {
            value: _vm.showAddWidgetForm,
            callback: function($$v) {
              _vm.showAddWidgetForm = $$v
            },
            expression: "showAddWidgetForm"
          }
        },
        [
          _c("div", { staticClass: "sj" }, [
            _c("h3", { staticClass: "ot oy" }, [_vm._v("Создать виджет")]),
            _vm._v(" "),
            _c("p", { staticClass: "l" }, [
              _vm._v("Укажите техническое название виджета,"),
              _c("br"),
              _vm._v("которое видно только вам")
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "tc" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.title,
                  expression: "title"
                }
              ],
              staticClass: "j input-new-widget",
              attrs: {
                type: "text",
                placeholder: "Новый виджет",
                autofocus: ""
              },
              domProps: { value: _vm.title },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.title = $event.target.value
                }
              }
            }),
            _vm._v(" "),
            !_vm.working
              ? _c(
                  "button",
                  {
                    staticClass: "tbuttonn fbuttonl btn btn-widget-new",
                    on: { click: _vm.addWidgets }
                  },
                  [_vm._v("\n                Создать")]
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.working
              ? _c(
                  "button",
                  { staticClass: "tbuttonn fbuttonl btn btn-widget-new" },
                  [
                    _c("div", { staticClass: "lds-ellipsis" }, [
                      _c("div"),
                      _vm._v(" "),
                      _c("div"),
                      _vm._v(" "),
                      _c("div"),
                      _vm._v(" "),
                      _c("div")
                    ])
                  ]
                )
              : _vm._e()
          ])
        ]
      ),
      _vm._v(" "),
      _c(
        "VueModal",
        {
          attrs: {
            modalClass: "add_widget_form",
            wrapperClass: "add_widget_form_bg"
          },
          model: {
            value: _vm.showEditWidgetForm,
            callback: function($$v) {
              _vm.showEditWidgetForm = $$v
            },
            expression: "showEditWidgetForm"
          }
        },
        [
          _c("widget-settings", {
            attrs: { "widget-id": _vm.widgetId },
            on: {
              close: function($event) {
                _vm.showEditWidgetForm = false
              }
            }
          })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("section", { staticClass: "rb nx sj tillustration-section-n" }, [
      _c("div", { staticClass: "rcontaineri" }, [
        _c("div", { staticClass: "rm rd uc" }, [
          _c("div", { staticClass: "rg" }, [
            _c("div", { staticClass: "scontainero" }, [
              _c("h2", { staticClass: "oe" }, [_vm._v("Мои виджеты")])
            ])
          ])
        ])
      ])
    ])
  }
]
render._withStripped = true



/***/ })

}]);