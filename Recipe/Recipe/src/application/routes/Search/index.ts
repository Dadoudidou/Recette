import { injectAsyncReducer } from "./../../../lib/store/createStore";

import { SearchReducer } from "./reducer";
import Search from "./Search"

export default (store?): ReactRouter.PlainRoute[] => {
    injectAsyncReducer(store, "Search", SearchReducer);
    return [
        { path: "/search", component: Search }
    ];
};