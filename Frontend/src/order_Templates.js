/**
 * Created by chaika on 02.02.16.
 * Refactored according to task by soll_nevermind on 29.11.17
 */
var fs = require('fs');
var ejs = require('ejs');

exports.PizzaCart_OneItem =
    ejs.compile(fs.readFileSync('./Frontend/templates/order_PizzaCart_OneItem.ejs', "utf8"));