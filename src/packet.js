/**
* Import Packet Writer
**/
let PacketWriter = require('dgt-net').packet_writer

/**
* Define Packet ID
**/
let packet = {
  CLIENT_REQUEST_AUTHENTICATION : 10000,

  SERVER_RESPONSE_AUTHENTICATION_SUCCESSFUL : 20000,
  SERVER_RESPONSE_DUPLICATE_AUTHENTICATION : 20001
}

/**
* Receive authentication request from client
**/
packet[packet.CLIENT_REQUEST_AUTHENTICATION] = (remote,pr) => {
  let username = pr.read_string()
  remote.authenticate(username)
}

/**
* Response Client that Authentication is Successful
**/
packet.responseAuthenticationSuccess = (username,worldPort,combatPort,positionPort,statisticPort)=>{
  let pw = new PacketWriter(packet.SERVER_RESPONSE_AUTHENTICATION_SUCCESSFUL)
  pw.append_string(username)
  pw.append_uint16(worldPort)
  pw.append_uint16(combatPort)
  pw.append_uint16(positionPort)
  pw.append_uint16(statisticPort)
  pw.finish()
  return pw.buffer
}

/**
* Response Client that there is duplication authentication
**/
packet.responseDuplicateAuthentication = ()=>{
  let pw = new PacketWriter(packet.SERVER_RESPONSE_DUPLICATE_AUTHENTICATION)
  pw.finish()
  return pw.buffer
}
module.exports = packet;
