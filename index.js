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
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

//stores sql ids to be checked
const SqlId = []

app.listen(3004, () => {
    console.log("Server is listening on port 3004 :)");
});

// Server / page 
app.get('/homePage', (req, res) => {
    console.log("Get Request Recieved on /")
    res.render('home');

    mySQLDAO.getEmp()
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                SqlId[i] = data[i].eid

            }

        })
        .catch((error) => {


        })

})

//SQL DATABASE
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
    mySQLDAO.getUpdate(req.params.eid)
        .then((ed) => {
            console.log(ed)
            res.render('editemployee', { editemployee: ed[0] })
        })
        .catch((error) => {
            console.log(error)
            if (error.errno == 1146) {
                res.send("Invalid table: " + error.sqlMessage)
            }
            else {
                res.send(error)
            }

        })

})

app.post("/update/:eid", (req, res) => {

    mySQLDAO.UpdateEmp(req.body)
        .then((e) => {
            console.log("Okay")


        }).catch((error) => {
            console.log("Not Okay")

        })
    res.redirect('/employees')

})

app.get('/depts/delete/:did', (req, res) => {
    mySQLDAO.DeleteDept(req.params.did)
        .then((ed) => {
            // res.redirect("/dept")
        })
        .catch((error) => {
            // res.send("Sorry cannot delete department")
            if (error.errno == 1146) {
                res.send("Invalid table: " + error.sqlMessage)
                console.log("TEST")
            }
            else {
                res.render('error')
            }

        })
})

//MONGO DATABASE
app.get('/employeesMongoDB', (req, res) => {
    dao.findAll()
        .then((me) => {
            // Process documents
            res.render('displayMongoEmp', { displayMongoEmp: me })
        })
        .catch((error) => {
            // Handle error
            res.send(error)
        })
})
app.get('/employeesMongoDB/add', (req, res) => {
    res.render('AddEmp', { AddEmp: e })

})

app.post('/employeesMongoDB/add', (req, res) => {
    // console.log(req.body.eid)
    mySQLDAO.getUpdate(req.body._id)
        .then((e) => {
            //console.log(e.length)
            if (e.length == 0) {
                res.send("Cannot add");
            }
            else {
                console.log(req.body)

                dao.addEmployee(req.body)
                    .then((d) => {
                        console.log("Okay")
                        res.redirect('/homePage')
                    }).catch((error) => {
                        console.log(error)
                        console.log("Not Okay")
                        // res.send("Could not add as it is already there")
                        res.render('error')
                    })


            }


        }).catch((error) => {
            console.log(error)
        })
})