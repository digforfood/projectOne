var express = require('express'),
    app = express(),
    port = 3000,
    colors = require('colors');

app.use(express.static(__dirname + '/client'));

app.listen(port);
console.log('\nStart listning on: ' + port.toString().yellow.bold);