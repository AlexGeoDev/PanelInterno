webpackHotUpdate("static\\development\\pages\\listusers.js",{

/***/ "./pages/listusers.js":
/*!****************************!*\
  !*** ./pages/listusers.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _components_WebDesktop_DesktopLayout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/WebDesktop/DesktopLayout */ "./components/WebDesktop/DesktopLayout.js");
/* harmony import */ var _business_transactionBusiness__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../business/transactionBusiness */ "./business/transactionBusiness.js");
/* harmony import */ var react_table__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-table */ "./node_modules/react-table/es/index.js");
/* harmony import */ var react_table_react_table_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-table/react-table.css */ "./node_modules/react-table/react-table.css");
/* harmony import */ var react_table_react_table_css__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_table_react_table_css__WEBPACK_IMPORTED_MODULE_11__);







var _jsxFileName = "D:\\DESARROLLO\\PANELCAJERO\\pages\\listusers.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement;





var ListUsers =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__["default"])(ListUsers, _React$Component);

  function ListUsers(props) {
    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, ListUsers);

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(ListUsers).call(this, props));
    _this.state = {
      list: []
    };
    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(ListUsers, [{
    key: "getdata",
    value: function () {
      var _getdata = Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var data;
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _business_transactionBusiness__WEBPACK_IMPORTED_MODULE_9__["default"].listUsersSegment();

              case 2:
                data = _context.sent;
                console.log(data);
                this.setState({
                  list: data
                });

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getdata() {
        return _getdata.apply(this, arguments);
      }

      return getdata;
    }()
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getdata();
    }
  }, {
    key: "render",
    value: function render() {
      var columns = [{
        Header: 'Id',
        accessor: 'id' // String-based value accessors!

      }, {
        Header: 'serialNumber',
        accessor: 'serialNumber' // String-based value accessors!

      }, {
        Header: 'comercialName',
        accessor: 'comercialName' // String-based value accessors!

      }, {
        Header: 'identification',
        accessor: 'iidentificationd' // String-based value accessors!

      }, {
        Header: 'Celular',
        accessor: 'cellphone' // String-based value accessors!

      }, {
        Header: 'email',
        accessor: 'email' // String-based value accessors!

      }, {
        Header: 'address',
        accessor: 'address' // String-based value accessors!

      }, {
        Header: 'userIdSegment',
        accessor: 'userIdSegment' // String-based value accessors!

      }, {
        Header: 'deviceIdSegment',
        accessor: 'deviceIdSegment' // String-based value accessors!

      }, {
        Header: 'anonymousIdSegment',
        accessor: 'anonymousIdSegment' // String-based value accessors!

      }, {
        Header: 'merchantCode',
        accessor: 'merchantCode' // String-based value accessors!

      }, {
        Header: 'date',
        accessor: 'date' // String-based value accessors!

      }];
      return __jsx(_components_WebDesktop_DesktopLayout__WEBPACK_IMPORTED_MODULE_8__["default"], {
        titulo: "Listado de Usuarios para Asignaci\xF3n",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 83
        },
        __self: this
      }, __jsx("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 84
        },
        __self: this
      }, __jsx("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 84
        },
        __self: this
      }, "Lista de usuarios sin asociar")), __jsx(react_table__WEBPACK_IMPORTED_MODULE_10__["default"], {
        data: this.state.list,
        columns: columns,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 85
        },
        __self: this
      }));
    }
  }]);

  return ListUsers;
}(react__WEBPACK_IMPORTED_MODULE_7___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (ListUsers);

/***/ })

})
//# sourceMappingURL=listusers.js.bf5634751e87a058fb3b.hot-update.js.map