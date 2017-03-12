import {combineReducers} from 'redux';
import {blogs} from './blogs';
import {news} from './news';
import {cover} from './cover';
module.exports.reducers = combineReducers({
  news,
  blogs,
  cover,
});
