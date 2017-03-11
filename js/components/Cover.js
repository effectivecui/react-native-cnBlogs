//@flow

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  WebView,
  Image,
  ActivityIndicator,
  ToastAndroid
} from 'react-native';
import {width} from '../api/windows';

type Props = {
        navigator: Object
    }

export default class Cover extends Component{
    
    props: Props
    constructor(props){
        super(props);
        (this: any).loadCompleted = this.loadCompleted.bind(this);
        this.state = {
            error: false,
            loading: true
        }
    }

    loadCompleted(){
        this.setState({
            loading: false,
            error: false
        });
        setTimeout(()=>{
            this.props.navigator.replace({loaded: true});
        },3000);
    }

    render(){
        let loader = this.state.loading ?
        <View style={{flex: 1}}>
            <ActivityIndicator style={{marginLeft:5}} />
        </View> : null;
        return this.state.error ?
        <Text>{this.state.error}</Text> :
        <Image
            source={{uri: 'https://blog.mayuko.cn/api/one-api/img.php'}}
            style={{flex: 1}}
            resizeMode={Image.resizeMode.cover}
            onError={(e) => this.setState({error: e.nativeEvent.error, loading: false})}
            onLoad={this.loadCompleted}>
            {loader}
        </Image>;
    }
}