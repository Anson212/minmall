<template>
	<div id="shop-item">
		<div class="item-selector">
			<CheckButton :is-checked="itemInfo.checked" @click.native="checkClick"></CheckButton>
		</div>
		<div class="item-img">
			<img :src="itemInfo.image" alt="商品图片" />
		</div>

		<div class="item-info">
			<div class="item-title">{{itemInfo.title}}</div>
			<div class="item-desc">{{itemInfo.desc}}</div>
			<div class="info-bottom">
				<div class="item-price left">
					<span class="n-price">¥{{itemInfo.price}}</span>
					<span class="o-price">{{itemInfo.oldPrice}}</span>
				</div>
				<!--<div class="item-count right">x{{itemInfo.count}}</div>-->
				<div class="item-count right">

					<span class="shop_reduce" @click.prevent="reduce_num(itemInfo.iid)">-</span>
					<span class="shop_num">{{itemInfo.count}}</span>
					<span class="shop_add" @click.prevent="add_num(itemInfo.iid)">+</span>
					<span class="shop_delete">
						<img @click="deleteFun(itemInfo.iid)" src="~assets/img/cart/delete.svg" alt="" />
					</span>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	import CheckButton from 'components/content/checkButton/CheckButton'
	import CartControl from './CartControl'

	import { mapActions } from 'vuex'
	export default {
		name: "CartList",
		props: {
			itemInfo: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		components: {
			CheckButton,
			CartControl
		},
		methods: {
			...mapActions(['addCarts', 'deleteCart', 'reduceCart']),
			checkClick() {
				this.itemInfo.checked = !this.itemInfo.checked;
			},

			reduce_num(id) {
				//				this.$store.commit("REDUCE_CART", id)
				this.reduceCart(id)
			},
			add_num(id) {
				this.addCarts(id)
				//				this.$store.commit("add_cart",id)
			},
			deleteFun(id) {
				//				this.$store.commit("deleteCart", id)
				this.deleteCart(id)
			}
		}
	}
</script>

<style scoped>
	#shop-item {
		width: 100%;
		display: flex;
		font-size: 0;
		padding: 5px;
		border-bottom: 1px solid #ccc;
	}
	
	.item-selector {
		width: 14%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.item-title,
	.item-desc {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.item-img {
		padding: 5px;
		/*border: 1px solid #ccc;*/
	}
	
	.item-img img {
		width: 80px;
		height: 100px;
		display: block;
		border-radius: 5px;
	}
	
	.item-info {
		font-size: 17px;
		color: #333;
		padding: 5px 10px;
		position: relative;
		overflow: hidden;
	}
	
	.item-info .item-desc {
		font-size: 14px;
		color: #666;
		margin-top: 15px;
	}
	
	.info-bottom {
		margin-top: 10px;
		position: absolute;
		bottom: 10px;
		left: 10px;
		right: 10px;
	}
	
	.item-count {
		margin-right: 0px;
	}
	
	.item-price span {
		display: inline-block;
	}
	
	.item-price .n-price {
		color: #000;
		font-weight: bold;
	}
	
	.item-price .o-price {
		font-size: 13px;
		margin-left: 5px;
		text-decoration: line-through;
	}
	
	.shop_reduce,
	.shop_add {
		font-size: 18px;
		display: inline-block;
		text-align: center;
		width: 21px;
		height: 21px;
		border: 1px solid #F5F5F5;
		border: 1px solid #ededed;
	}
	
	.shop_num {
		margin: 0 0px;
		padding: 0 8px;
		position: relative;
		top: -1px;
		border: 1px solid #ededed;
		border-right: none;
		border-left: none;
	}
	
	.shop_delete {
		position: relative;
		top: 2px;
		padding-left: 10px;
		cursor: pointer;
	}
	
	.shop_delete img {
		width: 18px;
		height: 18px;
	}
</style>