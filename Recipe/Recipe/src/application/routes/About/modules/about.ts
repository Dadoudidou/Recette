import {actionCreator, IAction, isType} from "./../../../../lib/store/actions";
import * as Immutable from "immutable";

// **************
// ACTIONS
// **************

export const actions = {
    changeText: actionCreator<string>("CHANGE TEXT")
};

// **************
// REDUCER
// **************
export interface IAboutState {
    text?: string
}
const initialState: IAboutState = {
    text: "Texte Initial"
};
export interface IAboutReducer {
    About: IAboutState
}
export const AboutReducer = (state: IAboutState = initialState, action: IAction<any>): IAboutState => {

    if (isType(action, actions.changeText)) {
        return Immutable.Map(state as any).mergeDeep(<IAboutState>{
            text: action.payload
        } as any).toJS();
    }

    return state;
};