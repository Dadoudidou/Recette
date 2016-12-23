import * as ObjectAssign from "object-assign";

export interface IAction<T> {
    type: string,
    payload: T,
    next?: (dispatch: Function, payload: T) => void
}

export interface IActionCreator<T> {
    type: string,
    (payload: T): IAction<T>
}

export const actionCreator = <T>(type: string, next?: (dispatch: Function, payload: T) => void): IActionCreator<T> =>
    ObjectAssign((payload: T): any => ({ type, payload, next }), { type })

export const isType = <T>(action: IAction<any>, actionCreator: IActionCreator<T>):
    action is IAction<T> => action.type === actionCreator.type 