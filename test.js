var EventEmitter = require('events').EventEmitter;

var opts = {};

var app = new EventEmitter();
app.log = {
    debug: console.log,
    info: console.log,
    warn: console.log,
    error: console.log
};

var driver = new (require('./index'))(opts, app);

driver.on('register', function(device) {
    console.log('Driver.register', device);
    device.on('data', function(value) {
        console.log('Device.emit data', value);
    });
    if (device.D == 224) { //It's a light
      setTimeout(function() {
         device.write({bri:254,sat:254,hue:0,on:true});
      }, 2000)
    }
});

driver.save = function() {
    console.log('Saved opts', opts);
};

setTimeout(function() {
    app.emit('client::up');
}, 500);
