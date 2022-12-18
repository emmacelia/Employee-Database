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

var getDept = function () {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM dept')
            .then((data) => {
                resolve(data)
            })
            .catch(error => {
                reject(error)
            })

    })

}

var getUpdate = function (eid) {
    return new Promise((resolve, reject) => {
        pool.query(`select * from employee where eid like "${eid}";`)
            .then((data) => {
                resolve(data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

var UpdateEmp = function (employee) {
    return new Promise((resolve, reject) => {
        var myQuery = {
            sql: `Update employee set ename =?, role =?, salary = ? where eid like "${employee.eid}";`,
            values: [employee.ename, employee.role, employee.salary]
        }

        pool.query(myQuery)
            .then((data) => {
                console.log(data)
            })
            .catch(error => {
                console.log(error)
            })
    })
}

var DeleteDept = function (did) {
    return new Promise((resolve, reject) => {
        pool.query(`delete from emp_dept where did like "${did}";`)
            .then((data) => {
                resolve(data)
            })
            .catch(error => {
                reject(error)
            })
    })

}
module.exports = { getEmp, getDept, getUpdate, UpdateEmp, DeleteDept }



