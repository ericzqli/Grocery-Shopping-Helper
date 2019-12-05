
let list = [];

function app() {
	console.log("pretrain initialized");
	
	function addList(item) {
		if (!list.includes(item)) {
			list.push(item);
			console.log(list);
		}
		
	}
	function setCookie() {
		var cname = "List";
		var exdays = 7;
		
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+ d.toUTCString();
		document.cookie = cname + "=" + list.join() + ";" + expires + ";path=/";
	}

	document.getElementById('confirm').addEventListener('click', () => setCookie());
	document.getElementById('Potato').addEventListener('click', () => addList(1));
	document.getElementById('Tomato').addEventListener('click', () => addList(2));
	// document.getElementById('potato').addEventListener('click', () => addList("potato"));
	// document.getElementById('potato').addEventListener('click', () => addList("potato"));
	// document.getElementById('potato').addEventListener('click', () => addList("potato"));
	// document.getElementById('potato').addEventListener('click', () => addList("potato"));
	// document.getElementById('potato').addEventListener('click', () => addList("potato"));
	// document.getElementById('potato').addEventListener('click', () => addList("potato"));
	// document.getElementById('potato').addEventListener('click', () => addList("potato"));
	// document.getElementById('potato').addEventListener('click', () => addList("potato"));
	// document.getElementById('potato').addEventListener('click', () => addList("potato"));
	// document.getElementById('potato').addEventListener('click', () => addList("potato"));
}

app();