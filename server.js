var express = require('express');
var fs = require('fs');

var app = express();
var PORT = process.env.PORT || 5000;

app.use(express.static(__dirname));

// how to handle the receiving end. this just pipes the data
// it receives into a file on disk. Alternatively transcode it and
// send the result back to the client.
app.post('/convert', function(req, res, next) {
  console.log('receiving');
  var outStream = fs.createWriteStream('./output.wav');

  outStream.on('close', function() {
    console.log('all good');
    res.status(200).end('OK')
  });

  outStream.on('error', function(err) {
    console.error(err);
    res.status(500).end(err.message);
  });

  req.pipe(outStream);
});

app.listen(PORT, function() {console.log('on http://localhost:' + PORT)});
