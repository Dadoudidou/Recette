import * as React from "react";
import {Link, IndexLink} from "react-router";
import {Col, Row, Input, Button, Content} from "dadou-react-mat";

interface ILoginProps {

}

interface ILoginState { }

class Login extends React.Component<ILoginProps, ILoginState>{
    render() {
        return (
            <div className="Login">
                <br /><br /><br />
                <Row>
                    <Col m={6} offsetM={3} l={4} offsetL={4} s={12}>
                        <div className="z-depth-2">
                            <Content>
                                <h2 className="align-center">Login</h2>
                                <br /><br />
                                <Input type="text" label="pseudo" />
                                <Input type="password" label="mot de passe" />
                                <br />
                                <div className="align-right">
                                    <Button waves="light">Se connecter</Button>
                                </div>
                            </Content>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Login;