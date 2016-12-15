import Content from '../components/Content';
import {connect} from 'react-redux';
import type {State,Dispatch} from '../actions/types';
import {fetchNewsContent} from '../actions/news';

function mapStateToProps(state, props){
    return {
        content: state.news.entities.posts[props.newsid].content
    }
}

function mapDispatchToProps(dispatch, props){
    return {
        loadContent: ()=>dispatch(fetchNewsContent(props.newsid))
    }
}

module.exports.NewsContent = connect(mapStateToProps, mapDispatchToProps)(Content);
