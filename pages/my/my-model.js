/**
 * Created by cfliu on 17/06/14.
 */
import {Base} from '../../utils/base.js'

class My extends Base{
    constructor(){
        super();
    }

    //得到用户信息
    getUserInfo(cb){
        var that=this;
        wx.login({
            success: function () {
                wx.getUserInfo({
                    success: function (res) {
                        typeof cb == "function" && cb(res.userInfo);

                        //将用户昵称 提交到服务器
                        //if(!that.onPay) {
                            that._updateUserInfo(res.userInfo);
                       //}

                    },
                    fail:function(res){
                        typeof cb == "function" && cb({
                            avatarUrl:'https://assets.lambda-study.com/lambda-user.png',
                            nickName:'Lambda'
                        });
                    }
                });
            },

        })
    }

    getLikesData(page, callback){
        var user_id = wx.getStorageSync('user_id');
        var param={
            url: 'articles',
            data:{
                user_id: user_id,
                from: false,
                page: page
            },
            sCallback:function(data){
                callback && callback(data.data);
            }
        };
        this.request(param);
    }

    /*更新用户信息到服务器*/
    _updateUserInfo(res){
       // userInfo:{"nickName":"liuchao","gender":1,"language":"zh_CN","city":"Jiading","province":"Shanghai","country":"CN","avatarUrl":"http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eriaIteDSlpWGBItRHxPDNXeMa0II6HvrdNXMaDQXrSrA9qoQW3fGKWpNXD9bOZEHR6KCB6iaz5QXfg/0"}
        var nickName=res.nickName;
        //delete res.avatarUrl;  //将昵称去除
        //delete res.nickName;  //将昵称去除
        var allParams = {
            url: 'users/mdUser',
           // data:{nickname:nickName,extend:JSON.stringify(res)},
            data:{name:nickName, headimgurl:res.avatarUrl},
            type:'put',
            sCallback: function (data) {
            }
        };
        this.request(allParams);

    }
}

export {My}