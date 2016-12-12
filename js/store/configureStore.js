/**
* @flow
*/

import {applyMiddleware, createStore} from 'redux';
import {reducers} from '../reducers';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

const logger = createLogger({
  duration: true,
  collapsed: true
});

const store = createStore(
  reducers,
  applyMiddleware(thunk, logger)
);

function configureStore() {
  return store;
}

module.exports.configureStore = configureStore;
