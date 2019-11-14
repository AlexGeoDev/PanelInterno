webpackHotUpdate("static\\development\\pages\\index.js",{

/***/ "./business/state.js":
/*!***************************!*\
  !*** ./business/state.js ***!
  \***************************/
/*! exports provided: subscribe, notify, remove */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribe", function() { return subscribe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "notify", function() { return notify; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove; });
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
  console.log("notify", events);

  if (events) {
    events.forEach(function (handler) {
      console.log("call handler:", eventName, data);
      handler.callback(data);
    });
  }
};

var remove = function remove(eventName, id) {
  console.log("remove", eventName, id);
  var events = listeners[eventName];

  if (events) {
    for (var i = events.length - 1; i >= 0; i--) {
      if (events[i].id === id) {
        console.log("remover");
        events.splice(i, 1);
        break;
      }
    }
  }

  console.log("remove", listeners[eventName]);
};



/***/ })

})
//# sourceMappingURL=index.js.f903cc39e29a24be0e1b.hot-update.js.map