//import { request } from "./request"
import axios from './axios'
export function getHomeMultidata(){
	return axios({
		url: '/v1/multidata'
	})
}

export function getHomeGoodsPop(type, page){
	return axios({
		url:"/v1/data",
		params:{
			type,
			page
		}
	})
}

export function getHomeGoodsNew(type, page){
	return axios({
		url:"/v1/new",
		params:{
			type,
			page
		}
	})
}

export function getHomeGoodsSell(type, page){
	return axios({
		url:"/v1/sell",
		params:{
			type,
			page
		}
	})
}
