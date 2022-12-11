const e = require('express');
var express = require('express')
var app = express();
let ejs = require("ejs");
app.set("view engine", "ejs");

var x = [{ name: "Johnny", age: 31 }, { name: "Smithy", age: 41 }]
var mySQLDAO = require("./sqlconnect");

var employeesList =
    [{ id: "X103", name: "John Smith", role: "Manager", salary: 45000 },
    { id: "XT92", name: "Mary Murphy", role: "Manager", salary: 41750 },
    { id: "B10C", name: "Alan Collins", role: "Manager", salary: 40000 },
    { id: "YY12", name: "Brian Brogan", role: "Manager", salary: 43250 }]

app.listen(3004, () => {
    console.log("Server is listening on port 3004 :)");
});

// Server / page 
app.get('/homePage', (req, res) => {
    console.log("Get Request Recieved on /")
    res.send("<h1>Welcome to the Home Page</h1>")

})

// Server /employees page
app.get('/employees', (req, res) => {
    console.log("Get Request Recieved on /employees")
    res.render("addEmployee", { "emp": employeesList })
})


// Server /employees page
app.get('/depts', (req, res) => {
    console.log("Get Request Recieved on /depts")
})

