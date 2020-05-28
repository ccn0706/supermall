import {request} from './request'
// 首页的请求可能有多个，分开可方便管理首页
export function getDetail(iid){
    return request({
        url:'/detail',
        params:{
            iid
        }
    })
}
export class Goods{
    // constructor构造器
    constructor(itemInfo,columns,services){
        this.title=itemInfo.title;
        this.desc=itemInfo.desc;
        this.newPrice=itemInfo.price;
        this.oldPrice=itemInfo.oldPrice;
        this.discount=itemInfo.discountDesc;
        this.realPrice=itemInfo.lowNowPrice;
        this.columns=columns;
        this.services=services;
    }
}