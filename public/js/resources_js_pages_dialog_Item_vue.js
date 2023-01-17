"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_dialog_Item_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/dialog/Item.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/dialog/Item.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    p_id: [Number, String],
    id: [Number, String]
  },
  data: function data() {
    var _this = this;

    return {
      report: [],
      newKeywordText: null,
      dialog: false,
      nodeSettings: null,
      name: null,
      desc: null,
      keywords: [],
      step: null,
      nextStage: null,
      nextStageItems: [{
        text: 'Все варианты',
        value: 1
      }, {
        text: 'Только 1 совпадение',
        value: 2
      }],
      nodeList: [],
      linkList: [],
      graphMenuList: [[{
        label: 'Выбрать все',
        selected: function selected(graph, coordinate) {
          graph.selectAll();
        }
      }]],
      nodeMenuList: [[{
        label: 'Просмотр',
        selected: function selected(node, coordinate) {
          console.log(node, coordinate);
          _this.dialog = true;

          _this.openKeyword(node);
        }
      }]]
    };
  },
  watch: {
    id: function id() {
      this.getNodes();
    }
  },
  computed: _objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_0__.mapState)(['dialogs'])),
  methods: {
    linkDesc: function linkDesc(link) {
      return link.meta ? link.meta.desc : '';
    },
    openKeyword: function openKeyword(node) {
      console.log(node);
      this.nodeSettings = node;
      this.name = node.meta.name || null;
      this.desc = node.meta.desc || null;
      this.step = node.meta.step || null;
      this.nextStage = node.meta.nextStage || null;
      this.keywords = node.meta.keywords || [];
    },
    getReport: function getReport() {
      var _this2 = this;

      axios.post('/api/report/list', {
        dialog_id: this.id,
        project_id: this.p_id
      }).then(function (resp) {
        _this2.report = resp.data;
      })["catch"](function (err) {
        console.error(err);
      });
    },
    getNodes: function getNodes() {
      var _this3 = this;

      axios.get('/api/nodes/get/' + this.p_id).then(function (resp) {
        _this3.nodeList = resp.data.nodeList.map(function (n) {
          return {
            id: n.node_id,
            coordinate: [n.coordinate_x, n.coordinate_y],
            meta: {
              id: n.id,
              name: n.meta_name,
              prop: n.meta_prop,
              desc: n.meta_desc,
              step: n.meta_step,
              nextStage: n.meta_next_stage,
              keywords: resp.data.keywords.filter(function (k) {
                return k.transcribe_node_id === n.id;
              }).map(function (k) {
                return k.text;
              })
            },
            height: n.height,
            width: n.width
          };
        });
        _this3.linkList = resp.data.linkList.map(function (l) {
          return {
            id: l.link_id,
            startId: resp.data.nodeList.filter(function (n) {
              return n.id === l.start_id;
            })[0].node_id,
            endId: resp.data.nodeList.filter(function (n) {
              return n.id === l.end_id;
            })[0].node_id,
            startAt: [l.start_at_x, l.start_at_y],
            endAt: [l.end_at_x, l.end_at_y],
            meta: l.meta ? {
              desc: l.meta
            } : null
          };
        });
      })["catch"](function (err) {
        console.error(err);
      });
    }
  },
  mounted: function mounted() {
    this.getNodes();
    this.getReport();
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/dialog/Item.vue?vue&type=style&index=0&lang=scss&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/dialog/Item.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, ".super-flow-base-demo {\n  width: 100%;\n  height: 100%;\n  margin: 0 auto;\n  background-color: #f5f5f5;\n}\n.super-flow-base-demo .super-flow__node .flow-node > header {\n  font-size: 14px;\n  height: 32px;\n  line-height: 32px;\n  padding: 0 12px;\n  color: #ffffff;\n}\n.super-flow-base-demo .super-flow__node .flow-node > section {\n  text-align: center;\n  line-height: 20px;\n  overflow: hidden;\n  padding: 6px 12px;\n  word-break: break-all;\n}\n.super-flow-base-demo .super-flow__node .flow-node.flow-node-start > header {\n  height: 50px;\n  line-height: 50px;\n  background-color: black;\n}\n.super-flow-base-demo .super-flow__node .flow-node.flow-node-none > header {\n  background-color: black;\n}\n.super-flow-base-demo .super-flow__node .flow-node.flow-node-manager > header {\n  background-color: red;\n}\n.super-flow-base-demo .super-flow__node .flow-node.flow-node-client > header {\n  background-color: #30b95c;\n}\n.super-flow-base-demo .super-flow__node .flow-node.flow-node-end > header {\n  height: 50px;\n  line-height: 50px;\n  background-color: black;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/dialog/Item.vue?vue&type=style&index=0&lang=scss&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/dialog/Item.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Item_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Item.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/dialog/Item.vue?vue&type=style&index=0&lang=scss&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Item_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Item_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/pages/dialog/Item.vue":
/*!********************************************!*\
  !*** ./resources/js/pages/dialog/Item.vue ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Item_vue_vue_type_template_id_5eb4787e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Item.vue?vue&type=template&id=5eb4787e& */ "./resources/js/pages/dialog/Item.vue?vue&type=template&id=5eb4787e&");
