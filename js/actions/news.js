//@flow

import type {Action,ParseObject, ThunkAction, To} from './types';
import {makeActionCreator, getId} from './types';
import {callApi, parser, Schema} from '../api'
import {width} from '../api/windows';
export const NEWS_FETCH_POSTS_REQUEST = getId();
const requestNewsPosts = makeActionCreator(NEWS_FETCH_POSTS_REQUEST, "isFetching", "didInvalidate", "requestedAt");

export const NEWS_FETCH_POSTS_SUCCESS = getId();
const receiveNewsPosts = makeActionCreator(NEWS_FETCH_POSTS_SUCCESS, "posts", "pageindex", "receivedAt");

export const NEWS_FETCH_POSTS_FAILURE = getId();
const failureNewsPosts = makeActionCreator(NEWS_FETCH_POSTS_FAILURE, "message", "receivedAt");

export function newsProofreadPosts(pageindex: number, topid: string = "", pagesize: number = 10):ThunkAction{
    return function(dispatch){
        dispatch(requestNewsPosts(false, topid=="" ? true : false));
        return callApi(`/news/recent/paged/${pageindex}/${pagesize}`)
        .then(text=>{
            parser.parseString(text, (err, result)=>{
                let json = Schema.process(result.entry, Schema.NEWS_ARRAY);
                let posts = json.entities.news;
                dispatch(receiveNewsPosts(posts, pageindex));
                
                //app不是第一次加载，但是本地保存的recent.items和服务器的连接不起来，因此要校对
                if(topid!="" && posts[topid]==undefined && pageindex * pagesize < 30){
                    
                    dispatch(newsProofreadPosts(pageindex + 1, topid));
                }
            })
        })
    }
}
export function fetchNewsPosts(pageindex:number, to: To, pagesize:number = 10):ThunkAction{
    return function(dispatch){
        let index;
        if(to=="more"){
            index = pageindex + 1;//触发加载更多
            dispatch(requestNewsPosts(false, false));
        }else{
            index = 1;//触发下拉更新
            dispatch(requestNewsPosts(true, false));
        }
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

export const NEWS_FETCH_CONTENT_REQUEST = getId();
export const NEWS_FETCH_COMMENTS_REQUEST = getId();
const requestNewsContent = makeActionCreator(NEWS_FETCH_CONTENT_REQUEST, "requestedAt");
const requestNewsComment = makeActionCreator(NEWS_FETCH_COMMENTS_REQUEST, "requestedAt");
export const NEWS_FETCH_COMMENTS_SUCCESS = getId();
export const NEWS_FETCH_CONTENT_SUCCESS = getId();
const receiveNewsContent = makeActionCreator(NEWS_FETCH_CONTENT_SUCCESS, "posts", "receivedAt");
const receiveNewsComment = makeActionCreator(NEWS_FETCH_COMMENTS_SUCCESS, "posts", "receivedAt");
export const NEWS_FETCH_COMMENTS_FAILURE = getId();
export const NEWS_FETCH_CONTENT_FAILURE = getId();
const failureNewsContent = makeActionCreator(NEWS_FETCH_CONTENT_FAILURE, "message", "receivedAt");
const failureNewsComment = makeActionCreator(NEWS_FETCH_COMMENTS_FAILURE, "message", "receivedAt");

export function fetchNewsContent(id: number): ThunkAction{
    return function(dispatch){
        //dispatch(requestNewsCo(NEWS_FETCH_CONTENT_REQUEST));
        return callApi(`/news/item/${id}`)
        .then(text=>{
            parser.parseString(text, (err, result)=>{
                //console.log(result.Content);
                dispatch(receiveNewsContent({
                    //处理图片显示比例的问题，只设置width而不设置height可以等比缩放
                    //处理img标签中src地址不正确的问题
                    content: result.Content.replace(/src=\"\/\//g, `width="${width-30}" height="" src="http://`),
                    id
                }));
            })
        })
        .catch(err=>{
            dispatch(failureNewsContent(err.message));
        })
    }
}