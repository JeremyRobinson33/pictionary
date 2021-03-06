var express = require('express'), 
    app = express(),
    http = require('http'),
    socketIo = require('socket.io');

// start webserver on port 8080
var server =  http.createServer(app);
var io = socketIo.listen(server);
server.listen(8080);
// add directory with our static files
app.use(express.static(__dirname + '/public'));
console.log("Server running on 127.0.0.1:8080");

// array of all lines drawn
var line_history = [];
var guess_history = [];

// event-handler for new incoming connections
io.on('connection', function (socket) {

   // first send the history to the new client
   for (var i in line_history) {
      socket.emit('draw_line', { line: line_history[i] } );
   }
   for(var i in guess_history) {
       socket.emit('guess', {guess: guess_history[i]})
   }

   // add handler for message type "draw_line".
   socket.on('draw_line', function (data) {
      // add received line to history 
      line_history.push(data.line);
      // send line to all clients
      io.emit('draw_line', { line: data.line });
   });

   socket.on('clearit', function(){
        line_history = [];
        io.emit('clearit', true);
        console.log("clear");
    });

   socket.on('guess', function(data) {
       console.log(data.guess);
       //add received guess to history
       guess_history.push(data.guess);
       //send guess to all clients
       io.emit('guess', {guess: data.guess});
   })
});