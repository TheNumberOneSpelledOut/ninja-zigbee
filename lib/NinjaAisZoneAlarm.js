var util = require('util'),
    stream = require('stream'),
    helpers = require('./helpers');

module.exports = NinjaAisZoneAlarm
util.inherits(NinjaAisZoneAlarm,stream);

//SRPC header bit positions
var SRPC_CMD_ID_POS = 0;
var SRPC_CMD_LEN_POS = 1;

//define incoming RPCS command ID's
var RPCS_CLOSE              = 0x80;
var RPCS_GET_DEVICES        = 0x81;
var RPCS_SET_DEV_STATE      = 0x82;
var RPCS_SET_DEV_LEVEL      = 0x83;
var RPCS_SET_DEV_COLOR      = 0x84;
var RPCS_GET_DEV_STATE      = 0x85;
var RPCS_GET_DEV_LEVEL      = 0x86;
var RPCS_GET_DEV_HUE        = 0x87;
var RPCS_GET_DEV_SAT        = 0x88;
var RPCS_BIND_DEVICES       = 0x89;
var RPCS_GET_THERM_READING  = 0x8a;
var RPCS_GET_POWER_READING  = 0x8b;
var RPCS_DISCOVER_DEVICES   = 0x8c;
var RPCS_SEND_ZCL           = 0x8d;
var RPCS_GET_GROUPS         = 0x8e;
var RPCS_ADD_GROUP          = 0x8f;
var RPCS_GET_SCENES         = 0x90;
var RPCS_STORE_SCENE        = 0x91;
var RPCS_RECALL_SCENE       = 0x92;
var RPCS_IDENTIFY_DEVICE    = 0x93;
var RPCS_CHANGE_DEVICE_NAME = 0x94;
var RPCS_REMOVE_DEVICE      = 0x95;

//SRPC AfAddr Addr modes ID's
var AddrNotPresent = 0;
var AddrGroup = 1;
var Addr16Bit = 2;
var Addr64Bit = 3;
var AddrBroadcast = 1;


function NinjaAisZoneAlarm(logger,device) {

  // Features of this device
  this.readable = true;
  this.writeable = true;
  this.log = logger;

  // Ninja config
  this.V = 0;
  this.D =5; //push button
  //this.D = 209; //Jiggle widget
  this.G = device.nwkAddr.toString()+device.endPoint.toString()+"5";

  this.zigbee = device;

  device.ninja = this;
  var self = this;
  
  this.log.info('sending a jiggle to '+this.zigbee.type);
  
  setTimeout(function(){
    self.emit('data', '0')
  },1000);  
    
};

NinjaAisZoneAlarm.prototype.write = function(data) {
  var dataObject = JSON.parse(data);

  this.log.debug('Can not actuate '+this.zigbee.type);

  this.emit('data',data);

  return true;
};

NinjaAisZoneAlarm.prototype.end = function() {};
NinjaAisZoneAlarm.prototype.close = function() {};