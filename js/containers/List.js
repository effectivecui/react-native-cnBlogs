//@flow

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  RefreshControl,
  Dimensions,
  TouchableNativeFeedback
} from 'react-native';
import { connect } from 'react-redux';
import {fetchNewsPosts, fetchNewsContent} from '../actions/news';
import {Row} from '../components/Row';
import type { State, Dispatch } from '../actions/types';
import type {News} from '../components/Row';
import {recent} from '../selectors';
import window from '../api/windows';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 65;
type Props = {
    isFetching: boolean,
    didInvalidate: boolean,
    lastRequested: number,
    lastUpdated: number,
    items: Array<News>,
    pageindex: number,
    loadRowContent: (id: number)=>void,
    fresh: ()=>void,
    more: (pageindex: number)=>void,
    navigator: Object
  };
class List extends React.Component {
  
  props: Props
  constructor(props){
    super(props);
    (this: any).renderHeader = this.renderHeader.bind(this);
    (this: any).renderFooter = this.renderFooter.bind(this);
  }

  renderHeader(){
      return (
        <View style={styles.header}>
          <Text style={styles.headertext}>新闻列表</Text>
        </View>
      );
  }
  renderFooter(){
      return (
         <TouchableNativeFeedback
            background={TouchableNativeFeedback.SelectableBackground()}
            onPress={()=>this.props.more(this.props.pageindex-1)}>
            <View style={styles.footer}>
              <Text style={styles.footertext} >加载中...</Text>
            </View>
          </TouchableNativeFeedback>
      );
  }
  render() {
    /*console.log("rendering");
    console.log(this.props.didInvalidate);
    let temp = [];
    this.props.items.forEach((value)=>{
      temp.push(value.id);
    })
    console.log(temp);*/
    if(this.props.didInvalidate)return <Text>Loading</Text>
    return (
      <ListView
       enableEmptySections={true}
       onEndReached={()=>this.props.more(this.props.pageindex)}
       refreshControl={
                  <RefreshControl
                      refreshing={this.props.isFetching}
                      onRefresh={this.props.fresh}
                  />
              }
        style={{flex: 1}}
        dataSource={ds.cloneWithRows(this.props.items)}
        renderFooter={this.renderFooter}
        renderHeader={this.renderHeader}
        renderRow={(rowData)=><Row rowData={rowData} onTouchRow={(rowData: News)=>{
            this.props.navigator.push({newsid: rowData.id});
        }}/>}
      />
    );
  }
}
const styles = StyleSheet.create({
  header: {
    height: 65, 
    alignItems: "center", 
    justifyContent: "center", 
    backgroundColor: `#5C5C5C`
  },
  headertext: {
    fontSize: 20,
    color: 'white',
    marginHorizontal: 20, 
    marginVertical: 5
  },
  footer: {
    height: 40, 
    alignItems: "center", 
    justifyContent: "center", 
    backgroundColor: `#5C5C5C`
  },
  footertext: {
    color: 'white',
    marginHorizontal: 20, 
    marginVertical: 5
  }
})
function mapStateToProps(state: State, props: Props){
  return {
    ...state.news.recent,
    items: recent(state),
  }
}

function mapDispatchToProps(dispatch: Dispatch, props: Props){
  return {
    loadRowContent: (id: number)=>{
      dispatch(fetchNewsContent(id));
    },
    fresh: ()=>{
      dispatch(fetchNewsPosts(1, "fresh"));
    },
    more: (pageindex)=>{
      dispatch(fetchNewsPosts(pageindex, "more"));
    }
  }
}
module.exports.List = connect(mapStateToProps, mapDispatchToProps)(List);

