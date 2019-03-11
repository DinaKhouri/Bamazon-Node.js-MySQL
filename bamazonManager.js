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
        choices: [
          "View Products For Sale",
          "View Low Inventory",
          "Add to inventory",
          "Add new Product"
        ]
      }
    ])
    .then(function(answer) {
      if (answer.Do === "View Products For Sale") {
        viewProducts();
      }
      if (answer.Do === "View Low Inventory") {
        viewLow();
      }
      if (answer.Do === "Add to inventory") {
        AddInventory();
      }
      if (answer.Do === "Add new Product") {
        AddProduct();
      }
    });
}

function viewProducts() {
  connection.query("select * from products", function(err, res) {
    if (err) throw err;
    var results = [];
    for (var i = 0; i < res.length; i++) {
      results.push(
        res[i].item_id +
          "||" +
          "Name: " +
          res[i].product_name +
          "||" +
          "Price: " +
          res[i].product_price +
          "||" +
          "In Stock: " +
          res[i].stock_quantity
      );
    }
    console.log(results);
  });
}

function viewLow() {
  connection.query("select * from products", function(err, res) {
    if (err) throw err;
    var results = [];
    for (var i = 0; i < res.length; i++) {
      if (res[i].stock_quantity < 5) {
        results.push(
          res[i].item_id +
            "||" +
            "Name: " +
            res[i].product_name +
            "||" +
            "Price: " +
            res[i].product_price +
            "||" +
            "In Stock: " +
            res[i].stock_quantity
        );
      }
    }
    console.log(results);
  });
}
