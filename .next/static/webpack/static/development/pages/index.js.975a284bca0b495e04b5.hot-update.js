webpackHotUpdate("static\\development\\pages\\index.js",{

/***/ "./business/state.js":
/*!***************************!*\
  !*** ./business/state.js ***!
  \***************************/
/*! exports provided: subscribe, notify */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribe", function() { return subscribe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "notify", function() { return notify; });
var listeners = {};

var subscribe = function subscribe(eventName, handler) {
  if (!listeners[eventName]) {
    listeners[eventName] = [];
  }

  var events = listeners[eventName];
  console.log("adding:", eventName, handler);
  events.push(handler);
};

var notify = function notify(eventName, data) {
  var events = listeners[eventName];

  if (events) {
    events.forEach(function (handler) {
      console.log("call handler:", eventName, data);
      handler(data);
    });
  }
};



/***/ })

})
//# sourceMappingURL=index.js.975a284bca0b495e04b5.hot-update.js.map