/**
 * Created by chaika on 25.01.16.
 */

$(function(){
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');

    PizzaCart.initialiseCart();
    PizzaMenu.initialiseMenu();
});