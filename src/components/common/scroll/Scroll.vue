<template>
	<div class="wrapper" ref="wrapper">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default {
		name: 'Scroll',
		data() {
			return {
				scroll: null,
				message: 'hahaha'
			}
		},
		props: {
			probeType: { //是否开启实时打印由传值来决定， 为了灵活使用 把probeType抽出来 用传值的方式使用
				type: Number,
				default: 0
			},
			pullUpLoad: {
				type: Boolean,
				default: false
			},
			data: {
				type: Array,
				default: () => {
					return []
				}
			},

		},
		mounted() {
			//1.创建BScroll对象
			this.scroll = new BScroll(this.$refs.wrapper, {
				click: true,
				probeType: this.probeType, //是否开启实时打印由传值来决定
				pullUpLoad: this.pullUpLoad //是否开启上拉刷新由传值决定
			})

			//2.监听滚动的位置
			//this.scroll.on("scroll",(position)=> {
			//				console.log(position)
			//  this.$emit("scroll",position) //把position传出给Home首页中
			//})
			//2.监听滚动的位置  严谨的写法
			if(this.probeType === 2 || this.probeType === 3) {
				this.scroll.on("scroll", (position) => {
					this.$emit("scroll", position)
				})
			}

			//3.监听上拉事件
			if(this.pullUpLoad) {
				this.scroll.on("pullingUp", () => {
					//console.log('上拉加载更多')
					this.$emit('pullingUp')
				})
			}
		},
		methods: {
			scrollTo(x, y, time = 300) { //封装返回顶部的时间 设置时间默认值
				this.scroll && this.scroll.scrollTo(x, y, time)
			},
			finisPullUp() {
				//完成加载更多
				this.scroll && this.scroll.finishPullUp()
			},
			refresh() {
				//监听图片加载完成
				this.scroll && this.scroll.refresh()
			},
			getScrollY() { //判断缓存位置
				return this.scroll ? this.scroll.y : 0
			}
		}
	}
</script>

<style>

</style>