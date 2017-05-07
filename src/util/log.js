//import mongodb
let mongodb = require('../mongodb')

//Log Function
let insertLog = (tag,msg)=>{
  const data = {
    time : new Date().toLocaleString(),
    tag : tag,
    msg : msg
  }
  mongodb.insert('log',data)
}

module.exports = {
  insert : insertLog
}
