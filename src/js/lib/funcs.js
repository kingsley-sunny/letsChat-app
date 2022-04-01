export const htmlDomElement = (
  dom,
  attachObj = { eventName: null, eventHandler: (e) => { }, domLoaded: (eleem) => {} }
) => {
  if (dom) {
    if(attachObj.domLoaded){
        attachObj.domLoaded(dom);
    }
    return {
      event: dom.addEventListener(attachObj.eventName, attachObj.eventHandler),
      element: dom,
    };
  }
  return {};
};
