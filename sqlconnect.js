var pmysql = require("promise-mysql")
var pool

pmysql.createPool({
    connectionLimit: 3,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'proj22'
})
    .then((p) => {
        pool = p
    })
    .catch((e) => {
        console.log("pool error:" + e)
    })

var getEmployee = function () {
    return new Promise((resolve, reject) => {
        pool.q('SELECT * FROM employee')
            .then((data) => {
                resolve(data)
            })
            .catch(error => {
                reject(error)
            })

    })

}
module.exports = { getEmployee }