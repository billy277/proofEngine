function drag(ev){
	ev.dataTransfer.setData('text', ev.target.id);
	console.log("drag fired");
};

function drop(ev){
	console.log("drop started");
	ev.preventDefault();
	var data  = ev.dataTransfer.getData('text');
	console.log(data + " :data");
	ev.target.appendChild(document.getElementById(data));
	console.log("drop fired");

};

function dragover(ev){
	ev.preventDefault();
	console.log("dragover fired");
};

