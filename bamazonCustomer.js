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
  startapp();
});

function startapp() {
  inquire
    .prompt([
      {
        type: "list",
        name: "ShowOrEnd",
        message: "Would you like to Show items available for sale or exit?",
        choices: ["Show Items", "Exit"]
      }
    ])
    .then(function(answer) {
      if (answer.ShowOrEnd === "Show Items") {
        runapp();
      }
      if (answer.ShowOrEnd === "Exit") {
        connection.end();
      }
    });
}
function runapp() {
  connection.query("select * from products", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(
        res[i].item_id +
          "||" +
          "Name: " +
          res[i].product_name +
          "||" +
          "Price: " +
          res[i].product_price
      );
    }
  });
}
