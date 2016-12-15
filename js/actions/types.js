//@flow
import {NEWS_FETCH_POSTS_FAILURE,NEWS_FETCH_POSTS_SUCCESS,NEWS_FETCH_POSTS_REQUEST} from './news';
export type ParseObject = Object;
export type To = | "more" | "fresh" | "init";

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