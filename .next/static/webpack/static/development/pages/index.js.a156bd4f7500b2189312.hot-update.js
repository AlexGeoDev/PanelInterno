webpackHotUpdate("static\\development\\pages\\index.js",{

/***/ "./business/transactionBusiness.js":
/*!*****************************************!*\
  !*** ./business/transactionBusiness.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/json/stringify */ "./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");






var transactionBusiness =
/*#__PURE__*/
function () {
  function transactionBusiness() {
    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, transactionBusiness);
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(transactionBusiness, null, [{
    key: "fetchUserBySerial",
    value: function () {
      var _fetchUserBySerial = Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(serial) {
        var data;
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.getSegmetBySerial(serial);

              case 2:
                data = _context.sent;
                return _context.abrupt("return", data);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchUserBySerial(_x) {
        return _fetchUserBySerial.apply(this, arguments);
      }

      return fetchUserBySerial;
    }()
  }, {
    key: "getSegmetBySerial",
    value: function () {
      var _getSegmetBySerial = Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2(serial) {
        var url, data, response, json, responseData;
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                url = "http://10.199.128.20:8282/api/v1/fetchuserbyserial";
                data = {
                  serial: serial
                };
                _context2.prev = 2;
                _context2.next = 5;
                return fetch(url, {
                  method: "POST",
                  // or 'PUT'
                  body: _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default()(data),
                  // data can be `string` or {object}!
                  headers: {
                    "Content-Type": "application/json"
                  }
                });

              case 5:
                response = _context2.sent;
                _context2.next = 8;
                return response.json();

              case 8:
                json = _context2.sent;
                console.log(json);
                responseData = json.data;
                console.log(responseData);
                return _context2.abrupt("return", responseData);

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](2);
                console.log("error en peticion login" + _context2.t0);
                return _context2.abrupt("return", null);

              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2, 15]]);
      }));

      function getSegmetBySerial(_x2) {
        return _getSegmetBySerial.apply(this, arguments);
      }

      return getSegmetBySerial;
    }()
  }, {
    key: "updateSegment",
    value: function () {
      var _updateSegment = Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee3(serial, merchantcode) {
        var url, data, response, json, responseData;
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                url = "http://10.199.128.20:8282/api/v1/fetchuserbyserial";
                data = {
                  serial: serial
                };
                _context3.prev = 2;
                _context3.next = 5;
                return fetch(url, {
                  method: "POST",
                  // or 'PUT'
                  body: _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default()(data),
                  // data can be `string` or {object}!
                  headers: {
                    "Content-Type": "application/json"
                  }
                });

              case 5:
                response = _context3.sent;
                _context3.next = 8;
                return response.json();

              case 8:
                json = _context3.sent;
                console.log(json);
                responseData = json.data;
                console.log(responseData);
                return _context3.abrupt("return", responseData);

              case 15:
                _context3.prev = 15;
                _context3.t0 = _context3["catch"](2);
                console.log("error en peticion login" + _context3.t0);
                return _context3.abrupt("return", null);

              case 19:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[2, 15]]);
      }));

      function updateSegment(_x3, _x4) {
        return _updateSegment.apply(this, arguments);
      }

      return updateSegment;
    }()
  }]);

  return transactionBusiness;
}();

/* harmony default export */ __webpack_exports__["default"] = (transactionBusiness);

/***/ })

})
//# sourceMappingURL=index.js.a156bd4f7500b2189312.hot-update.js.map