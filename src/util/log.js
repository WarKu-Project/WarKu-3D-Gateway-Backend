//import mongodb
let mongodb = require('../mongodb')

//Log Function
let insertLog = (tag,msg)=>{
  const data = {
    tag : tag,
    msg : msg
  }
  mongodb.update('log',data,data)
}

module.exports = {
  insert : insertLog
}
