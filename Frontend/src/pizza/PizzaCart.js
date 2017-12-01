/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var Pizza_Size = require('./Pizza_Size');

var Cart = [];

var $cart = $("#ct-container");

function addToCart(pizza, size) {

    var pizzaInCart = Cart.find(function (cart_item) {
        return (cart_item.pizza === pizza && cart_item.size === size);
    });

    if (pizzaInCart) {
        pizzaInCart.quantity++;
    } else {
        Cart.push({
            pizza: pizza,
            size: size,
            quantity: 1
        });
    }

    updateCart();
}

function removeFromCart(cart_item) {

    Cart.splice(Cart.indexOf(cart_item), 1);

    updateCart();
}

function initialiseCart() {
    if (window.localStorage.getItem('cartArray')) {
        Cart = JSON.parse(window.localStorage.getItem('cartArray'));
        console.log(Cart);
    }
    else
        Cart = [];

    $('#ct-clear').click(clearCart);
    updateCart();
}

function getPizzaInCart() {
    return Cart;
}

function clearCart() {
    Cart.length = 0;
    updateCart();
}

function updateCart() {
    window.localStorage.setItem('cartArray', JSON.stringify(Cart));

    $cart.html("");

    function showOnePizzaInCart(cart_item) {

        var html_code = Templates.PizzaCart_OneItem({item: cart_item, size_desc: Pizza_Size});

        var $node = $(html_code);

        $node.find("#inc-button").click(function () {
            cart_item.quantity++;
            updateCart();
        });

        $node.find("#dec-button").click(function () {
            cart_item.quantity--;
            if (cart_item.quantity < 1)
                removeFromCart(cart_item);
            updateCart();
        });

        $node.find('#rem-button').click(function () {
            removeFromCart(cart_item);
            updateCart();
        });

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

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;