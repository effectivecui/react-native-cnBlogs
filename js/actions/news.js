//@flow

import type {Action, Target, ParseObject, ThunkAction} from './types';
import {callApi, parser, Schema} from '../api'

export const NEWS_FETCH_POSTS_REQUEST = "NEWS_FETCH_POSTS_REQUEST";
function requestNewsPosts(target:Target): Action{
    return {
        type: NEWS_FETCH_POSTS_REQUEST,
        target,
        requestedAt: Date.now(),
    }
}

export const NEWS_FETCH_POSTS_SUCCESS = "NEWS_FETCH_POSTS_SUCCESS";
function receiveNewsPosts(target:Target, posts: ParseObject): Action{
    return {
        type: NEWS_FETCH_POSTS_SUCCESS,
        target,
        posts,
        receivedAt: Date.now()
    }
}

export const NEWS_FETCH_POSTS_FAILURE = "NEWS_FETCH_POSTS_FAILURE";
function failureNewsPosts(target:Target, message: string):Action{
    return {
        type: NEWS_FETCH_POSTS_FAILURE,
        target,
        message,
        receivedAt: Date.now()
    }
}

export function fetchNewsPosts(target: Target, pageindex:number, pagesize:number = 20):ThunkAction{
    return function(dispatch){
        dispatch(requestNewsPosts(target));
        return callApi("/news/" + target + "/paged/" + pageindex + "/" + pagesize)
        .then(text=>{
            parser.parseString(text, function (err, result) {
                let json = Schema.process(result.entry, Schema.NEWS_ARRAY);
                dispatch(receiveNewsPosts(target, json.entities.news));
            });
        }).catch(err=>{
            console.log(err.message);
            dispatch(failureNewsPosts(target, err.message));
        })
    }
}

export const NEWS_FETCH_CONTENT_REQUEST = "NEWS_FETCH_CONTENT_REQUEST";
export const NEWS_FETCH_COMMENTS_REQUEST = "NEWS_FETCH_COMMENTS_REQUEST";
function requestNewsCo(type: string):Action{
    return {
        type,
        requestedAt: Date.now()
    }
}

export const NEWS_FETCH_COMMENTS_SUCCESS = "NEWS_FETCH_COMMENTS_SUCCESS";
export const NEWS_FETCH_CONTENT_SUCCESS = "NEWS_FETCH_CONTENT_SUCCESS";
function receiveNewsCo(type: string, posts: ParseObject): Action{
    return {
        type,
        posts,
        receivedAt: Date.now()
    }
}

export const NEWS_FETCH_COMMENTS_FAILURE = "NEWS_FETCH_COMMENTS_FAILURE";
export const NEWS_FETCH_CONTENT_FAILURE = "NEWS_FETCH_CONTENT_FAILURE";
function failureNewsCo(type: string, message: string): Action{
    return {
        type,
        message,
        receivedAt: Date.now()
    }
}
export function fetchNewsContent(id: number): ThunkAction{
    return function(dispatch){
        //dispatch(requestNewsCo(NEWS_FETCH_CONTENT_REQUEST));
        return callApi("/news/item/" + id)
        .then(text=>{
            parser.parseString(text, (err, result)=>{
                //console.log(result.Content);
                dispatch(receiveNewsCo(NEWS_FETCH_CONTENT_SUCCESS, {content: result.Content, id}))
            })
        })
        .catch(err=>{
            dispatch(failureNewsCo(NEWS_FETCH_CONTENT_FAILURE, err.message))
        })
    }
}