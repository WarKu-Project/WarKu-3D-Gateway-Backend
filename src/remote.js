/**
* Import RemoteProxy
**/
let RemoteProxy = require('dgt-net').server.RemoteProxy

/**
* Import Packet and MongoDB
**/
let packet = require('./packet')
let mongodb = require('./mongodb')

/**
* Define Class Client
**/
class Client extends RemoteProxy {

  /**
  * Call when Client connects to Server
  **/
  onConnected() {
    console.log("New client connects from " + this.getPeerName())
  }
  /**
  * Call when Client disconnects from Server
  **/
  onDisconnected() {
    console.log("Client disconnects from " + this.getPeerName())
  }

}

module.exports = Client
