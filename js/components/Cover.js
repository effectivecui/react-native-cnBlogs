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
        navigator: Object,
    }

const today = Math.floor(Date.now() / 86400);

export default class Cover extends Component{
    
    props: Props
    constructor(props){
        super(props);
        this.state = {
            error: false,
            loading: true
        }
        setTimeout(()=>{
            this.props.navigator.replace({loaded: true});
        },4000);
    }

    render(){
        let loader = this.state.loading ?
        <View style={{flex: 1}}>
            <ActivityIndicator style={{alignItems: 'center',justifyContent: 'center',padding: 8,}} size="large"/>
        </View> : null;
        return this.state.error ?
        <Text>{this.state.error}</Text> :
        <Image
            source={{uri:'https://blog.mayuko.cn/api/one-api/img.php?t=' + today}}
            style={{flex: 1}}
            resizeMode={Image.resizeMode.cover}
            onError={(e) => this.setState({error: e.nativeEvent.error, loading: false})}
            onLoad={()=>this.setState({loading: false, error: false})}>
            {loader}
        </Image>;
    }
}