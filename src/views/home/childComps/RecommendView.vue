<template>
	<div class="recommend">
		<div v-for="item in recommends" class="recommend-item">
			<a href="#">
				<img :src="item.image" alt=""/>
				<div>{{item.title}}</div>
			</a>
		</div>
	</div>
</template>

<script>
	export default {
		name:"RecommendView",
		props: {
		  recommends: {
			type: Array,
			default(){
				return []
			}
		  }
		}
	}
</script>

<style>
	.recommend{
		display: flex;
		width: 100%;
		text-align: center;
		font-size: 12px;
		padding: 10px 10px 20px;
		border-bottom: 10px solid #eee;
		justify-content: center;
		align-items: center;
		flex-wrap:wrap;
	}
	.recommend-item{
		flex: 1;
		
	}

	.recommend-item img{
		width: 60px;
		height: 60px;
		margin: 14px 0 6px;
	}
</style>