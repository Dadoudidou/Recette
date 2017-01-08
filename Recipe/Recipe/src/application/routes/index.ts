import AppLayout from "./../layouts/AppLayout/AppLayout";

import IndexComponent from "./Search/Search";


import usersRoutes from "./Users";
import searchRoutes from "./Search";
import viewRoutes from "./View";

export const createRoutes = (store): ReactRouter.PlainRoute => {

    let configRoutes: ReactRouter.PlainRoute = {};

    configRoutes.path = "/";
    configRoutes.component = AppLayout;
    configRoutes.indexRoute = { component: IndexComponent };
    configRoutes.childRoutes = [];

    configRoutes.childRoutes = configRoutes.childRoutes.concat(
        usersRoutes(store),
        searchRoutes(store),
        viewRoutes(store)
    );

    return configRoutes;


};