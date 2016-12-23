import About from "./About";
import {AboutReducer} from "./modules/about";
import { injectAsyncReducer } from "./../../../lib/store/createStore";



export default (store?): ReactRouter.PlainRoute => {
    injectAsyncReducer(store, "About", AboutReducer);
    return {
        path: "/about",
        component: About
        /*getComponent(location, cb) {
            require.ensure([], (require) => {
                //import AboutComponent from "./About";
                //import {} from "./modules/about";
                const AboutComponent = require("./About").default;
                const AboutReducer = require("./modules/about").AboutReducer;

                injectAsyncReducer(store, "About", AboutReducer);
                cb(null, AboutComponent);

            })
        }*/

    };
};