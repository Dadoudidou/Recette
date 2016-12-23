import {combineReducers} from "redux";
import {IAction} from "./actions";
import * as ObjectAssign from "object-assign";



// **********************
// LastAction Reducer
// **********************
const LastActionReducer = (state = null, action: IAction<any>): IAction<any> => {
    return action;
}
export interface ILastActionState {
    lastAction: IAction<any>
}

// **********************
// Root Reducer
// **********************
export interface IState extends ILastActionState { }

export const makeRootReducer = (asyncReducers?) => {
    return combineReducers(ObjectAssign({
        lastAction: LastActionReducer
    }, asyncReducers));
};