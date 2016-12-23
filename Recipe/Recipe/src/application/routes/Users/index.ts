import {injectAsyncReducer} from "./../../../lib/store/createStore";

import Login from "./Login";

export default (store?): ReactRouter.PlainRoute[] => {
    //injectAsyncReducer(store, "About", AboutReducer);
    return [
        { path: "/login", component: Login }
    ];
};