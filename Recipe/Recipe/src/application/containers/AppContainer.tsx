import * as React from "react";
import {Route, Router, IndexRoute, hashHistory} from "react-router"
import { Provider } from "react-redux";

import AppLayout from "./../layouts/AppLayout/AppLayout";
import Home from "./../routes/Home/Home";
import About from "./../routes/About/About";

interface IAppContainerProps {
    store: Redux.Store<any>
    routes: ReactRouter.PlainRoute
}

interface IAppContainerState { }

class AppContainer extends React.Component<IAppContainerProps, IAppContainerState>{
    render() {
        return (
            <Provider store={this.props.store}>
                <Router history={hashHistory} routes={this.props.routes} />
            </Provider>
        );
    }
}

export default AppContainer;