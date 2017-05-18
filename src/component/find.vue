<template>
	<div id="find">
		<div class="content">
			<div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
		      	<ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
		        	<li v-for="item in list" class="page-infinite-listitem">{{ item }}</li>
		      	</ul>
		      	<p v-show="loading" class="page-infinite-loading">
		        	<mt-spinner type="fading-circle"></mt-spinner>
		        	加载中...
		      	</p>
		    </div>
		</div>
		<footer-bar></footer-bar>
	</div>
</template>
<style lang="scss">
	#find{
		position: absolute;
        width: 100%;
        height: 100%;
		.content{
			width: 100%;
            height: auto;
            position: absolute;
            top: 0;
            bottom: 45px;
            overflow: auto;
		}
	}
</style>

<script type="text/babel">
	import footerbar from './tab.vue';//引入底部栏
  export default {
    data() {
      return {
        list: [1],
        loading: false,
        allLoaded: false,
        wrapperHeight: 0
      };
    },
	components: {
		"footer-bar" : footerbar
	},
    methods: {
      loadMore() {
        this.loading = true;
        setTimeout(() => {
          let last = this.list[this.list.length - 1];
          for (let i = 1; i <= 10; i++) {
            this.list.push(last + i);
          }
          this.loading = false;
	  }, 1500);
      }
    },
    mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;

    }
  };
</script>
