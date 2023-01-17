"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_project_Add_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/project/Add.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/project/Add.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************/
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Add",
  data: function data() {
    return {
      valid: true,
      loading: false,
      name: '',
      nameRules: [function (v) {
        return !!v || 'Обязательное поле';
      }],
      nodeForm: {
        target: null
      },
      connectionForm: {
        target: null,
        operation: null
      },
      nodeDialogVisible: false,
      connectionDialogVisible: false,
      nodes: [// Basic fields
      {
        id: 1,
        x: 140,
        y: 270,
        name: 'Start',
        type: 'start'
      }, // You can add any generic fields to node, for example: description
      // It will be passed to @save, @editnode
      {
        id: 2,
        x: 540,
        y: 270,
        name: 'End',
        type: 'end',
        description: 'Im here'
      }, {
        id: 3,
        x: 440,
        y: 170,
        name: 'Оператор',
        type: 'operator',
        description: 'Im here'
      }, {
        id: 4,
        x: 340,
        y: 370,
        width: 300,
        name: 'Клиент',
        type: 'client',
        description: 'Im here',
        approvers: [{
          name: "Emma"
        }]
      }],
      connections: [{
        source: {
          id: 1,
          position: 'right'
        },
        destination: {
          id: 2,
          position: 'left'
        },
        id: 1,
        type: 'pass'
      }]
    };
  },
  methods: {
    add: function add() {
      var _this = this;

      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$store.dispatch('addProject', {
          name: this.name
        }).then(function () {
          _this.$refs.form.reset();
        })["finally"](function () {
          _this.loading = false;
        });
      }
    },
    handleChartSave: function handleChartSave(nodes, connections) {
      console.log('Save');
      console.log({
        nodes: nodes,
        connections: connections
      }); // axios.post(url, {nodes, connections}).then(resp => {
      //   this.nodes = resp.data.nodes;
      //   this.connections = resp.data.connections;
      //   // Flowchart will refresh after this.nodes and this.connections changed
      // });
    },
    handleEditNode: function handleEditNode(node) {
      console.log('handleEditNode');
      this.nodeForm.target = node;
      this.nodeDialogVisible = true;
    },
    handleEditConnection: function handleEditConnection(connection) {
      console.log('handleEditConnection');
      this.connectionForm.target = connection;
      this.connectionDialogVisible = true;
    },
    connect: function connect(e) {
      console.log('connect');
      console.log(e);
    },
    disconnect: function disconnect(e) {
      console.log('disconnect');
      console.log(e);
    },
    handleDblClick: function handleDblClick(position) {
      console.log('DblClick');
      this.$refs.chart.add({
        id: +new Date(),
        x: position.x,
        y: position.y,
        name: 'New',
        type: 'operation',
        approvers: []
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/pages/project/Add.vue":
/*!********************************************!*\
  !*** ./resources/js/pages/project/Add.vue ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Add_vue_vue_type_template_id_2eef0832_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Add.vue?vue&type=template&id=2eef0832&scoped=true& */ "./resources/js/pages/project/Add.vue?vue&type=template&id=2eef0832&scoped=true&");
/* harmony import */ var _Add_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Add.vue?vue&type=script&lang=js& */ "./resources/js/pages/project/Add.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Add_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Add_vue_vue_type_template_id_2eef0832_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Add_vue_vue_type_template_id_2eef0832_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "2eef0832",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/project/Add.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/project/Add.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./resources/js/pages/project/Add.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Add_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Add.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/project/Add.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Add_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/project/Add.vue?vue&type=template&id=2eef0832&scoped=true&":
/*!***************************************************************************************!*\
  !*** ./resources/js/pages/project/Add.vue?vue&type=template&id=2eef0832&scoped=true& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Add_vue_vue_type_template_id_2eef0832_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Add_vue_vue_type_template_id_2eef0832_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Add_vue_vue_type_template_id_2eef0832_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Add.vue?vue&type=template&id=2eef0832&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/project/Add.vue?vue&type=template&id=2eef0832&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/project/Add.vue?vue&type=template&id=2eef0832&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/project/Add.vue?vue&type=template&id=2eef0832&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************/
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
    "v-container",
    { staticClass: "py-8 px-6", attrs: { fluid: "" } },
    [
      _c(
        "v-form",
        {
          ref: "form",
          attrs: { "lazy-validation": "" },
          on: {
            submit: function($event) {
              $event.preventDefault()
              return _vm.add.apply(null, arguments)
            }
          },
          model: {
            value: _vm.valid,
            callback: function($$v) {
              _vm.valid = $$v
            },
            expression: "valid"
          }
        },
        [
          _c("v-text-field", {
            attrs: { rules: _vm.nameRules, label: "Название", required: "" },
            model: {
              value: _vm.name,
              callback: function($$v) {
                _vm.name = $$v
              },
              expression: "name"
            }
          }),
          _vm._v(" "),
          _c(
            "v-btn",
            {
              staticClass: "mr-4",
              attrs: {
                disabled: !_vm.valid || _vm.loading,
                loading: _vm.loading,
                color: "success",
                type: "submit"
              }
            },
            [_vm._v("\n            Добавить\n        ")]
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);