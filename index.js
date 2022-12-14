const e = require('express');
var express = require('express')
var app = express();
let ejs = require("ejs");
app.set("view engine", "ejs");
var x = [{ name: "Johnny", age: 31 }, { name: "Smithy", age: 41 }]
var mySQLDAO = require("./sqlconnect");
var pool
var dao = require("./mongoconnect");
const { ReturnDocument } = require('mongodb');


app.listen(3004, () => {
    console.log("Server is listening on port 3004 :)");
});

// Server / page 
app.get('/homePage', (req, res) => {
    console.log("Get Request Recieved on /")
    res.render('home');
})



// Server /editemployees page
// app.get('/update/:eid', (req, res) => {
//     console.log("Get Request Recieved on /employees")
//      pool.query("select * from employee where eid like '{eid}';")
//         .then((e) => {
//             //res.send(data)
//             res.render('editemployee', { employee: e })
//         })
//         .catch((error) => {
//             if (error.errno == 1146) {
//                 res.send("Invalid table: " + error.sqlMessage)
//             }
//             else (
//                 res.send(error)
//             )

//         })
// })




// Server /deletedept page
app.get('/deleteDept', (req, res) => {
    console.log("Get Request Recieved to delete depts info")
    res.render('deletedept')
})

app.get('/employees', (req, res) => {
    mySQLDAO.getEmp()
        .then((e) => {
            //res.send(data)
            res.render('employee', { employee: e })
        })
        .catch((error) => {
            if (error.errno == 1146) {
                res.send("Invalid table: " + error.sqlMessage)
            }
            else (
                res.send(error)
            )

        })
})

app.get('/find', (req, res) => {
    dao.findAll()
        .then((documents) => {
            // Process documents
            res.send(documents)
        })
        .catch((error) => {
            // Handle error
            res.send(error)
        })
})

app.get('/dept', (req, res) => {
    mySQLDAO.getDept()
        .then((de) => {
            //res.send(data)
            res.render('depts', { depts: de })
        })
        .catch((error) => {
            if (error.errno == 1146) {
                res.send("Invalid table: " + error.sqlMessage)
            }
            else (
                res.send(error)
            )

        })
})

app.get('/update/:eid', (req, res) => {
    mySQLDAO.getUpdate()
        .then((ed) => {
            res.render('editemployee', { editemployee: ed })
        })
        .catch((error) => {
            if (error.errno == 1146) {
                res.send("Invalid table: " + error.sqlMessage)
            }
            else {
                res.send(error)
            }

        })
})
