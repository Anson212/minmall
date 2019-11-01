<template>
	<div class="tab-control">
		<div v-for="(item, index) in titles" 
			 class="tab-control-item"
			 :class="{active:currentIndex ===  index}"
			 @click="itemClick(index)">
			<span>{{item}}</span>
		</div>
	</div>
</template>
<!--
	选项卡的实现
-->
<script>
	export default{
		name:"TabControl",
		data (){
			return {
				currentIndex:0
			}
		},
		props:{
			titles:{
				type: Array,
				default(){
				return []
				}
			}
		},
		methods:{
			itemClick(index){
				this.currentIndex = index;
//				console.log(index)
				this.$emit('tabClick', index) //传递数据给父组件
			}
		}
	}
</script>

<style scoped>
	.tab-control{
		display: flex;
		text-align: center;
		font-size: 15px;
		height: 40px;
		line-height: 40px;
		background-color: #fff;
	}
	.tab-control-item{
		flex: 1;
		touch-action: none;
	}
	.tab-control-item span{
		padding: 5px;
	}
	.active {
        color: var(--color-high-text);
    }
    .active span{
    	border-bottom: 3px solid var(--color-tint);
    }
</style>