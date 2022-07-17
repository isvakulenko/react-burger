import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers/index";
import { socketMiddleware } from './middleware/socketMiddleware' 
import {wsUrl} from '../utils/api'
//import {wsActions} from './actions/ws'

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk,
  //  socketMiddleware(wsUrl, wsActions)
   ));
export const store = createStore(rootReducer, enhancer);
