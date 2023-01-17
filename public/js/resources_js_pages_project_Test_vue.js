"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_project_Test_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/project/Test.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/project/Test.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************/
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
  props: {
    id: [Number, String]
  },
  data: function data() {
    var _this = this;

    return {
      requiredRules: [function (v) {
        return v !== null || 'Обязательное поле';
      }],
      validAddKeyword: false,
      newKeywordText: null,
      dialogAddKeyword: false,
      dialog: false,
      nodeSettings: null,
      keywords: [],
      drawerType: {
        node: 0,
        link: 1
      },
      drawerConf: {
        title: '',
        visible: false,
        type: null,
        info: null
      },
      linkSetting: {
        desc: '',
        resetFields: function resetFields() {
          return null;
        }
      },
      nodeSetting: {
        name: '',
        desc: '',
        clearValidate: function clearValidate() {
          return null;
        }
      },
      nodeList: [],
      linkList: [],
      graphMenuList: [[{
        label: 'Начало',
        disable: function disable(graph) {
          return !!graph.nodeList.find(function (node) {
            return node.meta.prop === 'start';
          });
        },
        selected: function selected(graph, coordinate) {
          if (!graph.nodeList.find(function (node) {
            return node.meta.prop === 'start';
          })) {
            graph.addNode({
              id: 'start',
              width: 80,
              height: 50,
              coordinate: coordinate,
              meta: {
                prop: 'start',
                name: 'Начало'
              }
            });
          }
        }
      }, {
        label: 'Менеджер',
        disable: false,
        selected: function selected(graph, coordinate) {
          graph.addNode({
            width: 160,
            height: 80,
            coordinate: coordinate,
            meta: {
              prop: 'manager',
              name: 'Менеджер'
            }
          });
        }
      }, {
        label: 'Клиент',
        disable: false,
        selected: function selected(graph, coordinate) {
          graph.addNode({
            width: 160,
            height: 80,
            coordinate: coordinate,
            meta: {
              prop: 'client',
              name: 'Клиент',
              keyword: null
            }
          });
        }
      }, {
        label: 'Конец',
        disable: function disable(graph) {
          return !!graph.nodeList.find(function (point) {
            return point.meta.prop === 'end';
          });
        },
        selected: function selected(graph, coordinate) {
          graph.addNode({
            id: 'end',
            width: 80,
            height: 50,
            coordinate: coordinate,
            meta: {
              prop: 'end',
              name: 'Конец',
              keyword: null
            }
          });
        }
      }], [{
        label: 'Сохранить',
        selected: function selected(graph, coordinate) {
          axios.post('/api/project/set', Object.assign(graph.toJSON(), {
            project_id: _this.id
          })).then(function (resp) {
            console.log(resp.data);
          })["catch"](function (err) {
            console.error(err);
          });
        }
      }, {
        label: 'Выбрать все',
        selected: function selected(graph, coordinate) {
          graph.selectAll();
        }
      }]],
      nodeMenuList: [[{
        label: 'Редактировать',
        selected: function selected(node, coordinate) {
          console.log(node, coordinate);
          _this.dialog = true;

          _this.openKeyword(node);
        }
      }], [{
        label: 'Удалить',
        disable: false,
        hidden: function hidden(node) {
          return node.meta.prop === 'start';
        },
        selected: function selected(node, coordinate) {
          node.remove();
        }
      }]],
      linkMenuList: [[{
        label: 'Удалить',
        disable: false,
        selected: function selected(link, coordinate) {
          link.remove();
        }
      }]]
    };
  },
  methods: {
    openKeyword: function openKeyword(node) {
      console.log(node);
      this.nodeSettings = node;
      this.keywords = node.meta.keywords || [];
    },
    addKeyword: function addKeyword() {
      if (this.$refs.formAddKeyword.validate()) {
        this.keywords.push(this.newKeywordText);
        this.newKeywordText = null;
        this.$refs.formAddKeyword.resetValidation();
      }
    },
    setNode: function setNode() {
      this.nodeSettings.meta.keywords = this.keywords;
      this.dialog = false;
    },
    enterIntercept: function enterIntercept(formNode, toNode, graph) {
      switch (toNode.meta.prop) {
        case 'start':
          return false;

        case 'manager':
          return ['start', 'client'].includes(formNode.meta.prop);

        case 'client':
          return ['start', 'manager'].includes(formNode.meta.prop);

        case 'end':
          return ['client', 'manager'].includes(formNode.meta.prop);

        default:
          return true;
      }
    },
    outputIntercept: function outputIntercept(node, graph) {
      return !(node.meta.prop === 'end');
    },
    linkDesc: function linkDesc(link) {
      return link.meta ? link.meta.desc : '';
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/project/Test.vue?vue&type=style&index=0&lang=scss&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/project/Test.vue?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, ".super-flow-base-demo {\n  width: 100%;\n  height: 100%;\n  margin: 0 auto;\n  background-color: #f5f5f5;\n}\n.super-flow-base-demo .super-flow__node .flow-node > header {\n  font-size: 14px;\n  height: 32px;\n  line-height: 32px;\n  padding: 0 12px;\n  color: #ffffff;\n}\n.super-flow-base-demo .super-flow__node .flow-node > section {\n  text-align: center;\n  line-height: 20px;\n  overflow: hidden;\n  padding: 6px 12px;\n  word-break: break-all;\n}\n.super-flow-base-demo .super-flow__node .flow-node.flow-node-start > header {\n  height: 50px;\n  line-height: 50px;\n  background-color: black;\n}\n.super-flow-base-demo .super-flow__node .flow-node.flow-node-manager > header {\n  background-color: red;\n}\n.super-flow-base-demo .super-flow__node .flow-node.flow-node-client > header {\n  background-color: #30b95c;\n}\n.super-flow-base-demo .super-flow__node .flow-node.flow-node-end > header {\n  height: 50px;\n  line-height: 50px;\n  background-color: black;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/project/Test.vue?vue&type=style&index=0&lang=scss&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/project/Test.vue?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Test_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Test.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/project/Test.vue?vue&type=style&index=0&lang=scss&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Test_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Test_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/pages/project/Test.vue":
/*!*********************************************!*\
  !*** ./resources/js/pages/project/Test.vue ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Test_vue_vue_type_template_id_923e105e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Test.vue?vue&type=template&id=923e105e& */ "./resources/js/pages/project/Test.vue?vue&type=template&id=923e105e&");
/* harmony import */ var _Test_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Test.vue?vue&type=script&lang=js& */ "./resources/js/pages/project/Test.vue?vue&type=script&lang=js&");
/* harmony import */ var _Test_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Test.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/pages/project/Test.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Test_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Test_vue_vue_type_template_id_923e105e___WEBPACK_IMPORTED_MODULE_0__.render,
  _Test_vue_vue_type_template_id_923e105e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/project/Test.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/project/Test.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./resources/js/pages/project/Test.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Test_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Test.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/project/Test.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Test_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/project/Test.vue?vue&type=style&index=0&lang=scss&":
