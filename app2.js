var app = require("./app.js"); //requring a module......has access to the exports

	var check = 1;
	exports.check = check;

module.exports =  app.message; // changing the exports of this current module

/*Changing the exports means that all that was added to the exports beforehand is no longer available*/