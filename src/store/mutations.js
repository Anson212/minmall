import {
	ADD_CARTS,
	REDUCE_CART,
	DELETE_CART
} from './mutations-types.js'
export default {
	//mutations唯一的目的就是修改state中状态
	//mutations中的每个方法尽可能完成的事件比较单一一点
	addCounter(state, payload) {
		//数量加一
		payload.count += 1;
	},
	addToCart(state, payload) {
		payload.checked = true
		//将数据添加到数组中
		state.cartList.push(payload)
	},

	[ADD_CARTS](state, payload) {
		for(let item of state.cartList) {
			if(item.iid === payload.iid) {
				item.count++
			}
		}
	},
	[REDUCE_CART](state, payload) {
		for(let item of state.cartList) {
			if(item.iid === payload.iid && item.count > 0) {
				item.count--
				if(item.count == 0){
					item.count =1 
				}
			}
		}

	},

	[DELETE_CART](state, payload) {
		for(let item of state.cartList) {
			if(item.iid === payload.iid) {
				state.cartList.splice(item, 1);
				break;
			}
		}
	}

}