/*!*******************************************************************************!*\
  !*** ./resources/js/pages/project/Test.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Test_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Test.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/project/Test.vue?vue&type=style&index=0&lang=scss&");


/***/ }),

/***/ "./resources/js/pages/project/Test.vue?vue&type=template&id=923e105e&":
/*!****************************************************************************!*\
  !*** ./resources/js/pages/project/Test.vue?vue&type=template&id=923e105e& ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Test_vue_vue_type_template_id_923e105e___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Test_vue_vue_type_template_id_923e105e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Test_vue_vue_type_template_id_923e105e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Test.vue?vue&type=template&id=923e105e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/project/Test.vue?vue&type=template&id=923e105e&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/project/Test.vue?vue&type=template&id=923e105e&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/project/Test.vue?vue&type=template&id=923e105e& ***!
  \*******************************************************************************************************************************************************************************************************************/
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
    { staticClass: "super-flow-base-demo" },
    [
      _c("super-flow", {
        ref: "superFlow",
        attrs: {
          "node-list": _vm.nodeList,
          "link-list": _vm.linkList,
          "graph-menu": _vm.graphMenuList,
          "node-menu": _vm.nodeMenuList,
          "link-menu": _vm.linkMenuList,
          "enter-intercept": _vm.enterIntercept,
          "output-intercept": _vm.outputIntercept,
          "link-desc": _vm.linkDesc
        },
        scopedSlots: _vm._u([
          {
            key: "node",
            fn: function(ref) {
              var meta = ref.meta
              var node = ref.node
              return [
                _c("div", { class: "flow-node flow-node-" + meta.prop }, [
                  _c("header", [
                    _vm._v(
                      "\n                    " +
                        _vm._s(meta.name) +
                        "\n                "
                    )
                  ]),
                  _vm._v(" "),
                  _c("section", [
                    _vm._v(
                      "\n                    " +
                        _vm._s(meta.desc) +
                        "\n                "
                    )
                  ])
                ])
              ]
            }
          }
        ])
      }),
      _vm._v(" "),
      _c(
        "v-row",
        { attrs: { justify: "center" } },
        [
          _c(
            "v-dialog",
            {
              attrs: { "max-width": "600px" },
              model: {
                value: _vm.dialog,
                callback: function($$v) {
                  _vm.dialog = $$v
                },
                expression: "dialog"
              }
            },
            [
              _c(
                "v-card",
                [
                  _c("v-card-title", [
                    _c("span", { staticClass: "text-h5" }, [
                      _vm._v("Ключевые слова")
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "v-list",
                    _vm._l(_vm.keywords, function(item, index) {
                      return _c(
                        "v-list-item",
                        { key: index },
                        [
                          _c(
                            "v-list-item-content",
                            [_c("v-list-item-title", [_vm._v(_vm._s(item))])],
                            1
                          )
                        ],
                        1
                      )
                    }),
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-card-actions",
                    [
                      _c(
                        "v-btn",
                        {
                          staticClass: "mb-2",
                          attrs: { color: "warning", dark: "" },
                          on: {
                            click: function($event) {
                              _vm.dialogAddKeyword = true
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n                        Добавить\n                    "
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c("v-spacer"),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          staticClass: "mb-2",
                          attrs: { color: "blue darken-1", text: "" },
                          on: {
                            click: function($event) {
                              _vm.dialog = false
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n                        Отмена\n                    "
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          staticClass: "mb-2",
                          attrs: { color: "blue", type: "submit", dark: "" },
                          on: { click: _vm.setNode }
                        },
                        [
                          _vm._v(
                            "\n                        Сохранить\n                    "
                          )
                        ]
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-dialog",
            {
              attrs: { "max-width": "300px" },
              model: {
                value: _vm.dialogAddKeyword,
                callback: function($$v) {
                  _vm.dialogAddKeyword = $$v
                },
                expression: "dialogAddKeyword"
              }
            },
            [
              _c(
                "v-card",
                [
                  _c("v-card-title", [
                    _c("span", { staticClass: "text-h5" }, [
                      _vm._v("Добавление фразы")
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "v-form",
                    {
                      ref: "formAddKeyword",
                      attrs: { "lazy-validation": "" },
                      on: {
                        submit: function($event) {
                          $event.preventDefault()
                          return _vm.addKeyword.apply(null, arguments)
                        }
                      },
                      model: {
                        value: _vm.validAddKeyword,
                        callback: function($$v) {
                          _vm.validAddKeyword = $$v
                        },
                        expression: "validAddKeyword"
                      }
                    },
                    [
                      _c(
                        "v-card-text",
                        [
                          _c("v-text-field", {
                            attrs: {
                              label: "Слово или словосочетание",
                              rules: _vm.requiredRules,
                              required: ""
                            },
                            model: {
                              value: _vm.newKeywordText,
                              callback: function($$v) {
                                _vm.newKeywordText = $$v
                              },
                              expression: "newKeywordText"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-card-actions",
                        [
                          _c("v-spacer"),
                          _vm._v(" "),
                          _c(
                            "v-btn",
                            {
                              attrs: { color: "blue darken-1", text: "" },
                              on: {
                                click: function($event) {
                                  _vm.dialogAddKeyword = false
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                            Отмена\n                        "
                              )
                            ]
                          ),
                          _vm._v(" "),
                          !_vm.validAddKeyword
                            ? _c(
                                "v-btn",
                                {
                                  attrs: {
                                    disabled: !_vm.validAddKeyword,
                                    color: "blue",
                                    type: "submit"
                                  }
                                },
                                [
                                  _vm._v(
                                    "\n                            Добавить\n                        "
                                  )
                                ]
                              )
                            : _c(
                                "v-btn",
                                {
                                  attrs: {
                                    disabled: !_vm.validAddKeyword,
                                    dark: "",
                                    color: "blue",
                                    type: "submit"
                                  }
                                },
                                [
                                  _vm._v(
                                    "\n                            Добавить\n                        "
                                  )
                                ]
                              )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
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