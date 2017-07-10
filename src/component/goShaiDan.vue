<template>
	<div id="goSngle" class="wrapper">
		<div class="content">
			<textarea class="gosun-speech" v-model="sunContent" placeholder="获奖的心情，和大家分享一下吧！"></textarea>
			<ul class="flex images">
				<li v-for="(item,index) of imgList" class="flex-zhong">
					<img :src="item" />
					<div class="shade" v-if="progressState && index == (imgList.length-1)">
						<progrees-v class="jindu" :length="progress"></progrees-v>
					</div>
				</li>
				<li class="click" v-if="imgList.length<3">
					<label class="toUp" for="upfile">
						<img src="../assets/img/account/shaidan.png" alt="" />
					</label>
					
					<input type="file" id="upfile" name="fileToUpload" class="fileToUpload" @change="upImg" accept="image/jpg,image/jpeg,image/png" />
				</li>
			</ul>
			<buy-button @click.native="upSingle">提交</buy-button>
		</div>
	</div>
</template>

<script type="text/javascript">
	import { User } from '../assets/js/user.js'; //引入User
	import { Util } from '../assets/js/util.js'; //引入Util
	import { Indicator } from 'mint-ui'; //引入mintUI  indicator组件
	import buybutton from '../components/buybutton.vue'; //引入按钮
	import progrees from '../components/progrees.vue'; //引入进度条

	export default {
		data() {
			return {
				imgList: [],
				upImgUrlList: [],
				progress: 0,
				progressState: false,
				sunContent: '',
				search: this.$route.query
			}
		},
		components: {
			"buy-button": buybutton,
			"progrees-v": progrees
		},
		methods: {
			shoeList() {
				let files = document.getElementById("upfile").files;
				console.log(files)
				if(typeof FileReader == undefined) {
					alert("不支持filereader");
				} else {
					alert("FileReader is ok");
				};
			},
			upImg() {
				let that = this;
				let reader = new FileReader();
				let input = document.getElementById("upfile");
				let files = input.files;
				if(!/image\/\w+/.test(files[0].type)) {
					console.log(files[0].name + "不是图像文件!");
				} else {
					reader.readAsDataURL(files[0]);
					reader.onload = function() {
						that.imgList.push(this.result);
						let param = new FormData();
						param.append('file', files[0]);
						param.append('token', User.getToken());
						//此处可加入文件上传的代码
						that.progressState = true
						that.api.postUp('common/uploadApi.json', param, function(data) {
							console.log(data.data);
							that.progressState = false;
							let res = data.data;
							if(res.successed) {
								that.upImgUrlList.push(res.returnValue[0])
							}
						}, function(progressEvent) {
							console.log(progressEvent);
							that.progress = progressEvent.loaded/progressEvent.total;
						});
					};
				};
			},
			upSingle() {
				console.log(this.upImgUrlList)
				console.log(this.search);
				let params = this.search;
				if(this.upImgUrlList.length<1){
					Util.myAlert("请选择至少一张图片")
				}else{
					for(let i = 0; i < this.upImgUrlList.length; i++){
						params['image' + i] = this.upImgUrlList[i];
					};
					if(Util.trim(this.sunContent).length < 1){
						params.sunContent = "中奖了，好开心！"
					}else{
						params.sunContent = Util.trim(this.sunContent);
					};
					let that = this;
					Indicator.open();
					this.api.addSunOrder(params,function(res){
						Indicator.close();
					})
					
				}
			}
		},
		created(){
			this.search.memberFace = User.getMemberInfo().headIcon;
		},
		mounted() {
			console.log()
		}
	}
</script>

<style lang="scss">
	#goSngle {
		.content {
			top: 0;
			bottom: 0;
		}
		.gosun-speech {
			padding: 10px;
			width: 100%;
			height: 128px;
			resize: none;
			border: 0;
			outline: none;
		}
		.images{
			width: 100%;
			padding: 5px;
		}
		.images li{
			width: 33%;
			position: relative;
			img{
				max-width: 100px;
				max-height: 100px;
			}
		} 
		#upfile {
			display: none;
		}
		.toUp {
			display: block;
			width: 100px;
			height: 100px;
			padding: 1px;
			img{
				width: 100px;
				height: 100px;
			}
			
		}
		.shade{
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			margin: auto;
			width: 100px;
			height: 100px;
			background: #f2f2f2;
			.jindu{
				width: 100%;
				margin-top: 50%;
			}
		}
		
	}
</style>