/* harmony import */ var _Item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Item.vue?vue&type=script&lang=js& */ "./resources/js/pages/dialog/Item.vue?vue&type=script&lang=js&");
/* harmony import */ var _Item_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Item.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/pages/dialog/Item.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Item_vue_vue_type_template_id_5eb4787e___WEBPACK_IMPORTED_MODULE_0__.render,
  _Item_vue_vue_type_template_id_5eb4787e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/dialog/Item.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/dialog/Item.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./resources/js/pages/dialog/Item.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Item.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/dialog/Item.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/dialog/Item.vue?vue&type=style&index=0&lang=scss&":
/*!******************************************************************************!*\
  !*** ./resources/js/pages/dialog/Item.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Item_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Item.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/dialog/Item.vue?vue&type=style&index=0&lang=scss&");


/***/ }),

/***/ "./resources/js/pages/dialog/Item.vue?vue&type=template&id=5eb4787e&":
/*!***************************************************************************!*\
  !*** ./resources/js/pages/dialog/Item.vue?vue&type=template&id=5eb4787e& ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Item_vue_vue_type_template_id_5eb4787e___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Item_vue_vue_type_template_id_5eb4787e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Item_vue_vue_type_template_id_5eb4787e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Item.vue?vue&type=template&id=5eb4787e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/dialog/Item.vue?vue&type=template&id=5eb4787e&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/dialog/Item.vue?vue&type=template&id=5eb4787e&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/dialog/Item.vue?vue&type=template&id=5eb4787e& ***!
  \******************************************************************************************************************************************************************************************************************/
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
          draggable: false,
          linkAddable: false,
          "link-desc": _vm.linkDesc
        },
        scopedSlots: _vm._u([
          {
            key: "node",
            fn: function(ref) {
              var meta = ref.meta
              return [
                !["start", "end"].includes(meta.prop) &&
                _vm.report.filter(function(r) {
                  return parseInt(r.transcribe_node_id) === parseInt(meta.id)
                }).length
                  ? _c("div", { class: "flow-node flow-node-" + meta.prop }, [
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
                  : _c(
                      "div",
                      {
                        staticClass: "flow-node",
                        class: {
                          "flow-node-none": !["start", "end"].includes(
                            meta.prop
                          ),
                          "flow-node-start": ["start", "end"].includes(
                            meta.prop
                          )
                        }
                      },
                      [
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
                      ]
                    )
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
                    _c("span", { staticClass: "text-h5" }, [_vm._v("Просмотр")])
                  ]),
                  _vm._v(" "),
                  _c(
                    "v-form",
                    { attrs: { "lazy-validation": "" } },
                    [
                      _c(
                        "v-container",
                        { staticClass: "px-4", attrs: { fluid: "" } },
                        [
                          _c("v-text-field", {
                            attrs: { label: "Заголовок блока", readonly: "" },
                            model: {
                              value: _vm.name,
                              callback: function($$v) {
                                _vm.name = $$v
                              },
                              expression: "name"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: { label: "Описание блока", readonly: "" },
                            model: {
                              value: _vm.desc,
                              callback: function($$v) {
                                _vm.desc = $$v
                              },
                              expression: "desc"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-select", {
                            attrs: {
                              items: _vm.nextStageItems,
                              label: "Следующие стадии",
                              readonly: ""
                            },
                            model: {
                              value: _vm.nextStage,
                              callback: function($$v) {
                                _vm.nextStage = $$v
                              },
                              expression: "nextStage"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              label: "Количество сообщений",
                              hint: "Ожидание вхождения совпадения",
                              readonly: ""
                            },
                            model: {
                              value: _vm.step,
                              callback: function($$v) {
                                _vm.step = $$v
                              },
                              expression: "step"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-list",
                        [
                          _c("v-subheader", [_vm._v("Ключевые слова")]),
                          _vm._v(" "),
                          _vm._l(_vm.keywords, function(item, index) {
                            return _c(
                              "v-list-item",
                              { key: index },
                              [
                                _c(
                                  "v-list-item-content",
                                  [
                                    _c("v-list-item-title", [
                                      _vm._v(_vm._s(item))
                                    ])
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          })
                        ],
                        2
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
                                "\n                            Закрыть\n                        "
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