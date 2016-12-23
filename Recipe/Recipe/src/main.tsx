import * as React from "react";
import * as ReactDom from "react-dom";

import {createStore} from "./lib/store/createStore";
import {createRoutes} from "./application/routes";
import AppContainer from "./application/containers/AppContainer";
import { loadModules} from "./application/modules";

require("./../vendors/font-awesome/css/font-awesome.css");
require("./application/styles/main.scss");




if (PRODUCTION) {
    //hack permettant de désactiver react dev-tools en production
    window["__REACT_DEVTOOLS_GLOBAL_HOOK__"].inject = function () { }
}

// *************
// store création
// *************
let store = createStore();

// *************
// load modules
// *************
loadModules(store);

// *************
// routes création
// *************
let routes = createRoutes(store);



// *************
// render
// *************
const mount_node = document.getElementById("root");
ReactDom.render(
    <AppContainer store={store} routes={routes} />,
    mount_node);


//// examples


