<template>
	<div id="detail">
		<detail-nav-bar ref="nav" class="detail-nav" @titleClick="titleClick"></detail-nav-bar>
		<scroll 
			class="content" 
			ref="scroll"
			:probe-type="3"
			@scroll="contentScroll">
	      <detail-swiper :top-images="topImages"></detail-swiper>
		  <detail-base-info :goods="goods"></detail-base-info>
		  <detail-shop-info :shop="shop"></detail-shop-info>
		  <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
		  <detail-param-info :param-info="paramInfo" ref="params"/>
		  <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
		  <goods-list :goods="recommendList" ref="recommend"></goods-list>
		</scroll>
		<detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
		
		<!--返回顶部-->
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
		
	</div>
</template>

<script>
	import DetailNavBar from './childComps/DetailNavBar'
	import DetailSwiper from './childComps/DetailSwiper'
	import DetailBaseInfo from './childComps/DetailBaseInfo'
	import DetailShopInfo from './childComps/DetailShopInfo'
	import DetailGoodsInfo from './childComps/DetailGoodsInfo'
	import DetailParamInfo from './childComps/DetailParamInfo'
	import DetailCommentInfo from './childComps/DetailCommentInfo'
	
	
	import DetailBottomBar from './childComps/DetailBottomBar'
	
	import Scroll from 'components/common/scroll/Scroll'
	import GoodsList from 'components/content/goods/GoodsList'
	
	import BackTop from 'components/content/backTop/BackTop'
	
	import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail"
	import {debounce} from "common/utils";
	import {itemListenerMixin,backTopMixin} from "common/mixin";
	
	import { mapActions } from 'vuex'
	
	export default {
		name: "Detail",
		data() {
			return {
				iid: null,
				topImages: [],  //轮播图数据
				goods: {},    //商品基本信息
				shop:{},     //店铺信息
				detailInfo:{}, //商品详情数据
				paramInfo: {}, //商品参数数据
				commentInfo: {}, //评论信息
				recommendList: [], // 推荐信息
				themeTopYs:[],  //主题的Y值
				getThemeTopY: null,
				currentIndex:0,
				
			}
		},
		mixins:[itemListenerMixin,backTopMixin],
		mounted() {
			//1.保存传入的iid
			this.iid = this.$route.params.iid
			//console.log(this.iid)
			
			//2.根据iid请求详情数据
			getDetail(this.iid).then(res => {
				//console.log(res.lists)
				
				
		    for(let i = 0, len = res.lists.length ; i < len; i++) {
				   if (res.lists[i].iid === this.iid) {
				   	  const data = res.lists[i].result
				   	  this.topImages = data.itemInfo.topImages
				   	  this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
				   	  this.shop = new Shop(data.shopInfo)
				   	  this.detailInfo = data.detailInfo
				   	  this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
				   	 if (data.rate.list) {
			    	 this.commentInfo = data.rate.list[0];
			         }
				   }
	       
				}

			})
			
			//3.请求推荐数据
			getRecommend().then(res => {
				this.recommendList = res.data.list
			})
			
			//4.给getThemeTopY 赋值
			this.getThemeTopY = debounce(() => { //使用防抖减少加载次数
				this.themeTopYs = []
				this.themeTopYs.push(0);
				this.themeTopYs.push(this.$refs.params.$el.offsetTop);
				this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
				this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
				this.themeTopYs.push(Number.MAX_VALUE);
			},100)
		},
	    destroyed() {
  	       this.$bus.$off("imageLoad", this.itemImgListener)
       },
		components: {
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommentInfo,
			Scroll,
			GoodsList,
			DetailBottomBar,
			BackTop
		},
		methods:{
			...mapActions(['addCart']),
			imageLoad(){ //监听图片加载完成
				//第一种方式
				//this.$refs.scroll.refresh(); 
				//第二种方式使用混入方式
				this.refresh();
				
				this.getThemeTopY();
			},
			titleClick(index){ //获取导航的themeTopYs值
				//console.log(index)
				this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
			},
			
			contentScroll(position){
				//返回顶部参数
				//1.判断BackTop是否显示
               this.isShowBackTop = (-position.y) > 1000
               //2.决定tabControl是否吸顶(position: fixed)
               this.isTabFixed = (-position.y) > this.tabOffsetTop
				
				
//				console.log(position.y)
				//1.获取y值
				const positionY = -position.y
				
				//2 positionY和主题中值进行对比
				//[0,7938,9120,9452,Number.MAX_VALUE]
				// console.log(Number.MAX_VALUE)
				
				//positionY 在 0 和 7938 之间，index =0
				//positionY 在 =7938 和 9120 之间，index =1
				//positionY 在 9120 和 9452 之间，index =2
				//positionY 大于等于9120 值，index =3
				//正常做法
//				let length = this.themeTopYs.length
//				for(let i = 0; i<length; i++){
//					if(this.currentIndex != i && ((i < length -1 && positionY >= this.themeTopYs[i]
//					&& positionY < this.themeTopYs[i+1]) || (i === length -1 && positionY >= this.themeTopYs[i]))){
//						this.currentIndex = i;
//						console.log(this.currentIndex)
//						this.$refs.nav.currentIndex = this.currentIndex
//					}
//				}
               //使用hack做法
               let length = this.themeTopYs.length
               for(let i = 0; i<length-1; i++){
               	if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
               		this.currentIndex = i;
               		this.$refs.nav.currentIndex = this.currentIndex
               	}
               }
			},
			
			addToCart(){
				//加入购物车
				//1.获取购物车需要展示的信息
				const product = {}
				product.image = this.topImages[0];
				product.title = this.goods.title;
				product.desc = this.goods.desc;
				product.price = this.goods.realPrice;
				product.oldPrice = this.goods.oldPrice
				product.iid = this.iid;
				
				//2.将商品添加到购物车里(1.promise 2.mapActions)
				//this.$store.cartList.push(product)
				//this.$store.commit('addCart', product)
				//console.log(this.topImages[0])
				
				this.addCart(product).then(res =>{
//					console.log(product)
//					console.log(this.$toast)
					this.$toast.show(res,2000)
				})
//				this.$store.dispatch('addCart', product).then(res =>{
//					console.log(res)
//				})
				
			}
			
		}
	}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>