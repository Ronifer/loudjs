const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const loudness = require('loudness')
const port = new SerialPort('/dev/ttyACM0', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));
// Read the port data

var currentVolume = null;
port.on("open", () => {
  console.log('serial port open');
  loudness.getVolume().then(resp => {
    currentVolume = resp;
  })
});
parser.on('data', data => {
  if(currentVolume){
    let volume = parseInt(data)
    if(currentVolume != volume) {
      loudness.setVolume(volume)
      currentVolume = volume
    }
  } 
});