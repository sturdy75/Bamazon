var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_DB"
});

connection.connect(function (err, res) {
    if (err) throw err;
    // console.log(`Connected as id ${connection.threadId}.`);
    // console.log(`${res.affectedRows} product(s) were updated`);
});

function validateInput(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'Please enter a whole non-zero number.';
    }
}

function askUser() {
    inquirer.prompt([{
            name: "item_id",
            type: "input",
            message: "What is the ID of the item you would like to buy?",
            validate: validateInput,
            filter: Number
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like?",
            validate: validateInput,
            filter: Number
        }

    ]).then(function (input) {

        var item = input.item_id;
        var quantity = input.quantity;
        var queryStr = "SELECT * FROM products WHERE ?";

        connection.query(queryStr, {
            item_id: item
        }, function (err, data) {
            if (err) throw err;

            if (data.length === 0) {
                console.log("err");
                displayInventory();

            } else {
                var productData = data[0];

                if (quantity <= productData.stock_quantity) {
                    console.log("The product you chose is in stock. Let me grab that for you!");

                    var updateQueryStr = "UPDATE products SET stock_quantity = " + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

                    connection.query(updateQueryStr, function (err, data) {
                        if (err) throw err;

                        console.log("Your order has been entered. Your total is $" + productData.price * quantity);

                        connection.end();
                    })

                } else {
                    console.log("Sorry We don't have that many, your order cannot be filled at this time.");

                    displayInventory();
                }
            }
        })
    })
}
var displayInventory = function () {
    var query = "Select * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        var displayTable = new Table({
            head: ["Item ID", "Product Name", "Category", "Price", "Quantity"],
            colWidths: [10, 25, 25, 10, 14]
        });
        for (var i = 0; i < res.length; i++) {
            displayTable.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }
        console.log(displayTable.toString());
    });
}
askUser();
displayInventory();