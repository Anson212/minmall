<template>
	<div> <!--头部导航栏-->
		<nav-bar>
		  <div slot="left" class="back" @click="backClick">
		  	<img src="~assets/img/common/back.svg" alt="" />
		  </div>
		  <div slot="center" class="title">
		  	<div v-for="(item, index) in titles"
		  		 class="title-item"
		  		 :class="{active: index === currentIndex}"
		  		 @click="titleClick(index)">
		  		 {{item}}
		  	</div>
		  </div>
		</nav-bar>
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	export default {
		name: "DetailNavBar",
		data () {
			return {
				titles: ['商品', '参数', '评论', '推荐'],
				currentIndex: 0
			}
		},
		components: {
			NavBar
		},
		methods: {
			titleClick(index){  //获取索引值选项卡跳转
				this.currentIndex = index
				
				this.$emit("titleClick", index)
			},
			backClick() { //返回上一页
				this.$router.back()
			}
		}
	}
</script>

<style scoped>
 .title{
 	display: flex;
 	font-size: 13px;
 }
 
 .title-item{
 	flex: 1;
 }
 .active{
 	color: var(--color-high-text)
 }
 .back img{
 	margin-top: 12px;
 }
</style>