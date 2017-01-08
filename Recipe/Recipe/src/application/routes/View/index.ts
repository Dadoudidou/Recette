import { injectAsyncReducer } from "./../../../lib/store/createStore";

import View from "./View"

export default (store?): ReactRouter.PlainRoute[] => {
    //injectAsyncReducer(store, "About", AboutReducer);
    return [
        { path: "/view/:id", component: View }
    ];
};