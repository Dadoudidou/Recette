import * as React from "react";
import {Link, IndexLink} from "react-router";

interface IAppLayoutProps {
    
}

interface IAppLayoutState { }

class AppLayout extends React.Component<IAppLayoutProps, IAppLayoutState>{
    render() {
        return (
            <div className="App">
                {this.props.children}
            </div>
        );
    }
}

export default AppLayout;