/**
 * Created by cfliu on 17/6/10.
 */
import {Base} from '../../utils/base.js';

class Category extends Base {
    constructor() {
        super();
    }

    /*获得所有分类*/
    getCategoryType(callback) {
        var param = {
            url: 'tags',
            data:{
                type:'topic',
            },
            sCallback: function (data) {
                callback && callback(data.data);
            }
        };
        this.request(param);
    }
    /*获得某种分类的商品*/
    getTopicsByCategory(id,callback) {
        var param = {
            url: 'topics',
            data:{
                tagId:id,
            },
            sCallback: function (data) {
                callback && callback(data.data);
            }
        };
        this.request(param);
    }
}

export{Category};