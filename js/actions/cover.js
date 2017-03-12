import {makeActionCreator,getId} from './types';
import {AsyncStorage} from 'react-native';

export const COVER_LOCAL_RECEIVE = getId();
const coverReceive = (imgUri, receivedAt) => {
    return {
        type: COVER_LOCAL_RECEIVE,
        receivedAt: receivedAt,
        imgUri,
    }
}

export const setCover = (imgUri) => {
    return function(dispatch){
        
        return AsyncStorage.setItem("cover_local", JSON.stringify({
            receivedAt: Date.now(),
            imgUri: imgUri,
        }));
    }
}

export const getCover = () => {
    return function(dispatch){
        return AsyncStorage.getItem("cover_local",(err, result)=>{
            console.log("result" + result);
            if(result!=undefined){
                result = JSON.parse(result);
                dispatch(coverReceive(result.imgUri, result.receivedAt));
            }
        })
    }
}