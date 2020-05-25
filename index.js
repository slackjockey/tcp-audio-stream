
const Path = require('path');
const PortAudio = require('naudiodon');

const libPath = Path.join(__dirname, 'lib');
const Server = require(Path.join(libPath, 'server.js'));
const Client = require(Path.join(libPath, 'client.js'));

//console.log(PortAudio.getDevices());
//console.log(PortAudio.getHostAPIs());

const inpEngine = new PortAudio.AudioIO({
  inOptions: {
    channelCount: 2,
    sampleFormat: PortAudio.SampleFormat16Bit,
    sampleRate: 22000,
    deviceId: -1, // default device
  },

});

const outpEngine = new PortAudio.AudioIO({
  outOptions: {
    channelCount: 2,
    sampleFormat: PortAudio.SampleFormat16Bit,
    sampleRate: 22000,
    deviceId: -1, // default device.
    closeOnError: true, // debug!
    //closeOnError: false,
  },

});


const server = new Server(outpEngine);
const client = new Client(inpEngine);

process.on('exit', server.stop.bind(server));       // cleanup

process.on('SIGINT', process.exit.bind(process));   // exit
process.on('SIGUSR1', process.exit.bind(process));  // exit
process.on('SIGUSR2', process.exit.bind(process));  // exit



const port = 29577;
const host = '0.0.0.0';


server.start(port, host);

client.connect(host, port);

