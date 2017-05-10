/**
* Import RemoteProxy
**/
let RemoteProxy = require('dgt-net').server.RemoteProxy

/**
* Import Packet and MongoDB
**/
let packet = require('./packet')
let mongodb = require('./mongodb')
let Array = require('./util/array')

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
    this.logout()
  }
  /**
  * Authenticate Client
  **/
  authenticate(username) {
    this.username = username
    let self = this
    mongodb.update('user',{username : this.username},{status:'Running'},()=>{
      self.assignServerPort()
    })
  }
  /**
  * Logout User from server
  **/
  logout(){
    let self = this
    mongodb.update('user',{username : this.username},{status:'Disconnected'},()=>{
      console.log(self.username+' is disconnected');
    })
  }
  /**
  * Notify Client that authentication is successful
  **/
  notifyAuthenticationSuccessful(worldPort,combatPort,positionPort,statisticPort){
    this.send(packet.responseAuthenticationSuccess(worldPort,combatPort,positionPort,statisticPort))
  }
  /**
  * Notify Client that there is duplicate authentication
  **/
  notifyDuplicateAuthentication(){
    this.send(packet.responseDuplicateAuthentication())
  }
  /**
  * Find and assign port for client
  **/
  assignServerPort(){
    let self = this
    mongodb.find('server',{type:'world'},(results)=>{
      let worldPort = 0
      if (results.length > 0) worldPort = Array.getMin(results,'time','response').port
      mongodb.find('server',{type:'combat'},(results)=>{
        let combatPort = 0
        if (results.length > 0) combatPort = Array.getMin(results,'time','response').port
        mongodb.find('server',{type:'position'},(results)=>{
          let positionPort = 0
          if (results.length > 0) positionPort = Array.getMin(results,'time','response').port
          mongodb.find('server',{type:'statistic'},(results)=>{
            let statisticPort = 0
            if (results.length > 0) statisticPort = Array.getMin(results,'time','response').port
            self.notifyAuthenticationSuccessful(worldPort,combatPort,positionPort,statisticPort)
          })
        })
      })
    })
  }

}

module.exports = Client
