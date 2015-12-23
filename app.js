var app 		= angular.module('homepage', []);
var operations 	= require('./operations.js');
var setEngine 	= require('./setEngine.js');
var drag 		= require('./drag.js');


app.controller("proofController", function($scope){
	this.oldSets	 = [];
	this.elements	 = [];
	this.newSets	 = [];
	this.selectedSets = [];
	this.groupname = 'group';
	this.drag = drag.drag;
	this.dragover = drag.dragover;
	this.drop = drag.drop;

	var A = new setEngine.Set(this.groupname, 'A');
	var B = new setEngine.Set(this.groupname, 'B');
	var C = new setEngine.Set(this.groupname, 'C');
	var x = new setEngine.Element('x', A);
	var y = new setEngine.Element('y', B);
	var z = new setEngine.Element('z', C);
	var P = new SetEngine.Set('selected', 'P');

	this.oldSets.push(A);
	this.oldSets.push(B);
	this.oldSets.push(C);

	this.elements.push(x);
	this.elements.push(y);
	this.elements.push(z);

	this.selectedSets.push(P);

});