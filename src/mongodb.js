/**
* Initialize MongoDB
**/
let MongoClient = require('mongodb').MongoClient
let assert = require('assert')
const URI = 'mongodb://localhost:27017/warku'
MongoClient.connect(URI, (err, db) => {
  assert.equal(null, err)
  console.log('Connected to MongoDB '+URI);
  db.close()
})

/**
* Insert document to MongoDB
**/
let insert = (collection,data,cb) => {
  MongoClient.connect(URI,(err,db)=>{
    assert.equal(null, err)
    db.collection(collection).insertOne(data,(err,result)=>{
      assert.equal(err, null)
      if (cb)
        cb(result)
      db.close()
    })
  })
}

/**
* Update document to MongoDB
**/
let update = (collection,target,data,cb) => {
  MongoClient.connect(URI,(err,db)=>{
    assert.equal(null, err)
    db.collection(collection).updateOne(target,
      {
        $set: data,
        $currentDate: { "lastModified": true }
      },{
        upsert:true
      }, (err,result) => {
        assert.equal(err, null)
        if (cb)
          cb(result)
        db.close()
      })
  })
}

/**
* Remove document from MongoDB
**/
let remove = (collection,target,cb) => {
  MongoClient.connect(URI, (err, db) => {
    assert.equal(null, err);
    db.collection(collection).deleteOne(target,(err,result) => {
      assert.equal(err, null)
      if (cb)
        cb(result)
      db.close()
    })
  })
}

/**
* Find document from MongoDB
*/
let find = (collection,target,cb) =>{
  MongoClient.connect(URI, (err, db) => {
    assert.equal(null, err);
    db.collection(collection).find(target).toArray((err,results)=>{
      assert.equal(err, null)
      if (cb)
        cb(results);
      db.close()
    })
  })
}

module.exports = {
  insert : insert,
  update : update,
  remove : remove,
  find : find
}
