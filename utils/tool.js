/**
 * Created by cfliu on 17/6/13.
 */
import {Base} from 'base.js';
import { Config } from 'config.js';

class Tool extends Base{
    constructor() {
        super();
    }

    getDocIndexById(data,id){
        var len=data.length;
        for(let i=0;i<len;i++){
            if(data[i]._id==id){
                return i;
            }
        }
    }

    /*是否是否收藏*/
    isLike(data) {
        var userinfo = wx.getStorageSync('userinfo');
        var likes = userinfo.collectedArticles;
        data.forEach((doc) => {
          if(likes.indexOf(doc._id) != -1){
            doc.isLike = true
          }else{
            doc.isLike = false
          }
        });
        return data;
    }

    toggleLike(id, isLike, callback){
        var url;
        if(isLike){
            url = 'articles/' + id + '/decollect';
        }else{
            url = 'articles/' + id + '/collect';
        }
        var param={
            type: 'put',
            url: url,
            sCallback:function(data){
                callback && callback(data.data);
            }
        };
        this.request(param);
    }

     /*
     * 提示窗口
     * params:
     * title - {string}标题
     * content - {string}内容
     * flag - {bool}是否跳转到 "我的页面"
     */
    showTips(title,content){
        wx.showModal({
            title: title,
            content: content,
            showCancel:false,
            success: function(res) {

            }
        });
    }

}

export {Tool}