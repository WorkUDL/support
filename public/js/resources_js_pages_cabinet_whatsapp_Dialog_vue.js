"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_cabinet_whatsapp_Dialog_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/cabinet/whatsapp/Dialog.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/cabinet/whatsapp/Dialog.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************/
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Dialog",
  props: {
    id: [Number, String]
  },
  data: function data() {
    return {
      sender: {},
      activeClientButton: true,
      qrScan: false,
      open: false,
      senders: [],
      dialog: [],
      message: '',
      qrImage: '',
      name: '',
      hash: '',
      active: true
    };
  },
  watch: {
    qrScan: function qrScan(newVal) {
      this.activeClientButton = !newVal;
    }
  },
  methods: {
    activeClient: function activeClient() {
      var _this = this;

      axios.post('/api/client/start', {
        id: this.id
      }).then(function (resp) {
        _this.qrScan = true;

        _this.$notice['info']({
          title: 'Уведомление',
          description: 'Начат запуск клиента'
        });

        console.log('clientActive return');
        console.log(resp.data);
      })["catch"](function (err) {
        return console.error(err);
      });
    },
    isObject: function isObject(attach) {
      console.log(attach);
      console.log(attach instanceof Object);
      return attach instanceof Object;
    },
    getSenderInfo: function getSenderInfo(incoming) {
      return this.sender.profilePic;
    },
    getDialog: function getDialog(sender) {
      var _this2 = this;

      axios.post('/api/dialog/get', {
        id: sender.dialog_id
      }).then(function (resp) {
        _this2.sender = sender;
        _this2.open = true;
        _this2.dialog = resp.data;
        _this2.message = '';

        _this2.$nextTick(function () {
          var container = this.$el.querySelector('.messages-form');
          container.scrollTop = container.scrollHeight;
        });

        console.log(resp);
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    getSenders: function getSenders() {
      var _this3 = this;

      axios.post('/api/sender/get', {
        id: this.id
      }).then(function (resp) {
        return _this3.senders = resp.data;
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    getClient: function getClient() {
      var _this4 = this;

      axios.post('/api/client/get/' + this.id).then(function (resp) {
        _this4.name = resp.data.name;
        _this4.active = resp.data.active;
        _this4.hash = resp.data.hash;

        _this4.$socket.emit('joinOnConnector', {
          id: _this4.id,
          name: _this4.name
        }, function (response) {
          console.log('joinOnConnector return');
          console.log(response);
        });
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    sendMessage: function sendMessage() {
      var _this5 = this;

      if (this.message.length !== 0) {
        axios.post('/api/message/send', {
          dialog_id: this.sender.id,
          sender: this.sender,
          message: this.message
        }).then(function (resp) {
          _this5.getDialog(_this5.sender);

          _this5.message = '';
          console.log(resp);
        })["catch"](function (err) {
          return console.log(err);
        });
      }
    }
  },
  sockets: {
    connect: function connect() {
      console.log('socket connected');
    },
    onQR: function onQR(data) {
      console.log('onQR');
      console.log(data);
      this.qrScan = true;
      this.qrImage = data;
    },
    onStatusSession: function onStatusSession(data) {
      console.log('onStatusSession');
      console.log(data);

      if (['qrReadSuccess', 'CONNECTED', 'clientReady', 'browserClose'].includes(data.status)) {
        this.qrScan = false;
        this.qrImage = '';
      }

      if (['CONNECTED', 'clientReady'].includes(data.status)) {
        this.active = true;
      }

      if (data.status === 'clientReady') {
        this.$notice['success']({
          title: 'Успех',
          description: 'Клиент подключен'
        });
      }

      if (data.status === 'browserClose') {
        this.$notice['error']({
          title: 'Ошибка',
          description: 'Браузер закрыт'
        });
      }
    }
  },
  mounted: function mounted() {
    this.getClient();
    this.getSenders();
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/cabinet/whatsapp/Dialog.vue?vue&type=style&index=0&lang=scss&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/cabinet/whatsapp/Dialog.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".qr_modal {\n  display: flex;\n  justify-content: center;\n}\n.qr_modal .spinner-border {\n  width: 10rem;\n  height: 10rem;\n}\n.dialog {\n  display: flex;\n  height: calc(100% - 56px);\n}\n.dialog-list {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  flex: 1;\n  max-width: 300px;\n  background: #eee;\n}\n.dialog-list-items {\n  overflow-y: auto;\n}\n.dialog-log {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n  flex: 1;\n}\n.dialog-log .messages-form {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  flex: 1;\n  width: 100%;\n  overflow-y: auto;\n  padding: 0.5rem 0;\n}\n.dialog-log .input-form {\n  display: flex;\n  flex: 1;\n  width: 100%;\n  max-height: 5rem;\n  min-height: 5rem;\n  padding: 0.5rem;\n}\n.dialog-log .input-form form {\n  display: flex;\n  width: 100%;\n  gap: 0.5rem;\n}\n.dialog-log .message {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.dialog-log .message-body {\n  display: flex;\n  flex-direction: row-reverse;\n}\n.dialog-log .message-body > img {\n  width: 3rem;\n  height: 3rem;\n  border-radius: 50%;\n  margin: 0.5rem;\n  box-sizing: content-box;\n  background: var(--bs-gray);\n}\n.dialog-log .message-body > div {\n  display: flex;\n  flex-direction: column;\n  align-items: baseline;\n  place-self: flex-start;\n  padding: 0.5rem;\n  margin: 0.5rem 0;\n  border: 1px solid #ccc;\n  border-radius: 0.5rem;\n}\n.dialog-log .message-body span {\n  text-align: left;\n}\n.dialog-log .message-attach {\n  display: flex;\n  justify-content: flex-end;\n}\n.dialog-log .message-attach img {\n  max-width: 300px;\n  max-height: 300px;\n}\n.dialog-log .incoming .message-body {\n  flex-direction: row;\n}\n.dialog-log .incoming .message-attach {\n  justify-content: start;\n}\n.sender {\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  transition: 0.3s;\n}\n.sender:hover {\n  background: #ddd;\n}\n.sender img {\n  width: 4rem;\n  height: 4rem;\n  border-radius: 50%;\n  padding: 0.5rem;\n}\n.sender span {\n  text-align: left;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/cabinet/whatsapp/Dialog.vue?vue&type=style&index=0&lang=scss&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/cabinet/whatsapp/Dialog.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Dialog_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Dialog.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/cabinet/whatsapp/Dialog.vue?vue&type=style&index=0&lang=scss&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Dialog_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Dialog_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/pages/cabinet/whatsapp/Dialog.vue":
/*!********************************************************!*\
  !*** ./resources/js/pages/cabinet/whatsapp/Dialog.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Dialog_vue_vue_type_template_id_70c2a275___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dialog.vue?vue&type=template&id=70c2a275& */ "./resources/js/pages/cabinet/whatsapp/Dialog.vue?vue&type=template&id=70c2a275&");
/* harmony import */ var _Dialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dialog.vue?vue&type=script&lang=js& */ "./resources/js/pages/cabinet/whatsapp/Dialog.vue?vue&type=script&lang=js&");
/* harmony import */ var _Dialog_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Dialog.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/pages/cabinet/whatsapp/Dialog.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Dialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Dialog_vue_vue_type_template_id_70c2a275___WEBPACK_IMPORTED_MODULE_0__.render,
  _Dialog_vue_vue_type_template_id_70c2a275___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/cabinet/whatsapp/Dialog.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/cabinet/whatsapp/Dialog.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/pages/cabinet/whatsapp/Dialog.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Dialog.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/cabinet/whatsapp/Dialog.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/cabinet/whatsapp/Dialog.vue?vue&type=style&index=0&lang=scss&":
/*!******************************************************************************************!*\
  !*** ./resources/js/pages/cabinet/whatsapp/Dialog.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Dialog_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader/dist/cjs.js!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Dialog.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/cabinet/whatsapp/Dialog.vue?vue&type=style&index=0&lang=scss&");


/***/ }),

/***/ "./resources/js/pages/cabinet/whatsapp/Dialog.vue?vue&type=template&id=70c2a275&":
/*!***************************************************************************************!*\
  !*** ./resources/js/pages/cabinet/whatsapp/Dialog.vue?vue&type=template&id=70c2a275& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dialog_vue_vue_type_template_id_70c2a275___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dialog_vue_vue_type_template_id_70c2a275___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dialog_vue_vue_type_template_id_70c2a275___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Dialog.vue?vue&type=template&id=70c2a275& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/cabinet/whatsapp/Dialog.vue?vue&type=template&id=70c2a275&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/cabinet/whatsapp/Dialog.vue?vue&type=template&id=70c2a275&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/cabinet/whatsapp/Dialog.vue?vue&type=template&id=70c2a275& ***!
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
    "div",
    { staticClass: "dialog" },
    [
      _c("div", { staticClass: "dialog-list" }, [
        _c(
          "div",
          { staticClass: "dialog-list-items" },
          _vm._l(_vm.senders, function(sender, index) {
            return _c(
              "div",
              {
                key: index,
                staticClass: "sender",
                on: {
                  click: function($event) {
                    $event.preventDefault()
                    return _vm.getDialog(sender)
                  }
                }
              },
              [
                _c("img", { attrs: { src: sender.profilePic } }),
                _vm._v(" "),
                _c("span", [_vm._v(_vm._s(sender.pushname))])
              ]
            )
          }),
          0
        ),
        _vm._v(" "),
        _c("div", [
          _vm.activeClientButton && !_vm.active
            ? _c(
                "button",
                {
                  staticClass: "btn btn-primary",
                  on: { click: _vm.activeClient }
                },
                [_vm._v("Активация")]
              )
            : _vm._e()
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "dialog-log" }, [
        _vm.open
          ? _c(
              "div",
              { staticClass: "messages-form" },
              _vm._l(_vm.dialog, function(msg, index) {
                return _c(
                  "div",
                  {
                    key: index,
                    staticClass: "message",
                    class: { incoming: msg.incoming }
                  },
                  [
                    _c("div", { staticClass: "message-body" }, [
                      msg.incoming
                        ? _c("img", {
                            attrs: { src: _vm.getSenderInfo(msg.incoming) }
                          })
                        : _c("img", {
                            attrs: {
                              src:
                                "data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20111%20124%22%3E%3Cpath%20fill%3D%22%23FFF%22%20d%3D%22M230.509731%2C178.396362%20C230.509731%2C173.353762%20223.976787%2C167.593687%20211.111912%2C164.237023%20C206.753338%2C163.010398%20202.609991%2C161.108272%20198.829977%2C158.59864%20C198.003309%2C158.122014%20198.128942%2C153.718295%20198.128942%2C153.718295%20L193.985548%2C153.081948%20C193.985548%2C152.724479%20193.631262%2C147.443565%20193.631262%2C147.443565%20C198.588761%2C145.762698%20198.078689%2C135.847358%20198.078689%2C135.847358%20C201.227065%2C137.609352%20203.277405%2C129.762771%20203.277405%2C129.762771%20C207.001183%2C118.861221%20201.423054%2C119.520385%20201.423054%2C119.520385%20C202.398925%2C112.865252%20202.398925%2C106.101453%20201.423054%2C99.4463204%20C198.943048%2C77.3694133%20161.60476%2C83.3627307%20166.032086%2C90.5729655%20C155.119557%2C88.54477%20157.609613%2C113.598054%20157.609613%2C113.598054%20L159.976549%2C120.085744%20C155.328108%2C123.128037%20158.559403%2C126.806677%20158.720214%2C131.040535%20C158.948867%2C137.292447%20162.740487%2C135.996937%20162.740487%2C135.996937%20C162.974165%2C146.315381%20168.017096%2C147.659061%20168.017096%2C147.659061%20C168.964373%2C154.139145%20168.373895%2C153.036314%20168.373895%2C153.036314%20L163.886265%2C153.583927%20C163.947015%2C155.057567%20163.828027%2C156.533155%20163.531978%2C157.977505%20C158.25537%2C160.350494%20157.119642%2C161.742343%20151.875699%2C164.062091%20C141.74461%2C168.541868%20130.734087%2C174.367859%20128.776716%2C182.211905%20C126.819346%2C190.055951%20125%2C207.138672%20125%2C207.138672%20L236%2C207.138672%20L230.509731%2C178.396362%20Z%22%20transform%3D%22translate%28-125%20-84%29%22/%3E%3C/svg%3E"
                            }
                          }),
                      _vm._v(" "),
                      _c(
                        "div",
                        [
                          _c("span", {
                            domProps: { innerHTML: _vm._s(msg.body) }
                          }),
                          _vm._v(" "),
                          _vm.isObject(msg.attach)
                            ? _c("attach", { attrs: { attach: msg.attach } })
                            : _vm._e()
                        ],
                        1
                      )
                    ])
                  ]
                )
              }),
              0
            )
          : _vm._e(),
        _vm._v(" "),
        _vm.open
          ? _c("div", { staticClass: "input-form" }, [
              _c(
                "form",
                {
                  on: {
                    submit: function($event) {
                      $event.preventDefault()
                      return _vm.sendMessage.apply(null, arguments)
                    }
                  }
                },
                [
                  _c("textarea", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.message,
                        expression: "message"
                      }
                    ],
                    staticClass: "form-control",
                    attrs: { placeholder: "Введите текст сообщения" },
                    domProps: { value: _vm.message },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.message = $event.target.value
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-primary ml-3",
                      attrs: { type: "submit" }
                    },
                    [_vm._v("Отправить")]
                  )
                ]
              )
            ])
          : _c("div", [_vm._v("История диалога")])
      ]),
      _vm._v(" "),
      _c(
        "Modal",
        {
          attrs: { title: "Отсканируйте QR код" },
          model: {
            value: _vm.qrScan,
            callback: function($$v) {
              _vm.qrScan = $$v
            },
            expression: "qrScan"
          }
        },
        [
          _c("div", { staticClass: "qr_modal" }, [
            _vm.qrImage.length
              ? _c("img", {
                  staticStyle: { width: "100%" },
                  attrs: { src: _vm.qrImage }
                })
              : _c(
                  "div",
                  { staticClass: "spinner-border", attrs: { role: "status" } },
                  [
                    _c("span", { staticClass: "visually-hidden" }, [
                      _vm._v("Loading...")
                    ])
                  ]
                )
          ])
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);