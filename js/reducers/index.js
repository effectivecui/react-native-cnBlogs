import {combineReducers} from 'redux';
import {blogs} from './blogs';
import {news} from './news';
module.exports.reducers = combineReducers({
  news,
  blogs
});
