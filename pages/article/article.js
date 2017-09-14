import {Article} from 'article-model.js';
import { Tool } from '../../utils/tool.js';

var wemark = require("../wemark/wemark");
var article=new Article();  //实例化 商品详情 对象
var tool = new Tool();

Page({
    data: {
        loadingHidden:false,
        wemark: {}

    },

    onReady: function(){
        
    },

    onLoad: function (option) {
        var id = option.id;
        this.data.id=id;
        this._loadData();
    },



    _loadData:function(callback){
        var that = this;
        article.getDetailInfo(this.data.id,(data)=>{
            wemark.parse(data.description,that,{
                imageWidth: wx.getSystemInfoSync().windowWidth-40,  // '100px'
                name: 'wemark'
            });
            that.setData({
                product:data,
                loadingHidden:true
            });
            callback&& callback();
        });
    },

    toPay: function (event) {
        var target = article.getDataSet(event, 'target');
        var isSingle = article.getDataSet(event, 'type');
        var url = '';

        if(isSingle){
            url = 'https://www.lambda-study.com/articles/doc/' + target
        }else{
            url = 'https://www.lambda-study.com/topics/' + target
        }
        tool.showTips('复制购买链接',url);
    },


    /*下拉刷新页面*/
    onPullDownRefresh: function(){
        this._loadData(()=>{
            wx.stopPullDownRefresh()
        });
    },

    //分享效果
    onShareAppMessage: function () {
        return {
            title: 'Lambda程序员学习社区',
            path: 'pages/article/article?id=' + this.data.id
        }
    }

})


