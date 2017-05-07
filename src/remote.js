//import library
let RemoteProxy = require('dgt-net').server.RemoteProxy

let packet = require('./packet')
let mongodb = require('./mongodb')
let log = require('./util/log')

class Client extends RemoteProxy {

  //conneciton
  onConnected() {
    console.log("RemoteProxy There is a connection from " + this.getPeerName())
    log.insert('gateway-server',this.getPeerName()+' is connected to Gateway Server')
  }
  onDisconnected() {
    console.log("RemoteProxy Disconnected from " + this.getPeerName())
    this.logout()
    log.insert('gateway-server',this.getPeerName()+' is disconnected from Gateway Server')
  }

  //authentication
  onLogin(username){
    mongodb.find(this,'user',{user:username,state:'Running'},(self,results)=>{
      if (results.length==0)
        this.login(username)
      else
        this.notifyDuplicateLogin(username)
    })
  }
  login(username) {
    this.user = username
    mongodb.update('user',{user:username},{state:'Running'})
    log.insert('gateway-server-auth',this.user+' login.')
    this.send(packet.notifyLoginSuccess(username))
  }
  notifyDuplicateLogin(username) {
    log.insert('gateway-server-auth','Duplicate Login occur on '+username)
    this.send(packet.notifyDuplicateLogin(username))
  }
  logout() {
    mongodb.update('user',{user:this.user},{state:'Disconnected'})
    log.insert('gateway-server-auth',this.user+' logout from server')
  }
}

module.exports = Client
