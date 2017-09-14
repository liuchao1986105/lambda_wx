// 引用使用es6的module引入和定义
// 全局变量以g_开头
// 私有函数以_开头

import { Config } from 'config.js';

class Token {
    constructor() {
        this.verifyUrl = Config.restUrl + 'wechat/verifyToken';
        this.tokenUrl = Config.restUrl + 'wechat/token';
    }

    verify() {
        var token = wx.getStorageSync('token');

        if (!token) {
            this.getTokenFromServer();
        }
        else {
            this._veirfyFromServer(token);
        } 
    }

    _veirfyFromServer(token) {
        var that = this;
        wx.request({
            url: that.verifyUrl,
            method: 'POST',
            data: {
                token: token
            },
            success: function (res) {
                var valid = res.data.isValid;
                if(!valid){
                    that.getTokenFromServer();
                }
            }
        })
    }

    getTokenFromServer(callBack) {
        var that  = this;
        wx.login({
            success: function (res) {
                if(res.code){
                    wx.request({
                        url: that.tokenUrl,
                        method:'POST',
                        data:{
                            code:res.code
                        },
                        success:function(res){
                            wx.setStorageSync('token', res.data.token);
                            wx.setStorageSync('user_id', res.data.user_id);
                            callBack&&callBack(res.data.token);
                        }
                    })
                }else{
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
                
            }
        })
    }
}

export {Token};