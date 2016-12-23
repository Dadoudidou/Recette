import * as React from "react";
import {Link, IndexLink} from "react-router";
import {Drawer, Content, Navbar, NavGroupItem, NavItem} from "dadou-react-mat";


interface IConnectedLayoutProps {

}

interface IConnectedLayoutState { }

class ConnectedLayout extends React.Component<IConnectedLayoutProps, IConnectedLayoutState>{

    sidebar() {
        return (
            <Content>
                <div className="text-center">
                    LOGO
                </div>
                <div>
                    Personne connectée
                </div>
                <div>
                    <ul>
                        <li><Link to="/dashboard">tableau de bord</Link></li>
                        <li><a>Membres</a></li>
                        <li>
                            <a>Paramètres</a>
                            <ul>
                                <li><a>Saisons</a></li>
                                <li>
                                    <a>Activités</a>
                                    <ul>
                                        <li>Sections</li>
                                        <li>Sessions</li>
                                    </ul>
                                </li>
                                <li><a>Lieux</a></li>
                                <li><a>Tarifs</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </Content>
        );
    }

    render() {
        return (
            <div className="UserLogged">
                <Drawer content={this.sidebar() } docked containerClassName="sidebar">
                    <Navbar>
                        <NavGroupItem>
                            <NavItem><i className="fa fa-bars" /></NavItem>
                        </NavGroupItem>
                        <NavGroupItem position="right">
                            <NavItem>Saison actuelle</NavItem>
                            <NavItem><i className="fa fa-user"/> <i className="fa fa-caret-down" /></NavItem>
                        </NavGroupItem>
                    </Navbar>
                    {this.props.children}
                </Drawer>
            </div>
        );
    }
}

export default ConnectedLayout;