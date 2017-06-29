<template>
	<div id="goSngle" class="wrapper">
		<div class="content">
			<textarea class="gosun-speech" placeholder="获奖的心情，和大家分享一下吧！"></textarea>
			<input type="file" id="upfile" name="fileToUpload" class="fileToUpload" @change="upImg" accept="image/*"/>
			<ul class="flex">
				<li v-for="item of imgList">
					<img :src="item" />
				</li>
			</ul>
			<button @click="shoeList">提交</button>
		</div>
	</div>
</template>

<script type="text/javascript">
	import { User } from '../assets/js/user.js'; //引入User
	import { Util } from '../assets/js/util.js'; //引入Util
	import { Indicator } from 'mint-ui';//引入mintUI  indicator组件
	
	export default{
		data(){
			return{
				imgList:[]
			}
		},
		methods:{
			shoeList(){
				let files = document.getElementById("upfile").files;
				console.log(files)
				if(typeof FileReader == undefined) {
				    alert("不支持filereader");
				}else{
					alert("FileReader is ok");
				}
			},
			upImg(){
				let that = this;
				let reader = new FileReader();
				let input = document.getElementById("upfile");
				let files = input.files;
				console.log(files);
				console.log(User.getToken());
				let param = new FormData();
				param.append('file',files[0]);
				param.append('token',User.getToken());
	            /*for(var k=0;k<files.length;k++){
	                if(!/image\/\w+/.test(files[k].type)){
	                    console.log(files[k].name+"不是图像文件!");
	                }else{
	                    //此处可加入文件上传的代码
	                    console.log(files[k].name+"文件已上传")
	                }
	            }*/
	            console.log(param.get('file'))
	           	console.log(param);
	            this.api.postUp('common/uploadApi.json',param,function(data){
	            	console.log(data.data);
	            },function(progressEvent){
	            	console.log(progressEvent.loaded);
	            });
	            console.log(reader)
	            reader.readAsDataURL(files[0]);
	            reader.onload = function(){
	                that.imgList.push(this.result)
	            }    
			}
		},
		mounted(){
	        
		}
	}
</script>

<style lang="scss">
	#goSngle{
		.content{
			top: 0;
			bottom: 0;
		}
		.gosun-speech{
			padding: 10px;
			width: 100%;
    		height: 128px;
			resize:none;
			border: 0;
			outline: none;
		}
		img{
			width: 100px;
		}
	}
</style>