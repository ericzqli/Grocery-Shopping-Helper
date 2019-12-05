
let list = [];
let dict = {};
dict["1"] = "https://i.ibb.co/yy3zwJs/1.jpg";
dict["2"] = "https://i.ibb.co/641h4wt/2.jpg";
dict["3"] = "https://i.ibb.co/pWmQJhs/3jpg.jpg";
dict["4"] = "https://i.ibb.co/f0rgrz7/4.jpg";
dict["5"] = "https://i.ibb.co/8YBhFqK/5.jpg";

function app() {
	console.log("pretrain initialized");
	
	function addList(item) {
		var url = dict[item];
		
		list.push(url);
		console.log(list);
		
		
	}
	function setCookie() {
	
		window.close();
	}
	window.onbeforeunload=function(){
		var cname = "List";
		var exdays = 7;
		
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+ d.toUTCString();
		document.cookie = cname + "=" + list.join() + ";" + expires + ";path=/";
	}



	document.getElementById('confirm').addEventListener('click', () => setCookie());
	 document.getElementById('Potato').addEventListener('click', () => addList('1'));
	 document.getElementById('Tomato').addEventListener('click', () => addList('2'));
	 document.getElementById('Mushroom').addEventListener('click', () => addList('3'));
	 document.getElementById('Spinach').addEventListener('click', () => addList('4'));
	 document.getElementById('Bell pepper').addEventListener('click', () => addList('5'));
	 document.getElementById('Apple').addEventListener('click', () => addList('6'));
	 document.getElementById('Banana').addEventListener('click', () => addList('7'));
	 document.getElementById('Orange').addEventListener('click', () => addList('8'));
	 document.getElementById('Watermelon').addEventListener('click', () => addList('9'));
	 
}

app();