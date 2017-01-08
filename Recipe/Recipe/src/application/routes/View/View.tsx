import * as React from "react";
import { Link, IndexLink } from "react-router";
import { Row, Col, Navbar, NavGroupItem, NavItem, Input, Content, Chip } from "dadou-react-mat";

import Layout from "src/application/layouts/AppLayout/AppLayout";

import * as models from "src/application/modules/Recette/models";


interface IViewProps {

}

interface IViewState { }

class View extends React.Component<IViewProps, IViewState>{

    render() {
        return (
            <Layout>
                <div className="View">
                    View
                </div>
            </Layout>
        );
    }
}

export default View;