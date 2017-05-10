/**
* Import DGT-NET Server Component
*/
let server = require('dgt-net').server
let packet = require('./packet')
let RemoteProxy = require('./remote')

/**
* Import MongoDB
*/
let mongo = require('./mongodb')

/**
* Initialize Server
*/
server.init = (port)=>{
  server.setRemoteProxyClass(RemoteProxy)
  server.setPacketObject(packet)
  server.listen(port)
  mongo.update('server',{ type:'gateway'},{port:port })
}
module.exports = server
