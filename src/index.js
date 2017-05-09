/**
* Assign PORT to process
**/
process.PORT = 1000

/**
* Initialize Server
**/
let server = require('./server')
server.init(process.PORT)
