import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Navigator,
  BackAndroid,
  Platform,
  StatusBar
} from 'react-native';
import {connect} from 'react-redux';
import {List} from './containers/List';
import {NewsContent} from './containers/NewsContent'
import {setLocal, getLocal, CN_BLOGS_STATE} from './actions/local';

class Navigation extends Component{
  
    constructor(props) {
        super(props);
        this.renderScene = this.renderScene.bind(this);
        this.handleBackPressed = this.handleBackPressed.bind(this);
    }

    componentDidMount() {
        if(Platform.OS === 'android') {
            this.props.dispatch(getLocal(CN_BLOGS_STATE));
            BackAndroid.addEventListener('hardwareBackPress', this.handleBackPressed);
        }
    }

    componentWillUnmount() {
        if(Platform.OS === 'android') {
            this.props.dispatch(setLocal(CN_BLOGS_STATE, this.props.state));
            BackAndroid.removeEventListener('hardwareBackPress', this.handleBackPressed);
        }
    }
    
    handleBackPressed(){
        let navigator = this.refs.navigator;
        if(navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
            return true;
        }
        return false;
    }

    render(){
        return (
            <Navigator
                ref="navigator"
                configureScene={(route) => {
                    return Navigator.SceneConfigs.FloatFromLeft;
                }}
                initialRoute={{}}
                renderScene={this.renderScene}
            />
        );
    }

    renderScene(route, navigator){

        if(route.newsid){
            return (
                <View style={{flex: 1}}>
                    <StatusBar hidden={true} />
                    <NewsContent newsid={route.newsid} navigator={navigator}/>
                </View>
            );
        }
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    translucent={true}
                    hidden={true}
                    animated={true}      
                />
                <List style={{flex: 1}} navigator={navigator}/>  
            </View>
        );
    }
}
function mapStateToProps(state){
    return {
        state
    };
}
export default connect(mapStateToProps)(Navigation);
