var app 		= angular.module('homepage', []);


var dragover = function(ev){
	ev.preventDefault();
	console.log("dragover fired");
};

var drag = function(ev){
	ev.dataTransfer.clearData()
	ev.dataTransfer.setData('text', ev.target.id);
	ev.dataTransfer.setData('set', ev.target.classList[0]);
	ev.dataTransfer.setData('index', ev.target.classList[2]);
	console.log("drag fired");

};

app.controller("proofController", function($scope){
	this.oldSets	 = [];
	this.elements	 = [];
	this.newSets	 = [];
	this.selectedSets = [];
	this.groupname = 'group';


	var A = new Set(this.groupname, 'A');
	var B = new Set(this.groupname, 'B');
	var C = new Set(this.groupname, 'C');
	var x = new Element('x', A);
	var y = new Element('y', B);
	var z = new Element('z', C);
	

	this.oldSets.push(A);
	this.oldSets.push(B);
	this.oldSets.push(C);

	this.elements.push(x);
	this.elements.push(y);
	this.elements.push(z);
	
	this.drop = function(ev){
		ev.preventDefault();
		var data = ev.dataTransfer.getData('text');
		var set = ev.dataTransfer.getData('set');
		var index = ev.dataTransfer.getData('index');
		console.log(index);
		console.log(set);

		if(set=="oldSets"){
			$scope.pC.selectedSets.push($scope.pC.oldSets.splice(index, 1)[0]);
			console.log($scope.pC.oldSets);
			$scope.$apply();
		}
		else if (set=="elements"){
			$scope.pC.selectedSets.push($scope.pC.elements.splice(index, 1)[0]);
			$scope.$apply();
		}
		else {
			$scope.pC.selectedSets.push($scope.pC.newSets.splice(index, 1)[0]);
			$scope.$apply();
		}
		
		console.log("drop FIRED");
	};

	
	this.unioncall = function(){
		
		var unionset = union($scope.pC.selectedSets[0].equivalents[0]+'U'+$scope.pC.selectedSets[1].equivalents[0],$scope.pC.selectedSets[0],$scope.pC.selectedSets[1]);
		console.log("Unionset: "+unionset);
		$scope.pC.newSets.push(unionset);
		console.log("selectedsets: "+ $scope.pC.selectedSets.length);
		console.log("oldSets: "+ $scope.pC.oldSets);
		$scope.pC.oldSets.push($scope.pC.selectedSets.splice(0,$scope.pC.selectedSets.length)[0]);
		$scope.$apply();
		console.log("new sets are as follows: "+$scope.pC.newSets)

	};

	this.putIncall = function(){
		if($scope.pC.selectedSets[0].equivalents[0]!= null){
			$scope.pC.selectedSets[0].putIn($scope.pC.selectedSets[1]);
			// console.log($scope.pC.selectedSets[0]);
			$scope.pC.newSets.push($scope.pC.selectedSets[0]);
			$scope.pC.oldSets.push($scope.pC.selectedSets.splice(0,1)[0]);
			$scope.pC.elements.push($scope.pC.selectedSets.splice(1,1)[0]);
			$scope.$apply();

		}
		else{
			$scope.pC.selectedSets[1].putIn($scope.pC.selectedSets[0]);
			// console.log($scope.pC.selectedSets[1]);
			$scope.pC.newSets.push($scope.pC.selectedSets[1]);
			$scope.pC.oldSets.push($scope.pC.selectedSets.splice(1,1)[0]);
			$scope.pC.elements.push($scope.pC.selectedSets.splice(0,1)[0]);
			$scope.$apply();
		}
	}


});

