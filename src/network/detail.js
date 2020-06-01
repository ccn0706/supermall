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
// 获取推荐
export function getRecommend(){
    return request({
        url:'/recommend'
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
export class Shop{
    constructor(shopInfo) {
        this.logo=shopInfo.shopLogo;
        this.name=shopInfo.name;
        this.fans=shopInfo.cFans;
        this.sells=shopInfo.cSells;
        this.score=shopInfo.score;
        this.goodsCount=shopInfo.cGoods;
    }
}
export class GoodsParam{
    constructor(info,rule){
        // 注：images可能没有值
        this.image=info.image?info.image[0]:'';
        this.infos=info.set;
        this.sizes=rule.tables;
    }
}