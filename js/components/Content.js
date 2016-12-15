//@flow

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  WebView,
  TouchableNativeFeedback,
  InteractionManager
} from 'react-native';

type Props = {
        newsid: number,
        content: string,
        loadContent: ()=>void
    }
const js = ``;
export default class Content extends Component{
    
    props: Props

    componentDidMount(){
        if(!this.props.content){
            InteractionManager.runAfterInteractions(() => {
                this.props.loadContent()
            });
        }
    }

    render(){
        return (
            <WebView
                style={{flex: 1}}
                source={{html: this.props.content}}
            />
        );
    }
}