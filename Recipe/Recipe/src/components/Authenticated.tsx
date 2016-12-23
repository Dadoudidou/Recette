import * as React from "react";
import { connect } from "react-redux";


export function requireAuthentication(Component: React.ComponentClass<any>) {

    interface IAuthenticatedComponentProps {
        token?: string
        userName?: string
        isAuthenticated?: boolean
        dispatch?: (any) => void
    }

    class AuthenticatedComponent extends React.Component<IAuthenticatedComponentProps, any>{
        componentWillMount() {
            this.checkAuth();
        }

        componentWillReceiveProps(nextProps: IAuthenticatedComponentProps) {
            this.checkAuth();
        }

        checkAuth() {
            /*if (!this.props.isAuthenticated) {
                let redirectAfterLogin = this.props.location.pathname;
                this.props.dispatch(pushState(null, `/login?next=${redirectAfterLogin}`));
            }*/
        }

        render() {
            return (
                <div>
                    {(this.props.isAuthenticated === true) ?
                        React.createElement(Component, this.props) : null}
                </div>
            );
        }
    }

    const mapStateToProps = (state) : IAuthenticatedComponentProps => ({
        /*token: state.auth.token,
        userName: state.auth.userName,
        isAuthenticated: state.auth.isAuthenticated*/
        token: "123456789",
        userName: "Dadoudidou",
        isAuthenticated: true
    });

    return connect(mapStateToProps)(AuthenticatedComponent);
    
}