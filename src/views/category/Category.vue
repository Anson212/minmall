<template>
	<div id="category">
		<nav-bar class="nav-bar">
			<div slot="center">商品分类</div>
		</nav-bar>
		<div class="content">
			<tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>

			<scroll ref="scroll" id="tab-content" :data="[categoryData]">
				<div>
					<tab-content-category :subcategories="showSubcategory"></tab-content-category>
					<tab-control :titles="['综合', '新品', '销量']" @tabClick="tabClick"></tab-control>
					<tab-content-detail :category-detail="showGoods"></tab-content-detail>
				</div>
			</scroll>
		</div>
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'

	import TabControl from 'components/content/tabControl/TabControl'
	import Scroll from 'components/common/scroll/Scroll'

	import TabMenu from './childComps/TabMenu'
	import TabContentCategory from './childComps/TabContentCategory'
	import TabContentDetail from './childComps/TabContentDetail'

	import { getCategory, getSubcategory } from "network/category";
	import { getHomeGoodsPop, getHomeGoodsNew, getHomeGoodsSell } from "network/home"
	import { POP, SELL, NEW } from "common/const";
	import { tabControlMixin } from "common/mixin";

	export default {
		name: "Category",
		components: {
			NavBar,
			TabMenu,
			TabControl,
			Scroll,
			TabContentCategory,
			TabContentDetail
		},
		mixins: [tabControlMixin],
		data() {
			return {
				categories: [],
				categoryData: {},
				currentIndex: -1,
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
				isTabFixed: false, //判断高度是否吸顶
			}
		},
		mounted() {
			// 1.请求分类数据
			this._getCategory()
		},
		computed: {
			showSubcategory() {
				if(this.currentIndex === -1) return {}
				return this.categoryData[this.currentIndex].subcategories
			},
			//    showCategoryDetail() {
			//		    if (this.currentIndex === -1) return []
			//		    return this.categoryData[this.currentIndex].getCategoryDetail[this.currentType] 
			//		    
			//    }
			showGoods() {
				return this.goods[this.currentType].list
			},
		},
		methods: {
			_getCategory() {
				getCategory().then(res => {

					// 1.获取分类数据
					this.categories = res.data.category.list

					// 2.初始化每个类别的子数据
					for(let i = 0; i < this.categories.length; i++) {
						this.categoryData[i] = {
							subcategories: {},

						}

					}
					// 3.请求第一个分类的数据
					this._getSubcategories(0)

				})
			},
			_getSubcategories(index) {
				this.currentIndex = index;

				const mailKey = this.categories[index].maitKey;

				getSubcategory(mailKey).then(res => {
					let str = res[0].data;
					for(let i = 0; i < str.length; i++) {
						if(mailKey === str[i].key) {
							this.categoryData[index].subcategories = str[i].liu
							this.categoryData = { ...this.categoryData
							}
							
						}
					}

					this.getHomeGoodsPop('pop')
					this.getHomeGoodsNew('new')
					this.getHomeGoodsSell('sell')
				})
			},

			getHomeGoodsPop(type) {
				const page = this.goods[type].page + 0 //原页码加1
				getHomeGoodsPop(type, page).then(res => { //获取数据添加到一个新数组中
					this.goods[type].list.push(...res.data.list)
					this.goods[type].page += 0

				})
			},

			getHomeGoodsNew(type) {
				const page = this.goods[type].page + 1 //原页码加1
				getHomeGoodsNew(type, page).then(res => { //获取数据添加到一个新数组中
					this.goods[type].list.push(...res.data.list)
					this.goods[type].page += 1

					this.$refs.scroll.finisPullUp() //完成加载更多
					//console.log(res)
				})
			},

			getHomeGoodsSell(type) {
				const page = this.goods[type].page + 1 //原页码加1
				getHomeGoodsSell(type, page).then(res => { //获取数据添加到一个新数组中
					this.goods[type].list.push(...res.data.list)
					this.goods[type].page += 1

					this.$refs.scroll.finisPullUp() //完成加载更多
					//console.log(res)
				})
			},



			/**
			 * 事件响应相关的方法
			 */
			selectItem(index) {
				this._getSubcategories(index)
			}
		}
	}
</script>

<style scoped>
	#category {
		height: 100vh;
	}
	
	.nav-bar {
		background-color: var(--color-tint);
		font-weight: 700;
		color: #fff;
	}
	
	.content {
		position: absolute;
		left: 0;
		right: 0;
		top: 44px;
		bottom: 49px;
		display: flex;
	}
	
	#tab-content {
		height: 100%;
		flex: 1;
	}
</style>