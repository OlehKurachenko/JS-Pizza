/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../order_Templates');
var Pizza_Size = require('./Pizza_Size');

var Cart = [];

var $cart = $("#ct-container");

function initialiseCart() {
    if (window.localStorage.getItem('cartArray'))
        Cart = JSON.parse(window.localStorage.getItem('cartArray'));
    else
        Cart = [];

    updateCart();
}

function getPizzaInCart() {
    return Cart;
}

function clearCart() {
    Cart.length = 0;
    window.localStorage.setItem('cartArray', JSON.stringify(Cart));
    updateCart();
}

function updateCart() {
    $cart.html("");

    function showOnePizzaInCart(cart_item) {

        var html_code = Templates.PizzaCart_OneItem({item: cart_item, size_desc: Pizza_Size});

        var $node = $(html_code);

        $cart.append($node);
    }

    function countOrderSum() {
        var orderSum = 0;
        Cart.forEach(function (t) {
            orderSum += t.pizza[t.size].price * t.quantity;
        });
        return orderSum;
    }

    Cart.forEach(showOnePizzaInCart);
    $('#ct-count').text(Cart.length);
    $('#ct-summ').text(countOrderSum() + ' грн');
}

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;
exports.clearCart = clearCart;