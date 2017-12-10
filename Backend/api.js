/**
 * Created by chaika on 09.02.16.
 */
var Pizza_List = require('./data/Pizza_List');
var Pizza_Size = require('./data/Pizza_Size');
var crypto = require('crypto');

var LIQPAY_PUBLIC_KEY = 'i83656107381';
var LIQPAY_PRIVATE_KEY = 'y6RCyxY0CDPzIthQh2zARNPL4nVXmcKGMza2TYCn';

function sha1(string) {
    var sha1 = crypto.createHash('sha1');
    sha1.update(string);
    return sha1.digest('base64');
}

function orderTotal(cart) {
    var sum = 0;
    cart.forEach(function (value) {
        sum += value.pizza[value.size].price * value.quantity;
    });
    return sum;
}

function orderDescription(name, tel, address, cart) {
    var res = "Order for " + name + " phone: " + tel + " delivery address: " + address + " order:";
    cart.forEach(function (pizza) {
        res = res + " " + pizza.pizza.title + " " + Pizza_Size.ua_name[pizza.size] + ": " + pizza.quantity + "шт";
    });
    return res;
}

exports.getPizzaList = function (req, res) {
    res.send(Pizza_List);
};

exports.createOrder = function (req, res) {
    console.log("RECEIVED!");
    console.log("Some JSON shit: " + req.body);
    var order_info = req.body;
    console.log("Creating Order", order_info);

    var order = {
        version: 3,
        public_key: LIQPAY_PUBLIC_KEY,
        action: 'pay',
        amount: orderTotal(order_info.cart),
        currency: "UAH",
        description: orderDescription(order_info.name, order_info.tel, order_info.address, order_info.cart),
        order_id: Math.random(),
        sandbox: 1
    };

    var data_base64 = new Buffer(JSON.stringify(order)).toString('base64');

    res.send(JSON.stringify({
        data: data_base64,
        signature: sha1(LIQPAY_PRIVATE_KEY + data_base64 + LIQPAY_PRIVATE_KEY)
    }));
};