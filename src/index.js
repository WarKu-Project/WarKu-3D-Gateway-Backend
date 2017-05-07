//import library
let server = require('dgt-net').server
let packet = require('./packet')
let RemoteProxy = require('./remote')

//Initialize MongoDB
let mongo = require('./mongodb')

//Initialize Log
let log = require('./util/log')

//Initialize Server
var PORT = 1000

server.setRemoteProxyClass(RemoteProxy)
server.setPacketObject(packet)
server.listen(PORT)
mongo.update('server',{ type:'gatway', port:PORT},{type:'gateway', port:PORT })
log.insert('gateway-server-'+PORT,'Initialize Gateway Server')
