<template>
	<div id="app">
		<router-view></router-view>
		<mt-tabbar v-model="selected">
			<mt-tab-item id="home">
			    <mt-cell title="夺宝" to="/first">
			    	<img slot="icon" src="src/assets/img/ico-n.png">
				</mt-cell>
			</mt-tab-item>
			<mt-tab-item id="new">
			    <mt-cell title="最新揭晓" to="/second">
			    	<img slot="icon" src="src/assets/img/ico-n.png">
				</mt-cell>
			</mt-tab-item>
			<mt-tab-item id="发现">
			    <mt-cell title="发现" to="/find">
			    	<img slot="icon" src="src/assets/img/ico-n.png">
				</mt-cell>
			</mt-tab-item>
			<mt-tab-item id="我的">
			    <mt-cell title="我的" to="/me">
			    	<img slot="icon" src="src/assets/img/ico-n.png">
				</mt-cell>
			</mt-tab-item>
		</mt-tabbar>
	</div>
</template>
<script>
	export default {
		name: 'App',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App'
			}
		}
	}
</script>

<style lang="scss">

	*{
		webkit-box-sizing: border-box;
	    -moz-box-sizing: border-box;
	    box-sizing: border-box;
	}
	body,button,dd,dl,dt,form,h1,h2,h3,h4,h5,h6,hr,input,li,ol,p,td,textarea,th,ul{
		margin:0;
		padding:0;
	}
	body,button,input,select,textarea{
		font:12px/1.5 tahoma,arial,'Hiragino Sans GB','\5b8b\4f53',sans-serif
	}
	h1,h2,h3,h4,h5,h6{
		font-size:100%
	}
	ol,ul{
		list-style:none
	}
	a{
		text-decoration:none
	}
	img{
		border:0
	}
	button,input,select,textarea{
		font-size:100%
	}
	table{
		border-collapse:collapse;border-spacing:0;
	}
	a {
		text-decoration: none;
	}
	/*flex兼容写法*/
	.flex {  
	   	display: box;              /* OLD - Android 4.4- */  
	    display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */  
	    display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */  
	    display: -ms-flexbox;      /* TWEENER - IE 10 */  
	    display: -webkit-flex;     /* NEW - Chrome */  
	    display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */  
	}
	.flex1 {  
    -webkit-box-flex: 1;      /* OLD - iOS 6-, Safari 3.1-6 */  
    -moz-box-flex: 1;         /* OLD - Firefox 19- */  
    width: 20%;               /* For old syntax, otherwise collapses. */  
    -webkit-flex: 1;          /* Chrome */  
    -ms-flex: 1;              /* IE 10 */  
    flex: 1;                  /* NEW, Spec - Opera 12.1, Firefox 20+ */  
}
	.flex-h{
	    /* 09版 */  
	    -webkit-box-orient: horizontal;  
	    /* 12版 */  
	    -webkit-flex-direction: row;  
	    -moz-flex-direction: row;  
	    -ms-flex-direction: row;  
	    -o-flex-direction: row;  
	    flex-direction: row;  
	}
	/* 父元素-横向换行 */  
	.flex-hw {  
	    /* 09版 */  
	    -webkit-box-lines: multiple;
	    /* 12版 */  
	    -webkit-flex-wrap: wrap;  
	    -moz-flex-wrap: wrap;  
	    -ms-flex-wrap: wrap;  
	    -o-flex-wrap: wrap;  
	    flex-wrap: wrap;  
	}
	/* 父元素-水平居中（主轴是横向才生效） */  
	.flex-hc {  
	    /* 09版 */  
	    -webkit-box-pack: center;  
	    /* 12版 */  
	    -webkit-justify-content: center;  
	    -moz-justify-content: center;  
	    -ms-justify-content: center;  
	    -o-justify-content: center;  
	    justify-content: center;  
	    /* 其它取值如下： 
	        align-items     主轴原点方向对齐 
	        flex-end        主轴延伸方向对齐 
	        space-between   等间距排列，首尾不留白 
	        space-around    等间距排列，首尾留白 
	     */  
	}
	.flex-v {  
	    /* 09版 */  
	    -webkit-box-orient: vertical;  
	    /* 12版 */  
	    -webkit-flex-direction: column;  
	    -moz-flex-direction: column;  
	    -ms-flex-direction: column;  
	    -o-flex-direction: column;  
	    flex-direction: column;  
	}
	/* 父元素-竖直居中（主轴是横向才生效） */  
	.flex-vc {  
	    /* 09版 */  
	    -webkit-box-align: center;  
	    /* 12版 */  
	    -webkit-align-items: center;  
	    -moz-align-items: center;  
	    -ms-align-items: center;  
	    -o-align-items: center;  
	    align-items: center;  
	}
	.flex1 {  
	    -webkit-box-flex: 1;      /* OLD - iOS 6-, Safari 3.1-6 */  
	    -moz-box-flex: 1;         /* OLD - Firefox 19- */  
	    width: 20%;               /* For old syntax, otherwise collapses. */  
	    -webkit-flex: 1;          /* Chrome */  
	    -ms-flex: 1;              /* IE 10 */  
	    flex: 1;                  /* NEW, Spec - Opera 12.1, Firefox 20+ */  
	}
	.flex-zhong{
		display: box;              /* OLD - Android 4.4- */  
	    display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */  
	    display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */  
	    display: -ms-flexbox;      /* TWEENER - IE 10 */  
	    display: -webkit-flex;     /* NEW - Chrome */  
	    display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */  
	    /* 09版 */  
	    -webkit-box-pack: center;  
	    /* 12版 */  
	    -webkit-justify-content: center;  
	    -moz-justify-content: center;  
	    -ms-justify-content: center;  
	    -o-justify-content: center;  
	    justify-content: center;  
	     /* 09版 */  
	    -webkit-box-align: center;  
	    /* 12版 */  
	    -webkit-align-items: center;  
	    -moz-align-items: center;  
	    -ms-align-items: center;  
	    -o-align-items: center;  
	    align-items: center;  
	}

	
</style>