import  axios  from "./axios"

export function getDetail(iid){
	return axios({
		url: '/v1/detail',
		params: {
			iid
		}
	})
}


export function getRecommend(){
	return axios({
		url: '/v1/data'
	})
}

export class Goods { //创建一个类来整合混乱的商品基本信息
	constructor(itemInfo, columns, services){ //获取商品基本信息
		this.title = itemInfo.title
		this.desc = itemInfo.desc
		this.newPrice = itemInfo.price
		this.oldPrice = itemInfo.oldPrice
		this.realPrice = itemInfo.realPrice
		this.discount = itemInfo.discountDesc
		this.columns = columns
		this.services = services
		this.realPrice = itemInfo.lowNowPrice
	}
	
}

export class Shop { //获取店铺信息
	constructor(shopInfo) {
		this.logo = shopInfo.shopLogo;
		this.name = shopInfo.name;
		this.fans = shopInfo.cFans;
		this.sells = shopInfo.cSells;
		this.score = shopInfo.score;
		this.goodsCount = shopInfo.cGoods
	}
}

export class GoodsParam {  //获取商品参数
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}