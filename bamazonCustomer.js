var mysql = require("mysql");
var inquire = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "d1i2n3a4",
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
    var results = [];
    for (var i = 0; i < res.length; i++) {
      results.push(
        res[i].item_id +
          "||" +
          "Name: " +
          res[i].product_name +
          "||" +
          "Price: " +
          res[i].product_price
      );
    }
    inquire
      .prompt([
        {
          type: "list",
          name: "Picked",
          message: "Pick the item you want to buy",
          choices: results
        }
      ])
      .then(function(answer) {
        var customerAnswer = answer.Picked;
        // console.log(customerAnswer);
        //console.log(answer.Picked);
        for (i = 0; i < results.length; i++) {
          //console.log(results[i]);
          if (results[i] === customerAnswer) {
            //i used res[i] here instead of results[i],because results[i] returns a string while res[i] still has the product info and can pull the specific field we want to use
            //so this whole comparison thing is to figure which i the user picks so we can go back to the original array and grab info
            console.log(res[i]);
            console.log(res[i].product_price);
            var ProductPrice = res[i].product_price;
            var ProductQuantitiy = res[i].stock_quantity;
            var ItemID = res[i].item_id;
            //start another prompt
            inquire
              .prompt([
                {
                  type: "list",
                  name: "Price",
                  message:
                    "This Item Costs " +
                    ProductPrice +
                    " do you still want to make the Purchase?",
                  choices: ["Yes", "No"]
                }
              ])
              .then(function(answer) {
                if (answer.Price === "No") {
                  console.log("Thank you, Please Visit our store again");
                  connection.end();
                }
                if (answer.Price === "Yes") {
                  //console.log("awesome!");
                  inquire
                    .prompt([
                      {
                        name: "Quantity",
                        message: "Awesome! How Many do you need?"
                      }
                    ])
                    .then(function(answer) {
                      var QuantitiyNeeded = answer.Quantity;
                      var totalPrice = QuantitiyNeeded * ProductPrice;
                      if (ProductQuantitiy < QuantitiyNeeded) {
                        console.log("Sorry we dont have enough in stock");
                      }
                      if (ProductQuantitiy >= QuantitiyNeeded) {
                        console.log(
                          "Purchase approved with the Total Price of : " +
                            totalPrice
                        );
                        connection.query(
                          "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
                          [QuantitiyNeeded, ItemID]
                        );
                        connection.query(
                          "UPDATE products SET product_sales = product_sales + ? WHERE item_id = ?",
                          [totalPrice, ItemID]
                        );
                        connection.end();
                        //we need to update the database
                      }
                      //console.log(totalPrice);
                    });
                }
              });
          }
        }
      });
  });
}
