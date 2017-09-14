/**
 * Created by cfliu on 17/6/18.
 */

import {Base} from '../../utils/base.js';

class Article extends Base{
    constructor(){
        super();
    }
    getDetailInfo(id,callback){
        var param={
            url: 'articles/'+id,
            sCallback:function(data){
                callback && callback(data.data);
            }
        };
        this.request(param);
    }
};

export {Article}
