var pmysql = require("promise-mysql")
var pool
pool = pmysql.createPool({
    connectionLimit: 3,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'proj2022'
})
    .then((p) => {
        pool = p
    })
    .catch((e) => {
        console.log("pool error:" + e)
    })

var getEmp = function () {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM employee')
            .then((data) => {
                resolve(data)
            })
            .catch(error => {
                reject(error)
            })

    })

}
module.exports = { getEmp }
