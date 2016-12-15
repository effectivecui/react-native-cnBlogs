//@flow

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback
} from 'react-native';
export type News = {id: number,title: string,summary: string,sourcename: string,
    content: string,published: string,pdated: string,views: number,comments: number,commentsitem: Array<number>};

export class Row extends React.Component {
  props:{
      rowData: News,
      onTouchRow: (rowData: News)=>void,
  }

  render() {
     return (
         <TouchableNativeFeedback
            background={TouchableNativeFeedback.SelectableBackground()}
            onPress={()=>this.props.onTouchRow(this.props.rowData)}>
                <View style={styles.row}>
                    <Text style={{fontSize: 18}}>{this.props.rowData.title + '\n'}</Text>
                    <Text style={{fontSize: 14}}>{this.props.rowData.summary}</Text>
                </View>
         </TouchableNativeFeedback>
     );
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1, 
    marginVertical: 5,
    paddingHorizontal: 15,
    paddingVertical: 5
  }
})