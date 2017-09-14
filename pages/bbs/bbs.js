import { Bbs } from 'bbs-model.js';
import { Tool } from '../../utils/tool.js';
var bbs = new Bbs(); //实例化 
var tool = new Tool();
Page({
    data: {
        list: [],
        page: 1,
        loadingHidden: false
    },
    // onReady:function(){
    //     wx.setNavigationBarTitle({
    //         title: this.data.titleName
    //     });
    // },
    onLoad: function (option) {
        this._loadData(this.data.page);
    },

    /*加载所有数据*/
    _loadData:function(page,callback){
        var that = this;
        /*获取文章列表信息*/
        bbs.getDocsData(page, (data) => {
            //对data进行一些处理，判断出是否收藏了
            data = tool.isLike(data);
            if(page == 1){
                this.data.list = data
            }else{
                this.data.list = this.data.list.concat(data)
            }
            that.setData({
                docsInfo: this.data.list,
                loadingHidden:true
            });
            callback && callback();
        });
    },

        /*跳转到文章详情*/
    onProductsItemTap: function (event) {
        var id = bbs.getDataSet(event, 'id');
        wx.navigateTo({
            url: '../article/article?id=' + id
        })
    },

    onThemeItemTap: function (event) {
        var id = bbs.getDataSet(event, 'id');
        var name = bbs.getDataSet(event, 'name');
        wx.navigateTo({
          url: '../theme/theme?id=' + id + '&name='+ name
        })
    },

    toggleLike: function (event) {
        var that = this;
        var id = bbs.getDataSet(event, 'id'),
            isLike=bbs.getDataSet(event,'status'),
            index=bbs.getDataSet(event,'index');

        tool.toggleLike(id, isLike, () => {
            that.data.list[index].isLike = !isLike;
            that.setData({
                docsInfo: that.data.list,
            });
            
        });
    },

    /*下拉刷新页面*/
    onPullDownRefresh: function(){
        this.setData({
            page: 1
        });
        this._loadData(1,()=>{
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
            path: 'pages/bbs/bbs'
        }
    }

})


