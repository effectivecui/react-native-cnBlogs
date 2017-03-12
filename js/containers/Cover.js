//@flow
import Cover from '../components/Cover';
import {connect} from 'react-redux';
import type {State,Dispatch} from '../actions/types';
import {setCover} from '../actions/cover';
const mapStateToPops = (state: State, props) => {
    //console.log(state.cover);
    return {
        lastUpdated: state.cover.receivedAt,
        imgUri: state.cover.imgUri,
    }
}

const mapDispatchToProps = (dispatch: Dispatch, props) => {
    return {
        load: (imgUri)=>{
            dispatch(setCover(imgUri));
        }
    }
}

module.exports.Cover = connect(mapStateToPops, mapDispatchToProps)(Cover);
