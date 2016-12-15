//@flow

import type {Action,ParseObject, ThunkAction, To} from './types';
import {callApi, parser, Schema} from '../api'
import {width} from '../api/windows';
export const NEWS_FETCH_POSTS_REQUEST = "NEWS_FETCH_POSTS_REQUEST";
function requestNewsPosts(isFetching: boolean, didInvalidate: boolean): Action{
    return {
        type: NEWS_FETCH_POSTS_REQUEST,
        isFetching,
        didInvalidate,
        requestedAt: Date.now(),
    }
}

export const NEWS_FETCH_POSTS_SUCCESS = "NEWS_FETCH_POSTS_SUCCESS";
function receiveNewsPosts(posts: ParseObject,  pageindex): Action{
    return {
        type: NEWS_FETCH_POSTS_SUCCESS,
        posts,
        pageindex,
        receivedAt: Date.now()
    }
}


export const NEWS_FETCH_POSTS_FAILURE = "NEWS_FETCH_POSTS_FAILURE";
function failureNewsPosts(message: string):Action{
    return {
        type: NEWS_FETCH_POSTS_FAILURE,
        message,
        receivedAt: Date.now()
    }
}

export function fetchNewsPosts(pageindex:number, to: To = "init", pagesize:number = 10):ThunkAction{
    return function(dispatch){
        let index = pageindex;
        if(to=="init"){
            index = 1;
            dispatch(requestNewsPosts(false, true));
        }else if(to=="more"){
            index = pageindex + 1;
            dispatch(requestNewsPosts(false, false));
        }else{
            index = 1;
            dispatch(requestNewsPosts(true, false));
        }
        console.log(`pageindex${index}`);
        return callApi(`/news/recent/paged/${index}/${pagesize}`)
        .then(text=>{
            parser.parseString(text, function (err, result) {
                let json = Schema.process(result.entry, Schema.NEWS_ARRAY);
                dispatch(receiveNewsPosts(json.entities.news, index));
            });
        }).catch(err=>{
            console.log(err.message);
            dispatch(failureNewsPosts(err.message));
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
        return callApi(`/news/item/${id}`)
        .then(text=>{
            parser.parseString(text, (err, result)=>{
                //console.log(result.Content);
                dispatch(receiveNewsCo(NEWS_FETCH_CONTENT_SUCCESS, {
                    //处理图片显示比例的问题，只设置width而不设置height可以等比缩放
                    //处理img标签中src地址不正确的问题
                    content: result.Content.replace(/src=\"\/\//g, `width="${width-30}" height="" src="http://`),
                    id
                }))
            })
        })
        .catch(err=>{
            dispatch(failureNewsCo(NEWS_FETCH_CONTENT_FAILURE, err.message))
        })
    }
}
