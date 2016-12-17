//@flow
import { combineReducers } from 'redux';
import {cancatArray} from '../store/util';
import type {ParseObject} from '../actions/types';
import {LOCAL_RECEIVE, LOCAL_REQUEST} from '../actions/local';
import {NEWS_FETCH_POSTS_FAILURE,NEWS_FETCH_POSTS_REQUEST,NEWS_FETCH_POSTS_SUCCESS,
    NEWS_FETCH_CONTENT_FAILURE,NEWS_FETCH_CONTENT_REQUEST,NEWS_FETCH_CONTENT_SUCCESS} from '../actions/news';
type State = ParseObject;
type Action = {type: string, requestedAt: number, state: Object,
     receivedAt: number, message: string,posts: ParseObject,pageindex: number,isFetching:boolean,didInvalidate:boolean};

function posts(state: State = {}, action: Action): State{
    if(action.type==NEWS_FETCH_POSTS_SUCCESS){
        return Object.assign({}, state, action.posts);
    }else if(action.type==NEWS_FETCH_CONTENT_SUCCESS){
        return {
            ...state,
            [action.posts.id]:{
                ...state[action.posts.id],
                content: action.posts.content
            }
        }
    }else if(action.type==LOCAL_RECEIVE){
        return {
            ...action.state.news.entities.posts,
            ...state
        }
    }
    return state;
}

function recent(state: State = {
            isFetching: false,
            didInvalidate: true,
            lastRequested: null,
            pageindex: 1,
            lastUpdated: null,
            items: []}, action: Action){
    if(action.type==NEWS_FETCH_POSTS_SUCCESS){
        let temp = [];
        for(let Id in action.posts){
            temp.push(Id);
        }
        return {
            ...state,
            isFetching: false,
            didInvalidate: false,
            pageindex: action.pageindex,
            lastUpdated: action.receivedAt,
            items: cancatArray(state.items, temp)
        };
    }else if(action.type==NEWS_FETCH_POSTS_REQUEST){
        return {
            ...state,
            isFetching: action.isFetching,
            didInvalidate: action.didInvalidate,
            lastRequested: action.requestedAt
        }
    }else if(action.type==LOCAL_RECEIVE){
        let temp = action.state.news.recent;
        return {
            ...state,
            didInvalidate: false,
            pageindex: temp.pageindex,
            items: cancatArray(state.items, temp.items)
        }
    }
    return state;
}

function comments(state: State = {}, action: Action): State{
    return state;
}

function follows(state: State = {}, action: Action): State{
    return state;
}

function followTypes(state: State = {}, action: Action): State{
    return state;
}

const entities = combineReducers({
    posts,
    comments,
    follows,
    followTypes
});

export const news = combineReducers({
    entities,
    recent
});