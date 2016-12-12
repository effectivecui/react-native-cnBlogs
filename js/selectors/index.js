//@flow

import { createSelector } from 'reselect'

const getNewsPosts = (state)=>state.news.entities.posts;
const getRecentItems = (state)=>state.news.recent.items;
export const getRecentArray = createSelector(
  [getNewsPosts, getRecentItems],
  (posts, items) => {
    let res = [];
    items.forEach(function(Id){
        res.push(posts[Id]);
    })
    return res;
  }
)