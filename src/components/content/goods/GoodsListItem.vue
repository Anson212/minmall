<template>
	<div class="goods-item" @click="itemClick">
		<img v-lazy="showImage" alt="" @load="imageLoad" />
		<div class="goods-info">
			<p>{{goodsItem.title}}</p>
			<div class="goods-price">
				<span class="price">¥{{goodsItem.price}}</span>
				<span class="collect">{{goodsItem.cfav}}</span>
			</div>
			<div class="goods-btn_box">
				立即购买
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "GoodsListItem",
		props: {
			goodsItem: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		methods: {
			imageLoad() {
				//使用事件总线来传递事件方法
				this.$bus.$emit("itemImageLoad")
			},
			itemClick() { //跳转到详情页
				this.$router.push("/detail/" + this.goodsItem.iid)
				
			}
		},
		computed: {
			showImage() {
				//监听
				return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
			}
		}
	}
</script>

<style scoped>
	.goods-item {
		padding-bottom: 70px;
		position: relative;
		width: 48%;
	}
	
	.goods-item img {
		width: 100%;
		border-radius: 5px;
	}
	
	.goods-info {
		font-size: 12px;
		position: absolute;
		bottom: 5px;
		left: 0;
		right: 0;
		overflow: hidden;
		text-align: center;
	}
	
	.goods-info p {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-bottom: 3px;
		color: rgb(51, 51, 51);
	}
	
	.goods-info .price {
		color: var(--color-high-text);
		margin-right: 20px;
		font-size: 14px;
		font-weight: 700;
	}
	
	.goods-info .collect {
		position: relative;
	}
	
	.goods-info .collect::before {
		content: '';
		position: absolute;
		left: -15px;
		top: -1px;
		width: 14px;
		height: 14px;
		background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
	}
	
	.goods-price {
		display: flex;
		justify-content: space-between;
		padding: 0 10px;
	}
	.goods-btn_box{
		width: 100%;
		height: 26px;
		line-height: 26px;
		border-radius:6px;
		font-size: 14px;
		color: #fff;
		background: rgb(255, 87, 119);
		margin: 2px 0;
	}
</style>