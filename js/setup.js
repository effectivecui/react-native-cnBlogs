//@flow

import React, { Component } from 'react';
import { Provider } from 'react-redux'
import {List} from './containers/List';
import {configureStore} from './store/configureStore';

export default class setup extends Component {
  state:{
    store: ?any
  };
  constructor(props: any){
    super(props);
    this.state = {
      store: configureStore()
    }
  }
  render() {
      return (
        <Provider store={this.state.store}>
            <List />
        </Provider>
      );
  }
}
