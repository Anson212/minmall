<template>
	<div id="home">
		<nav-bar class="home-nav">
			<div slot="center">美衣街</div>
		</nav-bar>
		<tab-control :titles="['品牌上新', '遮肉显瘦', '梨型身材']" ref="tabControl1" class="tab-control" @tabClick="tabClick" v-show="isTabFixed"></tab-control>
		<scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll" @pullingUp="loadMore">
			<home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
			<recommend-view :recommends="recommends" />
			<!--<feature-view/>-->
			<tab-control :titles="['品牌上新 ', '遮肉显瘦', '梨型身材']" ref="tabControl2" @tabClick="tabClick"></tab-control>
			<good-list :goods="showGoods" />
		</scroll>

		<!--返回顶部-->
		<back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

	</div>
</template>

<script>
	import HomeSwiper from './childComps/HomeSwiper'
	import RecommendView from './childComps/RecommendView'
	import FeatureView from './childComps/FeatureView'

	import NavBar from 'components/common/navbar/NavBar';
	import TabControl from 'components/content/tabControl/TabControl';
	import GoodList from 'components/content/goods/GoodsList'
	import Scroll from 'components/common/scroll/Scroll'
	import BackTop from 'components/content/backTop/BackTop'

	import { getHomeMultidata, getHomeGoodsPop, getHomeGoodsNew, getHomeGoodsSell } from "network/home"
	import { debounce } from "common/utils";
	import { itemListenerMixin, backTopMixin } from "common/mixin";

	export default {
		name: "Home",
		components: {
			NavBar,
			HomeSwiper,
			RecommendView,
			FeatureView,
			TabControl,
			GoodList,
			Scroll,
			BackTop
		},
		mixins: [itemListenerMixin, backTopMixin],
		data() {
			return {
				banners: [],
				recommends: [],
				goods: {
					'pop': {
						page: 0,
						list: []
					},
					'new': {
						page: 0,
						list: []
					},
					'sell': {
						page: 0,
						list: []
					},
				},
				currentType: 'pop', //设置一个获取类型元素
				//isShowBackTop: true,  //设置返回顶部的隐藏显示参数
				tabOffsetTop: 0, //拿到轮播图的高度
				isTabFixed: false, //判断高度是否吸顶
				saveY: 0, //记录位置信息
			}
		},
		computed: {
			showGoods() {
				return this.goods[this.currentType].list
			},
			destroyed() {
				console.log('home destroyed')
			},
			activated() { //将位置设置为保存的位置saveY信息即可。
				this.$refs.scroll.scrollTo(0, this.saveY, 0)
				this.$refs.scroll.refresh() //重新再刷一次图片加载
			},
			deactivated() {
				//1保存一个Y位置的值
				this.saveY = this.$refs.scroll.getScrollY()
				//2.取消全局事件监听
				this.$bus.$off('itemImgLoad', this.itemImgListener)
			}
		},
		mounted() {
			// 1.请求多个数据
			this.getHomeMultidata()
			//2.请求商品数据
			this.getHomeGoodsPop('pop')
			this.getHomeGoodsNew('new')
			this.getHomeGoodsSell('sell')
		},

		methods: {
			/*
			 * 事件监听相关的方法
			 */
			tabClick(index) { //点击相关的索引来判断是那个接口，再返回相对应的数据
				//  		console.log(index)
				switch(index) {
					case 0:
						this.currentType = "pop"
						break
					case 1:
						this.currentType = "new"
						break
					case 2:
						this.currentType = "sell"
						break
				}
				//两个模块的索引保持一致
				this.$refs.tabControl1.currentIndex = index
				this.$refs.tabControl2.currentIndex = index
			},
			//backClick(){
			//通过ref来获取到scroll组件中的scroll元素
			//this.$refs.scroll.scrollTo(0,0) //获取scroll组件封装的scrollTo返回顶部的时间
			//console.log(this.$refs.scroll.message) 
			//},
			contentScroll(position) { //要实时监听scroll 里的滚动高度数据来判断 返回顶部按钮是否隐藏和显示
				//  		console.log(position)
				//1.判断BackTop是否显示
				this.isShowBackTop = (-position.y) > 1000
				//2.决定tabControl是否吸顶(position: fixed)
				this.isTabFixed = (-position.y) > this.tabOffsetTop
			},
			loadMore() {
				console.log('上拉加载更多')
				//this.getHomeGoodsPop(this.currentType) //把页码加进请求商品的方法中
				//this.getHomeGoodsNew(this.currentType)
				//this.getHomeGoodsSell(this.currentType)
			},
			swiperImageLoad() {
				this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
				//console.log(this.$refs.tabControl.$el.offsetTop)
			},
			/*
			 * 网络请求相关的方法
			 */
			// 1.请求多个数据
			getHomeMultidata() {
				getHomeMultidata().then(res => {
					this.banners = res.data.banner.list;
					this.recommends = res.data.recommend.list;
				})
			},
			//2.请求商品数据
			getHomeGoodsPop(type) {
				const page = this.goods[type].page + 0 //原页码加1
				getHomeGoodsPop(type, page).then(res => { //获取数据添加到一个新数组中
					this.goods[type].list.push(...res.data.list)
					this.goods[type].page += 0
				})
			},

			getHomeGoodsNew(type) {
				const page = this.goods[type].page + 1
				getHomeGoodsNew(type, page).then(res => { 
					this.goods[type].list.push(...res.data.list)
					this.goods[type].page += 1
					this.$refs.scroll.finisPullUp() 
					
				})
			},

			getHomeGoodsSell(type) {
				const page = this.goods[type].page + 1 
				getHomeGoodsSell(type, page).then(res => { 
					this.goods[type].list.push(...res.data.list)
					this.goods[type].page += 1
					this.$refs.scroll.finisPullUp() 
					
				})
			}

		}
	}
</script>

<style scoped>
	#home {
		/*padding-top: 44px;*/
		height: 100vh;
		/*vh就是当期屏幕可见高度的1%，也就是说 height: 100vh == height: 100%;
		                * */
		position: relative;
	}
	
	.home-nav {
		background-color: var(--color-tint);
		color: #fff;
		/*在使用浏览器原生滚动时，为了让导航不跟随一起滚动*/
		/*position: fixed;
    left: 0;
    right: 0;
    top:0;
    z-index: 9;*/
	}
	
	.tab-control {
		position: relative;
		z-index: 9;
	}
	
	.content {
		overflow: hidden;
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
		background: #fff;
	}
</style>