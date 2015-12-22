var app 		= angular.module('homepage', []);
var operations 	= require('../operations.js');
var setEngine 	= require('../setEngine.js');

// // app.controller("proofController", function($scope){
// // 	this.oldSets	 = [];
// // 	this.elements	 = [];
// // 	this.newSets	 = [];
// // 	this.selectedSets = [];
// // 	this.groupname = 'group';

// 	var A = new setEngine.Set(this.groupname, 'A');
// 	var B = new setEngine.Set(this.groupname, 'B');
// 	var C = new setEngine.Set(this.groupname, 'C');
// 	var x = new setEngine.Element('x', A);
// 	var y = new setEngine.Element('y', B);
// 	var z = new setEngine.Element('z', C);

// 	this.oldSets.push(A);
// 	this.oldSets.push(B);
// 	this.oldSets.push(C);

// 	this.elements.push(x);
// 	this.elements.push(y);
// 	this.elements.push(z);

// 	// this.drag = function (ev){
// 	// ev.dataTransfer.setData('text/html', ev.target);
// 	// };

// 	// this.drop = function (ev){
// 	// 	ev.preventDefault();
// 	// 	var data  = ev.dataTransfer.getData('text/html');
// 	// 	ev.target.appendChild(document.getElementById(data));
// 	// };

// 	// this.dragover = function (ev){
// 	// 	ev.preventDefault();
// 	// };



// 	this.clicked = function (set){
// 		console.log("clicked");
// 		console.log("Set: " + set)
// 		newSets.push(set);
// 		console.log("new sets: "+ newSets);
// 		console.log("selectedSets: " +selectedSets);
// 	}
// });