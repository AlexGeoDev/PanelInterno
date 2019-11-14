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
//declarandole el listener
var listeners = {};
var idlistener = 1;

var subscribe = function subscribe(eventName, handler) {
  //revisando si no hay listener con el nombre del evento que se le pasa
  if (!listeners[eventName]) {
    //inicializando la lista que va a contener los handlers
    listeners[eventName] = [];
  } //obteniendo los eventos 


  var events = listeners[eventName];
  console.log("adding:", eventName, handler);
  events.push({
    id: idlistener++,
    callback: handler
  });
  return idlistener;
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

var remove = function remove(eventName, id) {
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
//# sourceMappingURL=index.js.7b5a5afadcfb8fa348be.hot-update.js.map