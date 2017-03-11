import Cover from '../components/Cover';
import {connect} from 'react-redux';
import type {State,Dispatch} from '../actions/types';

module.exports.Cover = connect()(Cover);
