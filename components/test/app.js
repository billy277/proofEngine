var app 		= angular.module('homepage', []);
var operations 	= require('../../operations.js');
var setEngine 	= require('../../setEngine.js');

var dragover = function(ev){
	ev.preventDefault();
	console.log("dragover fired");
};

var drag = function(ev){
	ev.dataTransfer.clearData()
	ev.dataTransfer.setData('text', ev.target.id);
	console.log("drag fired");
};

app.controller("proofController", function($scope){
	this.oldSets	 = [];
	this.elements	 = [];
	this.newSets	 = [];
	this.selectedSets = [];
	this.groupname = 'group';


	var A = new setEngine.Set(this.groupname, 'A');
	var B = new setEngine.Set(this.groupname, 'B');
	var C = new setEngine.Set(this.groupname, 'C');
	var x = new setEngine.Element('x', A);
	var y = new setEngine.Element('y', B);
	var z = new setEngine.Element('z', C);
	var P = new setEngine.Set('selected', 'P');

	this.selectedSets.push(P);
	this.oldSets.push(A);
	this.oldSets.push(B);
	this.oldSets.push(C);

	this.elements.push(x);
	this.elements.push(y);
	this.elements.push(z);
	
	this.drop = function(ev){
		ev.preventDefault();
		var data = ev.dataTransfer.getData('text');
		$scope.pC.selectedSets.push($scope.pC.oldSets.splice(index, 1)[0]);
		$scope.$apply();
	}

	



});

