import { Category } from 'category-model.js';
var category=new Category();  //实例化 home 的推荐页面
Page({
  data: {
    transClassArr:['tanslate0','tanslate1','tanslate2','tanslate3','tanslate4','tanslate5','tanslate6','tanslate7'],
    currentMenuIndex:0,
    loadingHidden:false,
  },
  onLoad: function () {
    this._loadData();
  },

  /*加载所有数据*/
  _loadData:function(callback){
    var that = this;
    category.getCategoryType((categoryData)=>{

      that.setData({
        categoryTypeArr: categoryData,
        loadingHidden: true
      });

      that.getTopicsByCategory(categoryData[0]._id,(data)=>{
        var dataObj= {
          topics: data,
          topImgUrl: '',
          title: categoryData[0].name
        };
        that.setData({
          loadingHidden: true,
          categoryInfo0:dataObj
        });
        callback&& callback();
      });
    });
  },

  /*切换分类*/
  changeCategory:function(event){
    var index=category.getDataSet(event,'index'),
        id=category.getDataSet(event,'id')//获取data-set
    this.setData({
      currentMenuIndex:index
    });

    //判断是否已经有index的数据
    if(!this.isLoadedData(index)) {
      var that=this;
      this.getTopicsByCategory(id, (data)=> {
        that.setData(that.getDataObjForBind(index,data));
      });
    }
  },

  isLoadedData:function(index){
    if(this.data['categoryInfo'+index]){
      return true;
    }
    return false;
  },

  getDataObjForBind:function(index,data){
    var obj={},
        baseData=this.data.categoryTypeArr[index];
        obj['categoryInfo' + index]={
          topics:data,
          topImgUrl:'',
          title:baseData.name
        };

        return obj;
  },

  getTopicsByCategory:function(id,callback){
    category.getTopicsByCategory(id,(data)=> {
      callback&&callback(data);
    });
  },

  onThemeItemTap: function (event) {
      var id = category.getDataSet(event, 'id');
      var name = category.getDataSet(event, 'name');
      wx.navigateTo({
        url: '../theme/theme?id=' + id + '&name='+ name
      })
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
      path: 'pages/category/category'
    }
  }

})