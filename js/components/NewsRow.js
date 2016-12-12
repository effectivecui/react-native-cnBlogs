//@flow

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
export type News = {id: number,title: string,summary: string,sourcename: string,
    content: string,published: string,pdated: string,views: number,comments: number,commentsitem: Array<number>};

export class NewsRow extends React.Component {
  props:{
      rowData: News,
      onTouchRow: (rowData: Object)=>void,
  }

  render() {
     return (
         <View style={{flex: 1}}>
            <Text>{this.props.rowData.title + '\n' + this.props.rowData.summary + '\n' + '\n'}</Text>
         </View>
     );
  }
}