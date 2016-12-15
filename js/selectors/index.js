//@flow

import { createSelector } from 'reselect'

const getNewsPosts = (state)=>state.news.entities.posts;
const createArray = (posts, items) => {
                      let res = [];
                      items.forEach(function(Id){
                          res.push(posts[Id]);
                      })
                      return res;
                    };

const getRecentItems = (state)=>state.news.recent.items;
export const recent = createSelector([getNewsPosts, getRecentItems], createArray);
