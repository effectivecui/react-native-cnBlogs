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
        load: ()=>void,
        lastUpdated: string,
        imgUri: string,
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
    getImgUri(){
        //console.log("lastUpdate" + this.props.lastUpdated);
        //console.log("stamp" + Math.floor(Date.now() / 86400));
        let today = Math.floor(Date.now() / 86400);
        let updateDay = Math.floor(this.props.lastUpdated / 86400);
        console.log("today" + today);
        console.log("updateDay" + updateDay);
        if(today > updateDay){
            let imgUri = 'https://blog.mayuko.cn/api/one-api/img.php?t=' + today;
            setTimeout(()=>{
                this.props.load(imgUri);
            },1);
            console.log("imgUri" + imgUri);
            return imgUri;
        }
        
        console.log("imgUri" + this.props.imgUri);
        return this.props.imgUri;
    }
    render(){
        let loader = this.state.loading ?
        <View style={{flex: 1}}>
            <ActivityIndicator style={{marginLeft:5}} />
        </View> : null;
        return this.state.error ?
        <Text>{this.state.error}</Text> :
        <Image
            source={{uri: this.getImgUri()}}
            style={{flex: 1}}
            resizeMode={Image.resizeMode.cover}
            onError={(e) => this.setState({error: e.nativeEvent.error, loading: false})}
            onLoad={this.loadCompleted}>
            {loader}
        </Image>;
    }
}