import { injectAsyncReducer } from "./../../../lib/store/createStore";

import Search from "./Search"

export default (store?): ReactRouter.PlainRoute[] => {
    //injectAsyncReducer(store, "About", AboutReducer);
    return [
        { path: "/search", component: Search }
    ];
};