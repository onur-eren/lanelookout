import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";

import reportReducer from "./report/reducers";
import reportSagas from "./report/sagas";

const sagaMiddleWare = createSagaMiddleware();

const reducers = combineReducers({
  report: reportReducer,
});

const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleWare),
);

sagaMiddleWare.run(reportSagas);

export default store;
