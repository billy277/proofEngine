var chai 		= require('chai').should();
var setEngine 	= require('../../setEngine.js');
var proofEngine = require('../../proofEngine')
var Operations 	= require('../../operations.js');



var testUnion = function(setA, setB) {
	var name = setA.equivalents[0] + ' U ' + setB.equivalents[0];
	var res  = Operations.union(name, setA, setB);
	describe(name, function(){
		it("is a set", function(done){
			res.should.be.an.instanceOf(setEngine.Set);
			done();
		});

		it("has the right name", function(done){
			res.equivalents[0].should.equal(name);
			done();
		});

		it("has the right syntax", function(done){
			res.equivalents[1].should.deep.eql([setA.equivalents[0], 'U', setB.equivalents[0]]);
			done();
		});

		it("has the right elements", function(done){
			var pass = true;
			setA.elements.forEach(function(e, i, l) {
				if (res.elements.indexOf(e) < 0) {
					pass = false;
				}
			});
			pass.should.equal(true, "an element of " + setA.equivalents[0] + " is missing from the union");

			setB.elements.forEach(function(e, i, l) {
				if (res.elements.indexOf(e) < 0) {
					pass = false
				}
			});
			pass.should.equal(true, "an element of " + setB.equivalents[0] + " is missing from the union");

			res.elements.forEach(function(e, i, l) {
				if (setA.elements.indexOf(e) < 0 && setB.elements.indexOf(e) < 0) {
					pass = false;
				}
			});
			pass.should.equal(true, "an element of the union is missing from setA, or setB");
			done();
		});

		it("has the contains() method", function(done){
			res.should.respondTo('contains');
			res.should.have.property('contains').eql(proofEngine.contains);
			done();
		});

	}); 
};

var a = new setEngine.Set('testGroup','A'), b = new setEngine.Set('testGroup','B'), c = new setEngine.Set('testGroup','C');
var x = new setEngine.Element('x', a), y = new setEngine.Element('y', b), z = new setEngine.Element('z', c);
var union = Operations.union('a U b', a, b); 
var unionTwo = Operations.union('(a U b) U c', union, c);

console.log("\nx routes");
console.log(x.routes);
console.log("\ny routes");
console.log(y.routes);


describe('Union Operation Test', function(){
	describe('setUp', function(){
		it('sets loaded', function(){
			a.should.be.an.instanceOf(setEngine.Set);
			a.equivalents[0].should.a.be.equal('A');
			a.elements.length.should.a.be.equal(1);
			a.equivalents.length.should.a.be.equal(1);
			a.eqActiveIndex.should.a.be.equal(0);

			b.equivalents[0].should.a.be.equal('B');
			b.elements.length.should.a.be.equal(1);
			b.equivalents.length.should.a.be.equal(1);
			b.eqActiveIndex.should.a.be.equal(0);
		});

		it('elements loaded', function(done){
			x.name.should.equal('x');
			x.routes.should.deep.eql(
				[
					{
						groupName: 'testGroup',
						setName: 'A',
						elementIndex: 0
					},
					{
						groupName: 'union',
						setName: 'a U b', 
						elementIndex: 0
					},
					{
						groupName: 'union',
						setName: '(a U b) U c',
						elementIndex: 0
					}
				], 'x has incorrect routes'
			);

			y.name.should.equal('y');
			// y.routes.should.a.include(b.elements[y.routes[0].elementIndex].routes[1]);
			done();
		}); //End of elements loaded it()
	});
	describe('Unions:', function(){
		testUnion(a, b);
		testUnion(union, c);
		testUnion(unionTwo, c);
		testUnion(union, unionTwo);


				///////////////////////////
				// Hard Coded Test Cases //
				///////////////////////////

		// describe('Literal A U B', function() {

		// 	it('is a set', function(){
		// 		union.should.be.an.instanceOf(setEngine.Set);
		// 	});

		// 	it('has the right name', function(){
		// 		union.equivalents [0].should.a.be.eql('a U b', "Name failed to load");
		// 	});

		// 	it('has the right syntax', function(){
		// 		union.equivalents[1] = ['A', 'U', 'B'];
		// 	});

		// 	it('has the right elements', function(){
		// 		union.should.a.have.property('elements').eql([x,y]);
		// 	});

		// 	it('all eSets have correct active indices', function(){

		// 	});
		// 	it('has the contains() method', function(){
		// 		union.should.a.respondTo('contains');
		// 		union.should.a.have.property('contains').eql(proofEngine.contains);
		// 	});
		// });

		// describe('Literal (a U b) U c', function() {

		// 	it('is a set', function(){
		// 		unionTwo.should.be.an.instanceOf(setEngine.Set);
		// 	});

		// 	it('has the right name', function(){
		// 		unionTwo.equivalents[0].should.a.be.eql('(a U b) U c', "Name failed to load");
		// 	});

		// 	it('has the right syntax', function(){
		// 		unionTwo.equivalents[1] = [['A', 'U', 'B'], 'U', 'C'];
		// 	});

		// 	it('has the right elements', function(){
		// 		unionTwo.should.a.have.property('elements').eql([x,y, z]);
		// 	});

		// 	it('all eSets have correct active indices', function(){

		// 	});
		// 	it('has the contains() method', function(){
		// 		unionTwo.should.a.respondTo('contains');
		// 		unionTwo.should.a.have.property('contains').eql(proofEngine.contains);
		// 	});
		// });

	}); //End of Unions
}); //End of Union Operation Test