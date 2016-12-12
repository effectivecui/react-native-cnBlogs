
import { normalize, Schema as NSchema, arrayOf } from 'normalizr';
import xml2js from 'xml2js';
/*
For example:
const article = new Schema('articles');
const user = new Schema('users');
article.define({
  author: user,
  contributors: arrayOf(user)
});*/
const news = new NSchema("news");
export const BASE_URL = "http://wcf.open.cnblogs.com";
export const Schema = {
    process: normalize,
    NEWS: news,
    NEWS_ARRAY: arrayOf(news),
};
export const parser = new xml2js.Parser({
                ignoreAttrs: true,
                explicitRoot: false,
                explicitArray: false,
                valueProcessors: [ xml2js.processors.parseNumbers ]
            });
export const callApi = (endpoint)=>{
    return fetch(BASE_URL + endpoint)
        .then(response=>response.text());
}