import { debounce } from "./utils"
import {POP, NEW, SELL} from "./const";

export const itemListenerMixin = {
	data() {
		return {
			itemImgListener: null,
			refresh: null
		}
	},
	mounted() {
		//1.监听item中图片加载完成
		this.refresh = debounce(this.$refs.scroll.refresh, 100)

		//对监听的事件进行保存
		this.itemImgListener = () => {
			this.refresh()
		}
		this.$bus.$on('imageLoad', this.itemImgListener)
//		console.log("我是混入中的内容")
	}
}

export const backTopMixin = {
	data() {
		return {
			isShowBackTop: false
		}
	},
	methods: {
		backClick() {
			this.$refs.scroll.scrollTo(0, 0, 300)
		}
	}
}


export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
//    console.log(this.currentType);
    }
  }
}
