//@flow

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  WebView,
  TouchableNativeFeedback,
  InteractionManager,
  PanResponder
} from 'react-native';

type Props = {
        navigator: Object,
        newsid: number,
        content: string,
        loadContent: ()=>void
    }
const js = ``;
export default class Content extends Component{
    
    props: Props
    
    _panResponder: any

    componentWillMount(){
        //console.log("haha");
        this._panResponder = PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

        onPanResponderGrant: (evt, gestureState) => {
            // The guesture has started. Show visual feedback so the user knows
            // what is happening!
            //console.log("gesture start");
            // gestureState.d{x,y} will be set to zero now
        },
        onPanResponderMove: (evt, gestureState) => {
            // The most recent move distance is gestureState.move{X,Y}
           // console.log("moveing");
            // The accumulated gesture distance since becoming responder is
            // gestureState.d{x,y}
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => {
            // The user has released all touches while this view is the
            // responder. This typically means a gesture has succeeded
            //console.log(gestureState.vx);
            let vx = gestureState.vx < 0 ? -gestureState.vx : gestureState.vx;
            let vy = gestureState.vy < 0 ? -gestureState.vy : gestureState.vy;

            if(vx > 0.3 && vy < 0.1){
                this.props.navigator.pop();
            }
        },
        onPanResponderTerminate: (evt, gestureState) => {
            // Another component has become the responder, so this gesture
            // should be cancelled
        },
        onShouldBlockNativeResponder: (evt, gestureState) => {
            // Returns whether this component should block native components from becoming the JS
            // responder. Returns true by default. Is currently only supported on android.
            return true;
        },
        });
    }

    componentDidMount(){
        if(!this.props.content){
            InteractionManager.runAfterInteractions(() => {
                this.props.loadContent()
            });
        }
    }

    render(){
        //console.log(this._panResponder)
        return (
            <View
                {...this._panResponder.panHandlers} 
                style={{flex: 1}}>
                <WebView
                    style={{flex: 1}}
                    source={{html: this.props.content}}
                />
            </View>
        );
    }
}