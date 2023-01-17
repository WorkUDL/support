"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_Register_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Register.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Register.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************/
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      form: {
        email: "",
        password: "",
        password_confirmation: "",
        subscribe: true
      },
      errors: []
    };
  },
  methods: {
    register: function register() {
      var _this = this;

      axios.post('/register', this.form).then(function (response) {
        console.log(response);
        localStorage.setItem("auth", "true");

        _this.$router.push({
          name: "dashboard"
        });
      })["catch"](function (error) {
        if (error.response.status === 422) {
          _this.errors = error.response.data.errors;
        }
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/pages/Register.vue":
/*!*****************************************!*\
  !*** ./resources/js/pages/Register.vue ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Register_vue_vue_type_template_id_364a2fac___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Register.vue?vue&type=template&id=364a2fac& */ "./resources/js/pages/Register.vue?vue&type=template&id=364a2fac&");
/* harmony import */ var _Register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Register.vue?vue&type=script&lang=js& */ "./resources/js/pages/Register.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Register_vue_vue_type_template_id_364a2fac___WEBPACK_IMPORTED_MODULE_0__.render,
  _Register_vue_vue_type_template_id_364a2fac___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Register.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Register.vue?vue&type=script&lang=js&":
/*!******************************************************************!*\
  !*** ./resources/js/pages/Register.vue?vue&type=script&lang=js& ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Register.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Register.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Register.vue?vue&type=template&id=364a2fac&":
/*!************************************************************************!*\
  !*** ./resources/js/pages/Register.vue?vue&type=template&id=364a2fac& ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_template_id_364a2fac___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_template_id_364a2fac___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_template_id_364a2fac___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Register.vue?vue&type=template&id=364a2fac& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Register.vue?vue&type=template&id=364a2fac&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Register.vue?vue&type=template&id=364a2fac&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/Register.vue?vue&type=template&id=364a2fac& ***!
  \***************************************************************************************************************************************************************************************************************/
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
  return _c("div", [
    _c("main", { staticClass: "nw" }, [
      _c("section", { staticClass: "iv nx tillustration-section-n" }, [
        _c("div", { staticClass: "scontainero" }, [
          _c("div", { staticClass: "signin-inner rd" }, [
            _vm._m(0),
            _vm._v(" "),
            _c("div", { staticClass: "tiles-wrap" }, [
              _c("div", { staticClass: "ng" }, [
                _c("div", { staticClass: "ny" }, [
                  _c(
                    "form",
                    {
                      staticClass: "form-up",
                      attrs: { method: "post" },
                      on: {
                        submit: function($event) {
                          $event.preventDefault()
                          return _vm.register.apply(null, arguments)
                        }
                      }
                    },
                    [
                      _c("fieldset", [
                        _c("div", { staticClass: "oy form-up-mail" }, [
                          _c(
                            "label",
                            { staticClass: "x st", attrs: { for: "email" } },
                            [_vm._v("Email")]
                          ),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.form.email,
                                expression: "form.email"
                              }
                            ],
                            staticClass: "j",
                            attrs: {
                              id: "email",
                              type: "email",
                              placeholder: "Email",
                              required: ""
                            },
                            domProps: { value: _vm.form.email },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(_vm.form, "email", $event.target.value)
                              }
                            }
                          }),
                          _vm._v(" "),
                          _vm.errors.email
                            ? _c("div", { staticClass: "tl sv" }, [
                                _vm._v(
                                  "\n                                                " +
                                    _vm._s(_vm.errors.email[0]) +
                                    "\n                                            "
                                )
                              ])
                            : _vm._e()
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "oy form-up-pass-1" }, [
                          _c(
                            "label",
                            { staticClass: "x st", attrs: { for: "password" } },
                            [_vm._v("Пароль")]
                          ),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.form.password,
                                expression: "form.password"
                              }
                            ],
                            staticClass: "j",
                            attrs: {
                              id: "password",
                              type: "password",
                              placeholder: "Пароль",
                              required: ""
                            },
                            domProps: { value: _vm.form.password },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.form,
                                  "password",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _vm.errors.password
                            ? _c("div", { staticClass: "tl sv" }, [
                                _vm._v(
                                  "\n                                                " +
                                    _vm._s(_vm.errors.password[0]) +
                                    "\n                                            "
                                )
                              ])
                            : _vm._e()
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "oy form-up-pass-2" }, [
                          _c(
                            "label",
                            {
                              staticClass: "x st",
                              attrs: { for: "password_confirmation" }
                            },
                            [_vm._v("Пароль ещё раз")]
                          ),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.form.password_confirmation,
                                expression: "form.password_confirmation"
                              }
                            ],
                            staticClass: "j",
                            attrs: {
                              id: "password_confirmation",
                              type: "password",
                              placeholder: "Пароль ещё раз",
                              required: ""
                            },
                            domProps: { value: _vm.form.password_confirmation },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.form,
                                  "password_confirmation",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _vm.errors.password_confirmation
                            ? _c("div", { staticClass: "tl sv" }, [
                                _vm._v(
                                  "\n                                                " +
                                    _vm._s(
                                      _vm.errors.password_confirmation[0]
                                    ) +
                                    "\n                                            "
                                )
                              ])
                            : _vm._e()
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "im uo" }, [
                          _c("label", { staticClass: "z" }, [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.form.subscribe,
                                  expression: "form.subscribe"
                                }
                              ],
                              attrs: { type: "checkbox", value: "sub" },
                              domProps: {
                                checked: Array.isArray(_vm.form.subscribe)
                                  ? _vm._i(_vm.form.subscribe, "sub") > -1
                                  : _vm.form.subscribe
                              },
                              on: {
                                change: function($event) {
                                  var $$a = _vm.form.subscribe,
                                    $$el = $event.target,
                                    $$c = $$el.checked ? true : false
                                  if (Array.isArray($$a)) {
                                    var $$v = "sub",
                                      $$i = _vm._i($$a, $$v)
                                    if ($$el.checked) {
                                      $$i < 0 &&
                                        _vm.$set(
                                          _vm.form,
                                          "subscribe",
                                          $$a.concat([$$v])
                                        )
                                    } else {
                                      $$i > -1 &&
                                        _vm.$set(
                                          _vm.form,
                                          "subscribe",
                                          $$a
                                            .slice(0, $$i)
                                            .concat($$a.slice($$i + 1))
                                        )
                                    }
                                  } else {
                                    _vm.$set(_vm.form, "subscribe", $$c)
                                  }
                                }
                              }
                            }),
                            _vm._v(
                              "\n                                                Хочу получать полезные материалы о лидогенерации и обновлениях\n                                            "
                            )
                          ])
                        ]),
                        _vm._v(" "),
                        _vm._m(1)
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  _vm._m(2),
                  _vm._v(" "),
                  _c("div", { staticClass: "signin-bottom ij" }, [
                    _c(
                      "div",
                      { staticClass: "ah c sj sh" },
                      [
                        _vm._v("Уже есть аккаунт? "),
                        _c(
                          "router-link",
                          {
                            staticClass: "p",
                            attrs: { to: { name: "login" } }
                          },
                          [_vm._v("Войдите")]
                        )
                      ],
                      1
                    )
                  ])
                ])
              ])
            ])
          ])
        ])
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "rv sj" }, [
      _c("h1", { staticClass: "oe" }, [_vm._v("Создайте аккаунт")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "oz uo" }, [
      _c("button", { staticClass: "tbuttonn fbuttonl pbuttond btn btn-up" }, [
        _vm._v("Создать аккаунт")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "signin-bottom ij" }, [
      _c("div", { staticClass: "oz uo" }, [
        _c(
          "button",
          {
            staticClass: "tbuttonn fbuttonl pbuttond btn btn-vk",
            attrs: {
              "data-a":
                "http://oauth.vk.com/authorize?client_id=7552087&redirect_uri=https://lp9.ru/auth/vk/&response_type=code&v=5.101"
            }
          },
          [_vm._v("Войти через VK")]
        )
      ])
    ])
  }
]
render._withStripped = true



/***/ })

}]);