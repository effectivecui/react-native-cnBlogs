//@flow
import {NEWS_FETCH_POSTS_FAILURE,NEWS_FETCH_POSTS_SUCCESS,NEWS_FETCH_POSTS_REQUEST} from './news';
export type ParseObject = Object;
export type Target = "recommend" | "recent";


export const NEWS_FETCH_CONTENT_REQUEST = "NEWS_FETCH_CONTENT_REQUEST";
export const NEWS_FETCH_CONTENT_SUCCESS = "NEWS_FETCH_CONTENT_SUCCESS";
export const NEWS_FETCH_CONTENT_FAILURE = "NEWS_FETCH_CONTENT_FAILURE";
export const NEWS_FETCH_COMMENTS_REQUEST = "NEWS_FETCH_COMMENTS_REQUEST";
export const NEWS_FETCH_COMMENTS_SUCCESS = "NEWS_FETCH_COMMENTS_SUCCESS";
export const NEWS_FETCH_COMMENTS_FAILURE = "NEWS_FETCH_COMMENTS_FAILURE";

export type Action = {type: string, target: Target, requestedAt: number}
| {type: string, target: Target, posts: ParseObject, receivedAt: number}
| {type: string, target: Target, message: string, receivedAt: number}
| {type: string, requestedAt: number}
| {type: string, posts: ParseObject, receivedAt: number}
| {type: string, message: string, receivedAt: number}

export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type getState = () => Object;
export type State = Object;
export type ThunkAction = (dispatch: Dispatch, getState: getState) => any;
export type PromiseAction = Promise<Action>;