<template>
	<div class="cart-list" v-if="list.length">
		<scroll class="content" ref="scroll">
			<cart-list-item v-for="(item, index) in list" :key="item.iid" :item-info="item"></cart-list-item>
		</scroll>
		<cart-bottom-bar></cart-bottom-bar>
	</div>
	<div v-else class="cart-list">
		<scroll class="content" ref="scroll">
			<div class="cart-imgs">
				<img src="~/assets/img/cart/cart.png" />
				<p class="emptycart-text">你的购物车空空如也</p>
				<p class="emptycart-btn">
					<span class="button-primary" @click="goHome">去逛逛</span>
				</p>
			</div>
			<div class="cart-info">
				<p class="emptycart-title">大家都在看</p>
				<goods-list class="emptycart-list" :goods="recommendList"></goods-list>
			</div>
		</scroll>
	</div>

</template>

<script>
	import CartListItem from './CartListItem'

	import CartBottomBar from './CartBottomBar'
	import GoodsList from 'components/content/goods/GoodsList'
	import Scroll from 'components/common/scroll/Scroll'

	import { getRecommend } from "network/detail"

	import { mapGetters } from 'vuex'
	export default {
		name: "CartList",
		data() {
			return {
				recommendList: []
			}
		},
		components: {
			Scroll,
			CartListItem,
			CartBottomBar,
			GoodsList
		},
		computed: {
			...mapGetters({
				list: "cartList"
			})
		},
		mounted() {
			//请求推荐数据
			getRecommend().then(res => {
//				console.log(res)
				this.recommendList = res.data.list
			})
		},
		methods:{
			goHome(){
				this.$router.push("/home")
			}
		},
		activated() {
			this.$refs.scroll.refresh()
		}
	}
</script>

<style scoped>
	.cart-list {
		height: calc(100% - 44px - 49px);
	}
	
	.content {
		height: 100%;
		overflow: hidden;
	}
	
	.cart-imgs img {
		width: 100%;
		height: 100%;
		text-align: center;
	}
	
	.cart-imgs .emptycart-text {
		text-align: center;
		font-size: 12px;
	}
	
	.emptycart-btn {
		text-align: center;
	}
	
	.emptycart-btn .button-primary {
		display: inline-block;
		margin: 15px 0 20px;
		padding: 8px 30px;
		border-radius: 4px;
		color: #fff;
		background: #ff5777;
	}
	
	.cart-info .emptycart-title {
		margin-top: 4px;
		padding: 10px 20px;
		font-size: 14px;
		color: #666;
		font-weight: 400;
		background: #f6f6f6;
	}
	
	.cart-info .emptycart-list {
		margin-bottom: 60px;
		background: #f6f6f6;
	}
</style>