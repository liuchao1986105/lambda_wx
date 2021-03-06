// import {Address} from '../../utils/address.js';
// import {Order} from '../order/order-model.js';
import {My} from '../my/my-model.js';

// var address=new Address();
// var order=new Order();
var my=new My();

Page({
    data: {
        page:1,
        isLoadedAll:false,
        loadingHidden:false,
        likelist:[],
        //orderArr:[],
        //addressInfo:null
    },
    onLoad:function(){   //这个只调用1次
        console.log("onload");
        this._loadData();
        
        //this._getAddressInfo();
    },

    onShow:function(){   //一旦进入这个页面就会调用
        console.log("show");
        this._loadLikes(1);
        // var newOrderFlag=order.hasNewOrder();
        // if(this.data.loadingHidden &&newOrderFlag){
        //     this.onPullDownRefresh();
        // }
    },

    _loadData:function(){
        var that=this;
        my.getUserInfo((data)=>{
            that.setData({
                userInfo:data,
            });
        });
        // this._getOrders();
        // order.execSetStorageSync(false);  //更新标志位
    },

    _loadLikes:function(page,callback){
        /*获取收藏列表*/
        var that=this;
        my.getLikesData(page, (data) => {
            // if(data.length>0) {
            //     //this.data.likelist = this.data.likelist.concat(data)
            //     that.data.likelist.push.apply(that.data.likelist,data); 
            //     that.setData({
            //         likes: this.data.likelist,
            //     });
            // }else{
            //     that.data.isLoadedAll=true;  //已经全部加载完毕
            //     that.data.pageIndex=1;
            // }

            if(page == 1){
                this.data.likelist = data
            }else{
                this.data.likelist = this.data.likelist.concat(data)
            }

            if(data.length == 0){
                that.data.isLoadedAll=true;  //已经全部加载完毕
                that.data.page=1;
            }
            that.setData({
                likes: this.data.likelist,
                loadingHidden:true
            });
            callback && callback();
        });
    },

    /**地址信息**/
    // _getAddressInfo:function(){
    //     var that=this;
    //     // address.getAddress((addressInfo)=>{
    //     //     that._bindAddressInfo(addressInfo);
    //     // });
    // },

    /*修改或者添加地址信息*/
    // editAddress:function(){
    //     var that=this;
    //     wx.chooseAddress({
    //         success: function (res) {
    //             var addressInfo = {
    //                 name:res.userName,
    //                 mobile:res.telNumber,
    //                 totalDetail:address.setAddressInfo(res)
    //             };
    //             if(res.telNumber) {
    //                 that._bindAddressInfo(addressInfo);
    //                 //保存地址
    //                 address.submitAddress(res, (flag)=> {
    //                     if (!flag) {
    //                         that.showTips('操作提示', '地址信息更新失败！');
    //                     }
    //                 });
    //             }
    //             //模拟器上使用
    //             else{
    //                 that.showTips('操作提示', '地址信息更新失败,手机号码信息为空！');
    //             }
    //         }
    //     })
    // },

    /*绑定地址信息*/
    // _bindAddressInfo:function(addressInfo){
    //     this.setData({
    //         addressInfo: addressInfo
    //     });
    // },

    /*订单信息*/
    // _getOrders:function(callback){
    //     var that=this;
    //     order.getOrders(this.data.pageIndex,(res)=>{
    //         var data=res.data;
    //         that.setData({
    //             loadingHidden: true
    //         });
    //         if(data.length>0) {
    //             that.data.orderArr.push.apply(that.data.orderArr,res.data);  //数组合并
    //             that.setData({
    //                 orderArr: that.data.orderArr
    //             });
    //         }else{
    //             that.data.isLoadedAll=true;  //已经全部加载完毕
    //             that.data.pageIndex=1;
    //         }
    //         callback && callback();
    //     });
    // },

    /*显示订单的具体信息*/
    showOrderDetailInfo:function(event){
        // var id=order.getDataSet(event,'id');
        // wx.navigateTo({
        //     url:'../order/order?from=order&id='+id
        // });
    },

    /*未支付订单再次支付*/
    // rePay:function(event){
    //     var id=order.getDataSet(event,'id'),
    //         index=order.getDataSet(event,'index');

    //     //online 上线实例，屏蔽支付功能
    //     if(order.onPay) {
    //         this._execPay(id,index);
    //     }else {
    //         this.showTips('支付提示','本产品仅用于演示，支付系统已屏蔽');
    //     }
    // },

    /*支付*/
    // _execPay:function(id,index){
    //     var that=this;
    //     order.execPay(id,(statusCode)=>{
    //         if(statusCode>0){
    //             var flag=statusCode==2;

    //             //更新订单显示状态
    //             if(flag){
    //                 that.data.orderArr[index].status=2;
    //                 that.setData({
    //                     orderArr: that.data.orderArr
    //                 });
    //             }

    //             //跳转到 成功页面
    //             wx.navigateTo({
    //                 url: '../pay-result/pay-result?id='+id+'&flag='+flag+'&from=my'
    //             });
    //         }else{
    //             that.showTips('支付失败','商品已下架或库存不足');
    //         }
    //     });
    // },

    onProductsItemTap: function (event) {
        var id = my.getDataSet(event, 'id');
        wx.navigateTo({
            url: '../article/article?id=' + id
        })
    },

    /*下拉刷新页面*/
    onPullDownRefresh: function(){
        this.data.isLoadedAll=false; 
        this.setData({
            page: 1
        });
        this._loadLikes(1,()=>{
            wx.stopPullDownRefresh()
        });
        // this._getOrders(()=>{
        //     that.data.isLoadedAll=false;  //是否加载完全
        //     that.data.pageIndex=1;
        //     wx.stopPullDownRefresh();
        //     //order.execSetStorageSync(false);  //更新标志位
        // });
    },


    onReachBottom:function(){
        if(!this.data.isLoadedAll) {
            this.data.page++
            this._loadData(this.data.page)
        }
    },

    /*
     * 提示窗口
     * params:
     * title - {string}标题
     * content - {string}内容
     * flag - {bool}是否跳转到 "我的页面"
     */
    // showTips:function(title,content){
    //     wx.showModal({
    //         title: title,
    //         content: content,
    //         showCancel:false,
    //         success: function(res) {

    //         }
    //     });
    // },

})