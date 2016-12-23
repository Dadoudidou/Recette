import { applyMiddleware, compose, createStore as createStoreRedux } from "redux";

//middlewares
import thunkMiddleware from "redux-thunk";
import * as createLoggerMiddleware from "redux-logger";

import { makeRootReducer, IState } from "./reducers";

export interface IStore<T> extends Redux.Store<T> {
    asyncReducers: { [name: string]: Redux.Reducer<any> }
}

//configuration du logger
let loggerMiddleware = createLoggerMiddleware({
    collapsed: true
});

let store = undefined;

let finalCreateStore = (initialState = {}) => {


    //middleware configuration
    let middlewares = [];
    middlewares.push(thunkMiddleware);
    if (!PRODUCTION) {
        middlewares.push(loggerMiddleware);
    }

    //store
    store = createStoreRedux(
        makeRootReducer(),
        initialState,
        applyMiddleware(...middlewares));

    //ajout de reducers async
    store.asyncReducers = {};

    //last action call
    store.subscribe(() => {
        let _state: IState = store.getState() as IState;
        let _action = _state.lastAction;
        if (_action && _action.next) {
            _action.next(store.dispatch, _action.payload);
        }
    });

    return store;

};

export const createStore = finalCreateStore;
export const getStore = () => store;
export const injectAsyncReducer = (store: IStore<any>, name, asyncReducer) => {
    store.asyncReducers[name] = asyncReducer;
    store.replaceReducer(makeRootReducer(store.asyncReducers));
};