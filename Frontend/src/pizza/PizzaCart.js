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
            quantity: 1,
            ua_size: Pizza_Size.ua_name[size]
        });
    }

    updateCart();
}

function removeFromCart(cart_item) {

    Cart.splice(Cart.indexOf(cart_item), 1);

    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...

    updateCart();
}

function getPizzaInCart() {
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    // TODO add saving to local storage
    // TODO add "remove all"
    // TODO remove all the "href"s

    // TODO correct +
    // TODO write "minus"

    //Очищаємо старі піци в кошику
    $cart.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {

        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);

        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;

            //Оновлюємо відображення
            updateCart();
        });

        $node.find('#rem-button').click(function () {
            removeFromCart(cart_item);
            updateCart();
        });

        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);

}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;