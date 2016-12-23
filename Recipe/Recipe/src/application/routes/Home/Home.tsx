import * as React from "react";
import {Link} from "react-router";
require("./Home.scss");

interface IHomeProps {
    params?: {
        username?: string,
        reponame?: string
    }
}

interface IHomeState { }

class Home extends React.Component<IHomeProps, IHomeState>{
    render() {
        return (
            <div className="home">
                <h2>Home view</h2>
                <h3>{this.props.params.reponame}</h3>
                <img src={require("./assets/Firefox.png")} />
            </div>
        );
    }
}

export default Home;