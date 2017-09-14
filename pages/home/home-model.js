/**
 * Created by Cfliu on 17/6/9
 */

// var Base = require('../../utils/base.js').base;
import {Base} from '../../utils/base.js';

class Home extends Base{
    constructor(){
        super();
    }

    /*banner图片信息*/
    getBannerData(callback){
        var that=this;
        var param={
            url: 'articles',
            data:{
                limit:3,
                isBanner: true,
                from:false
            },

            sCallback:function(data){
                data=data.data;
                callback && callback(data);
            }
        };
        this.request(param);
    }
    /*首页主题*/
    getThemeData(callback){
        var param={
            // url: 'theme?ids=1,2,3',
            url: 'topics',
            data:{
                limit:6,
                page:1
            },
            sCallback:function(data){
                data=data.data;
                callback && callback(data);
            }
        };
        this.request(param);
    }

    /*首页部分商品*/
    getProductorData(callback){
        var param={
            url: 'articles',
            data:{
                limit:8,
                type:'all',
                from:false
            },
            sCallback:function(data){
                callback && callback(data.data);
            }
        };
        this.request(param);
    }

    getMe(){
        var param={
            url: 'users/me',
            sCallback:function(data){
                //callback && callback(data.data);
                wx.setStorageSync('userinfo', data);
            }
        };
        this.request(param);
    }
};

export {Home};