
var app = require('./app.js'); // requiring the app module
var app2 = require('./app2.js'); // requiring the app module


var	foo = 'bar'; 
var	beverages = { tea: [ 'chai', 'matcha', 'oolong' ]};



var assert = require('chai').assert;
var expect = require('chai').expect;
//should style is a property of the element itself
var should = require('chai').should(); 

describe('Array of Tests', function() {
    describe('Tests of mocha', function () {
        it('Mocha Has Loaded!', function () {
		  assert.equal(2,2,'Chai Has Loaded!')
        })
        describe('Tests of Chai', function(){
            it('loaded the assert', function (){
        		assert.typeOf(foo, 'string'); // without optional message
        		assert.equal(3+3,6,'messsaaaaaaage');
        		assert.lengthOf(beverages.tea,3, 'this is the length'); 
            })
            it('loaded the expect', function(){
            	expect(foo).to.be.a('string');//is foo a string
        		expect(beverages).to.have.property('tea').with.length(3);
            })
            it('loaded the should', function(){
            	foo.should.be.a('string');
        		foo.should.equal('bar');
        		foo.should.have.length(3);
        		beverages.should.have.property('tea').with.length(3);
            })
        })
        describe('Tests of the proofEngine', function(){
            it('Tests the math game itself', function(){
                expect(app).to.have.property('test')
                app.test2.should.equal(2)
            })  
        })
        describe('test of creating, exporting, and  linking modules in java', function(){
            it('app2.exports is changed', function(){
                app2.should.equal("testmessage")
            })
        /*
        if you comment this out we get an error becuase after app2.exports is changed, the previous contents are lost
        it('Have access to the original exports of app2 before the change', function(){
            app2.check.should.equal(1);
        })
        */
        })
  });
});

