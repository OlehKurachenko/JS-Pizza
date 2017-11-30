/**
 * Created by chaika on 02.02.16.
 * Refactored according to task by soll_nevermind on 29.11.17
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');
var Pizza_Size = require('./Pizza_Size');

var $pizza_list = $("#pizza_list");

function showPizzaList(list) {
    $pizza_list.html("");

    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find("#buy-big").click(function(){
            PizzaCart.addToCart(pizza, Pizza_Size.Big);
        });
        $node.find("#buy-small").click(function(){
            PizzaCart.addToCart(pizza, Pizza_Size.Small);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
    $('#head-counter').text(list.length);
}

function filterPizza(filter) {
    var pizza_shown = [];

    Pizza_List.forEach(function(pizza){
        //Якщо піка відповідає фільтру
        //pizza_shown.push(pizza);

        //TODO: зробити фільтри
    });

    showPizzaList(pizza_shown);
}

function initialiseMenu() {
    // TODO add filter configuration
    showPizzaList(Pizza_List)
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;