<template>
	<div class="cartcontrol">
		<!--<div class="circle" >-</div>
		<div class="cart-count" v-if="itemInfo.count">{{itemInfo.count}}</div>
		<div class="add_circle" >+</div>-->
	</div>
</template>

<script>
	export default {
		name: "CartControl",
		props: {
			itemInfo: Object,
			default() {
				return {}
			}
		},
		components: {
			
		}
	}
</script>

<style>
.cartcontrol div{
	display: inline-block;
}
.circle,.add_circle{
	width: 30px;
	text-align: center;
	padding: 4px;
	background: yellow;
}
.add_circle{
	background: red;
}
.cart-count{
	width: 30px;
	padding: 8px 6px ;
	border: 1px solid red;
}
</style>