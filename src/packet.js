//import library
let PacketWriter = require('dgt-net').packet_writer

//define packet
let packet = {
  C_LOGIN : 10000,

  S_NOTIFY_LOGIN_SUCCESS : 20000,
  S_NOTIFY_DUPLICATE_LOGIN : 20001
}

//authentication
packet[packet.C_LOGIN] = (remote,pr) =>{
  let username = pr.read_string()
  remote.onLogin(username)
}
packet.notifyLoginSuccess = (username,worldPort,positionPort,combatPort,statPort)=>{
  let pw = new PacketWriter(packet.S_NOTIFY_LOGIN_SUCCESS)
  pw.append_string(username)
  pw.append_uint16(worldPort)
  pw.append_uint16(positionPort)
  pw.append_uint16(combatPort)
  pw.append_uint16(statPort)
  pw.finish()
  return pw.buffer
}
packet.notifyDuplicateLogin = (username)=>{
  let pw = new PacketWriter(packet.S_NOTIFY_DUPLICATE_LOGIN)
  pw.append_string(username)
  pw.finish()
  return pw.buffer
}
module.exports = packet;
