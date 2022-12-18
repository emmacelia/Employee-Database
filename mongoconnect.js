var mySQLDAO = require("./sqlconnect");
const MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb://localhost:27017')
    .then((client) => {
        db = client.db('employeesDB')
        coll = db.collection('employees')
    })
    .catch((error) => {
        console.log(error.message)
    })

var findAll = function () {
    //.getUpdate();
    return new Promise((resolve, reject) => {
        var cursor = coll.find()
        cursor.toArray()
            .then((documents) => {
                resolve(documents)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

var addEmployee = function (employees) {
    mySQLDAO.getUpdate();
    return new Promise((resolve, reject) => {
        coll.insertOne(employees)
            .then((documents) => {
                resolve(documents)
            })
            .catch((error) => {
                reject(error)
            })
    })
}


module.exports = { findAll, addEmployee }