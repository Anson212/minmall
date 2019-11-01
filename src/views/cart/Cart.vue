<template>
	<div id="cart">
		<!--导航栏-->
		<nav-bar class="nav-bar">
			<div slot="center">购物车({{length}})</div>
		</nav-bar>
		<!--商品列表-->
		<cart-list></cart-list>

		<!--底部汇总-->
		<!--<cart-bottom-bar></cart-bottom-bar>-->

	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	import CartList from './childComps/CartList'
	//	import CartBottomBar from './childComps/CartBottomBar'

	import { mapGetters } from 'vuex'
	export default {
		name: "Cart",
		components: {
			NavBar,
			CartList,
			//			CartBottomBar
		},
		computed: {
			//两种方法
			// ...mapGetters(['cartLength', 'cartList'])
			...mapGetters({
				length: 'cartCount',

			})
		}
	}
</script>

<style scoped>
	#cart {
		/*position: relative;*/
		height: 100vh;
	}
	
	.nav-bar {
		background-color: var(--color-tint);
		font-weight: 700;
		color: #fff;
	}
	
	.cart-list {
		position: absolute;
		top: 44px;
		bottom: 49px;
		width: 100%;
	}
</style>