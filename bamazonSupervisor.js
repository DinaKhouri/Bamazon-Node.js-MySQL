var mysql = require("mysql");
var inquire = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  WhatDoYouwantToDo();
});

function WhatDoYouwantToDo() {
  inquire
    .prompt([
      {
        type: "list",
        name: "Do",
        message: "Would Do you want To Do?",
        choices: ["View Products Sales by Department", "Create new Department"]
      }
    ])
    .then(function(answer) {
      if (answer.Do === "View Products Sales by Department") {
        viewProductsByDepartment();
      }
      if (answer.Do === "Create new Department") {
        CreateNewDepartment();
      }
    });
}

function CreateNewDepartment() {
  inquire
    .prompt([
      {
        name: "name",
        message: "Name the department you want to add"
      },
      {
        name: "overhead",
        message: "what is the overHead Cost of this department?"
      }
    ])
    .then(function(answer) {
      var sql =
        "INSERT INTO departments (departemnt_name, over_head_costs) VALUES (?)";
      var values = [answer.name, answer.overhead];
      connection.query(sql, [values], function(err, result) {
        if (err) throw err;
        console.log("Department inserted" + result.affectedRows);
      });
      connection.end();
    });
}
