//declarandole el listener
const listeners = {};

const subscribe = (eventName,handler) => {

  //revisando si no hay listener con el nombre del evento que se le pasa
  if (!listeners[eventName]){
    //inicializando la lista que va a contener los handlers
    listeners[eventName] = [];
  }
//obteniendo los eventos 
  let events = listeners[eventName];
  console.log("adding:" ,eventName ,handler);
  events.push(handler);
};

const notify = (eventName,data) => {
  let events = listeners[eventName];
  if (events){
    events.forEach(handler => {
      console.log("call handler:" ,eventName ,data);
      handler(data);
    });
  }
};

export {subscribe,notify};



