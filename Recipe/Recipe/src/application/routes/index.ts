import AppLayout from "./../layouts/AppLayout/AppLayout";

import IndexComponent from "./Search/Search";


import usersRoutes from "./Users";
import searchRoutes from "./Search";

export const createRoutes = (store): ReactRouter.PlainRoute => {

    let configRoutes: ReactRouter.PlainRoute = {};

    configRoutes.path = "/";
    configRoutes.component = AppLayout;
    configRoutes.indexRoute = { component: IndexComponent };
    configRoutes.childRoutes = [];

    configRoutes.childRoutes = configRoutes.childRoutes.concat(
        usersRoutes(store),
        searchRoutes(store)
    );

    return configRoutes;


};