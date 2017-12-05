/**
 * Created by chaika on 25.01.16.
 */

$(function () {
    var PizzaCart = require('./pizza/order_PizzaCart');
    var Range = require('./pizza/order_range');

    PizzaCart.initialiseCart();
    Range.initialiseRange();
});