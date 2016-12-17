import {AsyncStorage} from 'react-native';
import {newsProofreadPosts} from './news';
export const CN_BLOGS_STATE = "CN_BLOGS_STATE";
export const LOCAL_REQUEST = "LOCAL_REQUEST";
function requestLocal(){
    return {
        type: LOCAL_REQUEST,
        savedAt: Date.now()
    }
}
export const LOCAL_RECEIVE = "LOCAL_RECEIVE";
function receiveLocal(state){
    return {
        type: LOCAL_RECEIVE,
        state
    }
}
export function setLocal(key: string, value: Object){
    return function(dispatch){
        dispatch(requestLocal());
        return AsyncStorage.setItem(key: string, JSON.stringify(value));
    }
}
export function getLocal(key: string){
    return function(dispatch){
        dispatch(requestLocal());
        return AsyncStorage.getItem(key: string, (err, result)=>{
            if(result!=undefined){
                result = JSON.parse(result);
                dispatch(receiveLocal(result));
            }
            let topid = result&&result.news&&result.news.recent&&result.news.recent.items[0] ?
            result.news.recent.items[0] : ""; //判断是否是初次启动app
            dispatch(newsProofreadPosts(1, topid));
        })
    }
}