import * as React from "react";

interface IAboutProps {
    text?: string,
    onChangeText?: (string) => void
}

interface IAboutState { }

class About extends React.Component<IAboutProps, IAboutState>{

    constructor(props) {
        super(props);
    }
    
    render() {
        let $this = this;
        return (
            <div>
                <h2>About View with Redux</h2>
                <ul>
                    <li><button onClick={() => { $this.props.onChangeText("essai 01") } }>Essai 01</button></li>
                    <li><button onClick={() => { $this.props.onChangeText("essai 02") } }>Essai 02</button></li>
                    <li><button onClick={() => { $this.props.onChangeText("essai 03") } }>Essai 03</button></li>
                </ul>
                <p>{this.props.text}</p>
            </div>
        );
    }
}

// *********************
// Connection
// *********************
import {connect} from "react-redux";
import {IAboutReducer, actions} from "./modules/about";

const mapStateToProps = (state: IAboutReducer): IAboutProps => {
    return {
        text: state.About.text
    };
}

const mapDispatchToProps = (dispatch): IAboutProps => {
    return {
        onChangeText: (text) => {
            dispatch(actions.changeText(text));
        }
    };
}

//export default About;
export default connect(mapStateToProps, mapDispatchToProps)(About);