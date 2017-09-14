import { Theme } from 'theme-model.js';
import { Tool } from '../../utils/tool.js';
var theme = new Theme(); //实例化  主题列表对象
var tool = new Tool();
Page({
    data: {
        currentTabsIndex:0,
        loadingHidden: false,
        page: 1,
        videolist: [],
        articlelist: [],
    },
    onReady:function(){
        wx.setNavigationBarTitle({
            title: this.data.titleName
        });
    },
    onLoad: function (option) {
        this.data.titleName=option.name;
        this.data.id=option.id;
        wx.setNavigationBarTitle({
            title: option.name
        });
        this._loadData(this.data.page);
    },

    /*加载所有数据*/
    _loadData:function(page, callback){
        var that = this;
        /*获取主题具体信息*/
        theme.getThemeData(this.data.id,(data) => {
            that.setData({
                themeInfo: data,
                loadingHidden:true
            });
            callback && callback();
        });

        /*获取视频列表*/
        theme.getVideosData(page, this.data.id, (data) => {
            data = tool.isLike(data);
             if(page == 1){
                this.data.videolist = data
            }else{
                this.data.videolist = this.data.videolist.concat(data)
            }

            that.setData({
                videos: this.data.videolist,
                loadingHidden: true
            });
        });

        theme.getArticlesData(page, this.data.id, (data) => {
            data = tool.isLike(data);
             if(page == 1){
                this.data.articlelist = data
            }else{
                this.data.articlelist = this.data.articlelist.concat(data)
            }

            that.setData({
                articles: this.data.articlelist,
                loadingHidden: true
            });
        });

    },

    //切换面板
    onTabsItemTap:function(event){
        var index=theme.getDataSet(event,'index');
        this.setData({
            currentTabsIndex:index
        });
    },

    /*跳转到文章详情*/
    onProductsItemTap: function (event) {
        var id = theme.getDataSet(event, 'id');
        wx.navigateTo({
            url: '../article/article?id=' + id
        })
    },

    onThemeItemTap: function (event) {
        var id = theme.getDataSet(event, 'id');
        var name = theme.getDataSet(event, 'name');
        wx.navigateTo({
          url: '../theme/theme?id=' + id + '&name='+ name
        })
    },

    toPay: function (event) {
        var id = theme.getDataSet(event, 'id');
        var url = 'https://www.lambda-study.com/topics/' + id
        tool.showTips('复制购买链接',url);
    },

    toggleLike: function (event) {
        var that = this;
        var id = theme.getDataSet(event, 'id'),
            type = theme.getDataSet(event, 'type'),
            isLike=theme.getDataSet(event,'status'),
            index=theme.getDataSet(event,'index');

        tool.toggleLike(id, isLike, () => {
            if(type == 'video'){
                that.data.videos[index].isLike = !isLike;
                that.setData({
                    videos: that.data.videos,
                });
            }else{
                that.data.articles[index].isLike = !isLike;
                that.setData({
                    articles: that.data.articles,
                });
            }
            
            
        });
    },

    /*下拉刷新页面*/
    onPullDownRefresh: function(){
        this.setData({
            page: 1
        });
        this._loadData(1, ()=>{
            wx.stopPullDownRefresh()
        });
    },

    onReachBottom () {
        this.data.page++
        this._loadData(this.data.page)
    },

    //分享效果
    onShareAppMessage: function () {
        return {
            title: 'Lambda程序员学习社区',
            path: 'pages/theme/theme?id=' + this.data.id + '&name='+ this.data.titleName
        }
    }

})


