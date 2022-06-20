import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./components/app/app";
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/index'
import thunk from 'redux-thunk';


// Почему так
// https://stackoverflow.com/questions/52800877/error-with-redux-devtools-extension-using-ts-property-redux-devtools-extens

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Из тренажера не работает
  // typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  //   ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  //   : compose;

    const enhancer = composeEnhancers(applyMiddleware(thunk));

    const store = createStore(rootReducer, enhancer );

    
ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
