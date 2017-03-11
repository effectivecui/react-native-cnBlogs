# android-react-native-cnblogs
博客园安卓react-native，没有苹果电脑手机没办法只能做安卓端,[下载](https://github.com/effectivecui/react-native-cnBlogs/blob/master/apk/app-release.apk)

博客园官方苹果手机客户端：http://app.cnblogs.com/

博客园民间安卓手机客户端：http://avenwu.net/cnblogs/

封面借用了One 一个的每日一图，链接：https://blog.mayuko.cn/api/one-api/img.php
#博客园官方提供的接口地址：
博客：http://wcf.open.cnblogs.com/blog/help

新闻：http://wcf.open.cnblogs.com/news/help


根据以上接口，我做了如下分析，比写了一下store的结构

##新闻
####分页获取推荐新闻列表
####分页获取最新新闻列表
####获取新闻内容
####获取新闻评论
-----------------------
##博客
####48小时阅读排行
####10天内推荐排行
####分页获取首页文章列表
####获取文章内容
####获取文章评论
----------------------
##博主
####分页获取推荐博客列表
####根据作者名搜索博主
####分页获取个人博客文章列表
----------------------
##store结构
`
{

  news: {
  
    entities:{
        posts:{
            1: {
                id: 1,
                title: hahah,
                summary: hdhdhd,
                sourcename: www.micsay.com,
                content: xxx,
                published: 2016-11-18T12:07:05+08:00,
                updated: 2016-11-25T02:30:22Z,
                views: 5555,
                comments: 23,
                commentsitem: [],
            },
        },
        comments: {
            35535: {
                id: 35535,
                published: 2016-,
                updated: 2016-,
                author: {
                   name: micsay,
                   uri: http://home.cnblogs.com/u/30823/,
                },
                content: xxxxx,
            }
        }
        follows: {
            1: {
                followTypesId: 1,
                postsId: 1,
                followtime: 2016-11-25 10:30:59,
            },
            2: {
                followTypesId: 1,
                postsId: 2,
                followtime: 2016-11-25 10:30:59,
            },
        },
        followTypes: {
            statement0,
            statement1,
            statement2,
        },
    },
    recommend:{
        isFetching: false,
        didInvalidate: false,
        lastRequested: 14326658665,
        lastUpdated: 2016-11-25 10:30:59,
        items: [],
    },
    recent: {
        isFetching: false,
        didInvalidate: false,
        lastRequested: 143552255,
        lastUpdated: 2016-11-25 10:30:59,
        items: [],
    },
  },
  
  bloggers:{
  
     entities:{
         posts: {
            blogApp: {
                blogapp: micsay,
                title: micsay,
                updated: 2016-11-25 10:30:59,
                avatar: http://pic.cnblogs.com/face/u281816.png?id=28134852，
                postcount： 60,
                blogsitem: [],
            },
         },
         follows: {
            blogApp: {
               followTypesId: 0,
               blogapp: micsay,
               followTime: 2016-11-25 10:30:00,
            },
         },
         followTypes: {
            statement0,
            statement1,
            statement2,
         },
     },
     recommend: {
         isFetching: false,
         didInvalidate: false,
         lastUpdated: 2016-11-05 10:30:00,
         items: [],
     },
     search: {
         key: micsay,
         items: [],
     }
  },
  blog: {
     
     entities: {
         posts: {
             65535: {
                 id: 65535,
                 title: xxx,
                 summary: xxxxx,
                 content: xxx,
                 published: 2016+,
                 updated: 2016-,
                 author:{
                     name: xxx,
                     uri: http://www.cnblogs.com/yuanguobin/,
                     avatar:http://xxxx,
                 },
                 views: 5555,
                 comments: 2222,
                 commentsitems: [],
             }
         },
         comments: {
             123: {
                id: 123,
                published: 2016-,
                updated: 2016-,
                author: {
                   name: micsay,
                   uri: http://home.cnblogs.com/u/30823/,
                },
                content: xxxxx,
             },
         },
         follows: {
             65535: {
                followTypesId: 1,
                postId: 123,
                followtime: 2016-xxx,
             }
         },
         followTypes: {
             statement0,
             statement1,
             statement2,
         }
     },
     recommend48h: {
         isFetching: false,
         didInvalidate: false,
         lastupdated: 2016-11-25 xxx,
         itmes: [],
     },
     recommend10d: {
         isFetching: false,
         didInvalidate: false,
         lastupdated: 2016-11-25 xxx,
         itmes: [],
     },
     up2date: {
         isFetching: false,
         didInvalidate: false,
         lastupdated: 2016-11-25 xxx,
         itmes: [],
     }
  },
  mainentry: {
     
     splash: {
         loading: true,
     }
  }
}
`
