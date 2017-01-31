var WebServ = function() {
	this.express = require('express');
	this.app = this.express();
	this.port = 8888;
	this.colors = require('colors');

	this.app.use(this.express.static(__dirname + '/client'));

	this.listen = function() {
		this.app.listen(this.port);
		console.log('\nStart listning on: ' + this.port.toString().yellow.bold);
	}
}

module.exports = WebServ;
