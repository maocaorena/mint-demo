<template>
	<div id="receiptAddress-handle">
		<!--{{ $route.params.handle}}-->
		<div class="content">
			<div class="addrMode-item flex flex-sc">
				<p>收货人</p>
				<input type="text" placeholder="收货人姓名" v-model="addrInfo.consignee"/>
			</div>
			<div class="addrMode-item flex flex-sc">
				<p>联系电话</p>
				<input type="text" placeholder="11位手机号码" v-model="addrInfo.mobile"/>
			</div>
			<div class="addrMode-item flex flex-sc">
				<p>所在地区</p>
				<input type="text" id="name" placeholder="请选择省市区" @click="selectCity" v-model="addrCity" readonly/>
			</div>
			<div class="addrMode-item flex flex-sc">
				<p>详细地址</p>
				<input type="text" placeholder="请填写详细地址" v-model="addrInfo.address"/>
			</div>
		</div>
	</div>
</template>

<script>
	import Picker from 'better-picker';
	import {city} from '../plugins/city/city.js';
	import '../plugins/city/picker.js';

	export default {
		data() {
			return {
				addrInfo: {}, //编辑地址
				addrCity: ''
			}
		},
		computed: {
			//新增地址
			addrAdd() {
				return this.$store.state.addrAdd;
			},
			//编辑地址
			addrMode() {
				return this.$store.state.addrMode;
			}
		},
		methods: {
			selectCity(){
				
			}
		},
		created() {
			this.addrInfo = this.addrMode;
			this.addrCity = this.addrInfo.province +' '+ this.addrInfo.city + ' ' + this.addrInfo.region;
		},
		mounted() {
			let that = this;
			var nameEl = document.getElementById('name');

			var first = []; /* 省，直辖市 */
			var second = []; /* 市 */
			var third = []; /* 区县 */

			var selectedIndex = [0, 0, 0]; /* 默认选中的地区 */

			var checked = [0, 0, 0]; /* 已选选项 */

			function creatList(obj, list) {
				obj.forEach(function(item, index, arr) {
					var temp = new Object();
					temp.text = item.name;
					temp.value = index;
					list.push(temp);
				})
			}

			creatList(city, first);

			if(city[selectedIndex[0]].hasOwnProperty('sub')) {
				creatList(city[selectedIndex[0]].sub, second);
			} else {
				second = [{
					text: '',
					value: 0
				}];
			}

			if(city[selectedIndex[0]].sub[selectedIndex[1]].hasOwnProperty('sub')) {
				creatList(city[selectedIndex[0]].sub[selectedIndex[1]].sub, third);
			} else {
				third = [{
					text: '',
					value: 0
				}];
			}

			var picker = new Picker({
				data: [first, second, third],
				selectedIndex: selectedIndex,
				title: '地址选择'
			});

			picker.on('picker.select', function(selectedVal, selectedIndex) {
				var text1 = first[selectedIndex[0]].text;
				var text2 = second[selectedIndex[1]].text;
				var text3 = third[selectedIndex[2]] ? third[selectedIndex[2]].text : '';
				that.addrCity = text1 + ' ' + text2 + ' ' + text3;
				that.addrInfo.province = text1;
				that.addrInfo.city = text2;
				that.addrInfo.region = text3;
			});

			picker.on('picker.change', function(index, selectedIndex) {
				if(index === 0) {
					firstChange();
				} else if(index === 1) {
					secondChange();
				};

				function firstChange() {
					second = [];
					third = [];
					checked[0] = selectedIndex;
					var firstCity = city[selectedIndex];
					if(firstCity.hasOwnProperty('sub')) {
						creatList(firstCity.sub, second);

						var secondCity = city[selectedIndex].sub[0]
						if(secondCity.hasOwnProperty('sub')) {
							creatList(secondCity.sub, third);
						} else {
							third = [{
								text: '',
								value: 0
							}];
							checked[2] = 0;
						}
					} else {
						second = [{
							text: '',
							value: 0
						}];
						third = [{
							text: '',
							value: 0
						}];
						checked[1] = 0;
						checked[2] = 0;
					}

					picker.refillColumn(1, second);
					picker.refillColumn(2, third);
					picker.scrollColumn(1, 0)
					picker.scrollColumn(2, 0)
				}

				function secondChange() {
					third = [];
					checked[1] = selectedIndex;
					var first_index = checked[0];
					if(city[first_index].sub[selectedIndex].hasOwnProperty('sub')) {
						var secondCity = city[first_index].sub[selectedIndex];
						creatList(secondCity.sub, third);
						picker.refillColumn(2, third);
						picker.scrollColumn(2, 0)
					} else {
						third = [{
							text: '',
							value: 0
						}];
						checked[2] = 0;
						picker.refillColumn(2, third);
						picker.scrollColumn(2, 0)
					}
				}

			});

			nameEl.addEventListener('click', function() {
				picker.show();
			});
		}
	}
</script>

<style lang="scss">
	#receiptAddress-handle {
		.content {
			top: 0;
			bottom: 0;
		}
		.addrMode-item {
			padding: 0 15px;
			width: 100%;
			border-bottom: 1px solid #f2f2f2;
			height: 50px;
			p {
				width: 86px;
				color: #666666;
				font-size: 13px;
			}
			input {
				border: none;
				outline: none;
				color: #111;
			}
			input::-webkit-input-placeholder {
				color: #aaa;
				font-size: 13px;
			}
		}
	}
</style>