/**
 * Created by cfliu on 17/6/10.
 */
import {Base} from '../../utils/base.js';

class Bbs extends Base{
    constructor(){
        super();
    }

    getDocsData(page, callback){
        var param={
            url: 'articles',
            data:{
                type:'video',
                page: page,
                from: false
            },
            sCallback:function(data){
                callback && callback(data.data);
            }
        };
        this.request(param);
    }
};

export {Bbs};