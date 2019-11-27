//declarandole el listener
const listeners = {};
let idlistener = 1;
const subscribe = (eventName,handler) => {

  //revisando si no hay listener con el nombre del evento que se le pasa
  if (!listeners[eventName]){
    //inicializando la lista que va a contener los handlers
    listeners[eventName] = [];
  }
//obteniendo los eventos 
  let events = listeners[eventName];
  console.log("adding:" ,eventName ,handler);
  events.push({id: ++idlistener,callback:handler});

  return idlistener;
};

const notify = (eventName,data) => {
  let events = listeners[eventName];
  console.log("notify", events);
  if (events){
    events.forEach(handler => {
      console.log("call handler:" ,eventName ,data);
      handler.callback(data);
    });
  }
};

const remove = (eventName,id) => {
  console.log("remove", eventName, id);
  let events = listeners[eventName];
  if (events){
    for(var i = events.length - 1; i >= 0; i--) {
      if(events[i].id === id) {
        console.log("remover");
        events.splice(i, 1);
        break;

      }
    }    
  }

  console.log("remove", listeners[eventName]);
};

export {subscribe,notify,remove};



