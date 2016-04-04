var Recorder = require('./recorder');
var DURATION = 1;

var audioContext = new AudioContext();
var button = document.getElementById('startButton');

// just play a simple test sound. send it to the speakers
var oscillator = audioContext.createOscillator();
oscillator.type = 'sawtooth';
oscillator.connect(audioContext.destination);

// capture output on the last node before the destination
var rec = new Recorder(oscillator);

// process output
// todo: send to backend
function processOutput(blob) {
  console.log('exported %s bytes', blob.size);
  Recorder.forceDownload(blob);
  var req = new XMLHttpRequest();
  req.open('POST', '/convert', true);
  req.onload = function (e) {
    console.log('uploaded')
  };
  req.send(blob);
}

// setup audio recording and start playback
function playAndRecord() {
  // setup audio recording
  rec.record();
  setTimeout(function() {
    rec.stop();
    rec.exportWAV(processOutput);
  }, DURATION * 1000);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + DURATION);
}

button.addEventListener('click', playAndRecord);
