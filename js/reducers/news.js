//@flow
import { combineReducers } from 'redux';
import type {ParseObject, Target} from '../actions/types';
import {NEWS_FETCH_POSTS_FAILURE,NEWS_FETCH_POSTS_REQUEST,NEWS_FETCH_POSTS_SUCCESS,
    NEWS_FETCH_CONTENT_FAILURE,NEWS_FETCH_CONTENT_REQUEST,NEWS_FETCH_CONTENT_SUCCESS} from '../actions/news';
type State = ParseObject;
type Action = {type: string, target: Target, requestedAt: number,
     receivedAt: number, message: string,posts: ParseObject};

function posts(state: State = {}, action: Action): State{
    if(action.type==NEWS_FETCH_POSTS_SUCCESS){
        return Object.assign({}, action.posts, state);
    }else if(action.type==NEWS_FETCH_CONTENT_SUCCESS){
        return {
            ...state,
            [action.posts.id]:{
                ...state[action.posts.id],
                content: action.posts.content
            }
        }
    }
    return state;
}

function recommend(state: State = {
            isFetching: false,
            didInvalidate: true,
            lastRequested: null,
            lastUpdated: null,
            items: []}, action: Action): State{
    if(action.type==NEWS_FETCH_POSTS_SUCCESS && action.target=="recommend"){
        let items = [];
        for(let Id in action.posts)items.push(Id);
        return {
            ...state,
            isFetching: false,
            didInvalidate: false,
            lastUpdated: action.receivedAt,
            items: Object.assign({}, state.items, items)
        }
    }else if(action.type==NEWS_FETCH_POSTS_REQUEST && action.target=="recommend"){
        return {
            ...state,
            isFetching: true,
            didInvalidate: true,
            lastRequested: action.requestedAt,
        }
    }
    return state;
}

function recent(state: State = {
            isFetching: false,
            didInvalidate: true,
            lastRequested: null,
            lastUpdated: null,
            items: []}, action: Action){
    if(action.type==NEWS_FETCH_POSTS_SUCCESS && action.target=="recent"){
        let items = [];
        for(let Id in action.posts)items.push(Id);
        let itemsJson = JSON.stringify(items)
        state.items.forEach(function(Id){
            if(!itemsJson[Id]){
                items.push(Id);
            }
        })
        //console.log("update state.....................................................................");
        //console.log(items);
        return {
            ...state,
            isFetching: false,
            didInvalidate: false,
            lastUpdated: action.receivedAt,
            items
        };
    }else if(action.type==NEWS_FETCH_POSTS_REQUEST && action.target=="recent"){
        return {
            ...state,
            isFetching: true,
            didInvalidate: true,
            lastRequested: action.requestedAt
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
    recommend,
    recent
});