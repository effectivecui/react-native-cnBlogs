//@flow

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';
import { connect } from 'react-redux';
import {fetchNewsPosts} from '../actions/news';
import {NewsRow} from '../components/NewsRow';
import type { State, Dispatch } from '../actions/types';
import type {News} from '../components/NewsRow';
import {getRecentArray} from '../selectors';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class List extends React.Component {
  props: {
    isFetching: boolean,
    didInvalidate: boolean,
    lastRequested: number,
    lastUpdated: number,
    items: Array<News>,
    onTouchRow: (rowData: Object)=>void,
    onDidMount: ()=>void
  }

  componentDidMount(){
      this.props.onDidMount();
  }
  
  render() {
    if(this.props.didInvalidate)return <Text>Loading</Text>
    return (
      <ListView
        style={{flex: 1}}
        dataSource={ds.cloneWithRows(this.props.items)}
        renderRow={(rowData)=><NewsRow rowData={rowData} onTouchRow={this.props.onTouchRow}/>}
      />
    );
  }
}

function mapStateToProps(state: State){
  return {
    ...state.news.recent,
    items: getRecentArray(state),
  }
}

function mapDispatchToProps(dispatch){
  return {
    onTouchRow: (rowData)=>{
     
    },
    onDidMount: ()=>{
      dispatch(fetchNewsPosts("recent", 1, 10));
    }
  }
}
module.exports.List = connect(mapStateToProps, mapDispatchToProps)(List);

