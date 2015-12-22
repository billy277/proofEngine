function drag(ev){
	ev.dataTransfer.setData('text/html', ev.target);
};

function drop(ev){
	ev.preventDefault();
	var data  = ev.dataTransfer.getData('text/html');
	ev.target.(document.getElementById(data));
};

function dragover(ev){
	ev.preventDefault();
};

