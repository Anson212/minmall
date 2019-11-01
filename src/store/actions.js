import {
	ADD_CARTS,
	REDUCE_CART,
	DELETE_CART
} from './mutations-types.js'
export default {
	addCart(context, payload) {
		return new Promise((resolve, reject) => {
			let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
			if(oldProduct) { //如果当前已经有一个相同的商品就加一
				//oldProduct.count +=1;
				context.commit("addCounter", oldProduct)
				resolve('当前的商品数量+1')
			} else { //否则当前商品就是一个
				payload.count = 1
				//3.把商品添加到数组中去
				context.commit("addToCart", payload)
				resolve('添加了新的商品')
			}
		})
	},

	addCarts(context, payload) { //加
		return new Promise((resolve, reject) => {
			let oldProduct = context.state.cartList.find(item => item.iid === payload)
			if(oldProduct) {
				context.commit('ADD_CARTS', oldProduct)
				resolve(oldProduct)
			}

		})
	},

	reduceCart(context, payload) { //减
		return new Promise((resolve, reject) => {
			let oldProduct = context.state.cartList.find(item => item.iid === payload)
			if(oldProduct) {
				context.commit('REDUCE_CART', oldProduct)
				resolve(oldProduct)
			}

		})
	},

	deleteCart(context, payload) { //删除
		return new Promise((resolve, reject) => {
			let oldProduct = context.state.cartList.find(item => item.iid === payload)
			if(oldProduct) { //如果当前已经有一个相同的商品就加一
				context.commit('DELETE_CART', oldProduct)
				resolve(oldProduct)
			}
		})
	}

}