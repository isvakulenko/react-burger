export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage, wsClose, wsInitWithToken } = wsActions;
      if (type === wsInit) {
        socket = new WebSocket(wsUrl);
        // console.log ('wsInitOK')
      }
      if (type === wsClose) {
        socket.close();
        // console.log ('socket close')
      }
      if (type === wsInitWithToken) {
        socket = new WebSocket(payload);
        // console.log ('wsInitwithToken')
      }
  
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
          // console.log ('wsInitsuccess')
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };


      }

      next(action);
    };
  };
};