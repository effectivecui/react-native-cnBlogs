//@flow
import {NEWS_FETCH_POSTS_FAILURE,NEWS_FETCH_POSTS_SUCCESS,NEWS_FETCH_POSTS_REQUEST} from './news';
export type ParseObject = Object;
export type To = | "more" | "fresh";

export type Action = 
| {type: string, requestedAt: number}
| {type: string, posts: ParseObject, receivedAt: number}
| {type: string, message: string, receivedAt: number}
;

export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type getState = () => Object;
export type State = Object;
export type ThunkAction = (dispatch: Dispatch, getState: getState) => any;
export type PromiseAction = Promise<Action>;

export const makeActionCreator = (type, ...argNames) => {
  return function(...args) {
    let action = { type }
    argNames.forEach((arg, index) => {
        if(argNames[index] == "requestedAt" || argNames[index] == "receivedAt")
            action[argNames[index]] = Date.now();
        else
            action[argNames[index]] = args[index]
    })
    
    return action
  }
}

let type_id = 0;
export const getId = () => {
    return type_id++;
}