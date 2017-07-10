const Util = {
	myAlert: function(text, time) {
		if(!document.getElementById('alertBg')) {
			let _time = time || 1000;
			let parent = document.createElement('div');
			parent.setAttribute('id', 'alertBg');
			let child = document.createElement('p');
			child.setAttribute('class', 'text');
			let _text = document.createTextNode(text);
			child.appendChild(_text);
			parent.appendChild(child);
			document.body.appendChild(parent);
			setTimeout(() => {
				document.body.removeChild(parent);
			}, _time)
		};
	},
	trim: function(str) { //删除左右两端的空格
		return str.replace(/(^\s*)|(\s*$)/g, "");　　
	}
}

export {
	Util
}