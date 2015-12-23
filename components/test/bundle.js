(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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


},{"../../operations.js":2,"../../setEngine.js":4}],2:[function(require,module,exports){
var setEngine = require('./setEngine.js');

//Returns the union of two sets (another set) with the given name
var union = function(name, x, y) {
	var unionSyntax = [x.equivalents[x.eqActiveIndex], 'U', y.equivalents[y.eqActiveIndex]];
	var res = new setEngine.Set("union", name, unionSyntax);
	//Put everything from x into res
	x.elements.forEach(function(e, i, list) {
		e.routes.push(new setEngine.setRoute(res));
		res.elements.push(e);
	});

	//Put elements of y not already in res into res
	y.elements.forEach(function(e, i, list) {
		var goesIn = true;
		res.elements.forEach(function(el, index) {
			if (e.name === el.name) {
				goesIn = false;
			}
		});
		if (goesIn) {
			e.routes.push(new setEngine.setRoute(res));
			res.elements.push(e);
		}
	});

	return res;
}


module.exports = {
	union: union
}				
},{"./setEngine.js":4}],3:[function(require,module,exports){
//Function that verifies if an element is in a given atmoic set (A set represented by its own name, not the result of an operation of other sets), 
//based on an array of facts,each of which is a 3 element array like ['x', 'isAnElementOf', 'A']
//Returns true if element is verifiably in the set, and false otherwise
var inAtomic = function(eName, setName, facts) {
	var res = false;
	facts.forEach(function(fact, index, list) {
		if (fact[0] === eName && fact[1] === 'isAnElementOf' && fact[2] === setName) {
			res = true; //Only return true if one of the facts is that element is a member of set
		}
	});
	return res;
};




//Function that verifies if an element is in any set based on
//an array of facts. Element obj's are defined above, and facts are explained in the above comment.

//The Syntax argument is a 3-element array, where the first and third elements are syntactic representations
//of sets; either a string (set's name), or another syntax array. The second element is a string representing the operation.
//Syntax arrays represent the set that results from an operation sets. A U (B n C) = ['A', 'U', ['B', 'n', C]]
var contains = function(eName, syntax, facts) {
	var inFirst  = false;
	var inSecond = false;

	//Is element in the first set?
	switch (typeof(syntax[0])) {
		case 'string':
			inFirst = inAtomic(eName, syntax[0], facts);
			break;
		case 'object':
			inFirst = contains(eName, syntax[0], facts);
			break;
	}

	//Is element in the second set?
	switch (typeof(syntax[2])) {
		case 'string':
			inSecond = inAtomic(eName, syntax[2], facts);
			break;
		case 'object':
			inSecond = contains(eName, syntax[2], facts);
			break;
	}

	//Return true or false, based on inFirst, inSecond, and the set operator (syntax[1])
	switch (syntax[1]) {
		case 'U': //Definition of Union operator
			return inFirst || inSecond;
			break;
		case 'n': //Definition of Intersect operator
			return inFirst && inSecond;
			break;
		case '/': //Definition of Set Difference operator
			return inFirst && (!inSecond);
	}

};



module.exports =  {
	inAtomic: inAtomic,
	contains: contains
}
},{}],4:[function(require,module,exports){
var proofEngine = require('./proofEngine.js');

var Set = function (groupName, name, firstEquivalence) {
	// All sets exist within named array within the universe object 
	// (which is instantiated on the front end)
	this.groupName = groupName;

	//List of syntax (array) representations of the set
	this.equivalents = [name]; 
	this.elements = [];
	
	// If the set is the product of an operation between other sets
	if (firstEquivalence) {
		//Add that operation's syntax (array) representation to the set's equivalents
		this.equivalents.push(firstEquivalence);
	}
	this.eqActiveIndex = 0;


};

Set.prototype.contains = proofEngine.contains;

//Puts an element in a Set's elements attribute
Set.prototype.putIn = function(element) {
	var set = this;
	element.routes.push(new setRoute(set));
	this.elements.push(element);
}


//  Abstract class that relates an element to a set
//  that contains it
var setRoute = function (set) {
	this.groupName 		= set.groupName;
	this.setName		= set.equivalents[0];
	this.elementIndex 	= set.elements.length; //Index of particular element for which this eSet exists within set/eSet
}

// var cpShell = function (shell) {
// 	this.equivalents = shell.equivalents;
// 	this.eqActiveIndex = shell.eqActiveIndex;
// 	this.elementIndex = shell.elementIndex;
// };



//  Element objects are placed in the elements (array) attribute
//	of varius sets. Each element must be in at least one set.
//	
//	the routes (array) attrubute is a list of
//  representations of relationships to the sets
//	in which the Element resides.
var Element = function (name, set) {
	this.name = name;
	var firstRoute = new setRoute(set);
	this.routes = [];
	this.routes.push(firstRoute);
	set.elements.push(this);
}



module.exports = {
	Set: 	  Set,
	Element:  Element,
	setRoute: setRoute
};
},{"./proofEngine.js":3}]},{},[1]);
