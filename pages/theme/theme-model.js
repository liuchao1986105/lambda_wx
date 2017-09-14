/**
 * Created by cfliu on 17/6/11.
 */
import {Base} from '../../utils/base.js';

class Theme extends Base{
    constructor(){
        super();
    }

    getThemeData(id,callback){
        var param={
            url: 'topics/'+id,
            sCallback:function(data){
                callback && callback(data.data);
            }
        };
        this.request(param);
    }

    getVideosData(page, id,callback){
        var param={
            url: 'articles',
            data:{
                topicId: id,
                from:false,
                type: 'video',
                page: page
            },
            sCallback:function(data){
                callback && callback(data.data);
            }
        };
        this.request(param);
    }

    getArticlesData(page, id,callback){
        var param={
            url: 'articles',
            data:{
                topicId: id,
                from:false,
                type: 'book',
                page: page
            },
            sCallback:function(data){
                callback && callback(data.data);
            }
        };
        this.request(param);
    }
};

export {Theme};