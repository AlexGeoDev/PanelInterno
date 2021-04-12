let loadingEvent;

const setEvent = (event) => {
  loadingEvent = event;
};

const showLoadingScreen = () => {
  loadingEvent(true);
};

const hideLoadingScreen = () => {
  loadingEvent(false);
};

export default {
  setEvent,
  showLoadingScreen,
  hideLoadingScreen,
};
