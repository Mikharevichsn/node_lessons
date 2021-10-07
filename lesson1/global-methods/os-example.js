const os = require('os');

console.log(os.hostname());
console.log(os.homedir());
console.log(os.type());
console.log(os.platform());
console.log(os.release());
console.log((os.uptime() / 60 / 60).toFixed(2));
console.log(os.arch());
console.log(os.cpus().length);
console.log((os.totalmem() / 1e9).toFixed(2));
console.log((os.freemem() / 1e9).toFixed(2));