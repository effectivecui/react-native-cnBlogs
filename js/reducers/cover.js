import {COVER_LOCAL_RECEIVE, COVER_LOCAL_REQUEST} from '../actions/cover';
import type {State, Action} from '../actions/type';

export const cover = (state: State = {
    receivedAt: 87400,
    imgUri: 'https://blog.mayuko.cn/api/one-api/img.php',
}, action: Action): State =>{
    if(COVER_LOCAL_RECEIVE == action.type){
        return {
            receivedAt: action.receivedAt,
            imgUri: action.imgUri
        }   
    }
    
    return state;
}