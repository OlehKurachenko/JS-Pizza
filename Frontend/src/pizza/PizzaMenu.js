/**
 * Created by chaika on 02.02.16.
 * Refactored according to task by soll_nevermind on 29.11.17
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List;
var Pizza_Size = require('./Pizza_Size');
var PizzaFilters = require('./PizzaFilters');

var ajax_api = require('../ajax')

var $pizza_list = $("#pizza_list");
var $range_nav = $('#range-nav');
var filters = {};

function showPizzaList(isSuitable) {
    $pizza_list.html("");
    var pizzas_selected = 0;

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

    Pizza_List.forEach(function (t) {
        if (isSuitable(t)) {
            pizzas_selected++;
            showOnePizza(t);
        }
    });
    $('#head-counter').text(pizzas_selected);
}

function initialiseMenu() {
    ajax_api.get('api/get-pizza-list/', function (data) {
        Pizza_List = data;
        for (var key in PizzaFilters) {
            var filter = PizzaFilters[key];
            filters[PizzaFilters[key].pizzatype] = PizzaFilters[key];
            var html_code = Templates.PizzaFiltar_OneItem(filter);
            var $node = $(html_code);
            $node.find('.' + filter.pizzatype).click(function () {
                var pizzatype = $(this).attr('class');
                $range_nav.find('.active').removeClass('active');
                $range_nav.find('#' + pizzatype).addClass('active');
                showPizzaList(filters[pizzatype].isSuitable);
            });
            $range_nav.append($node);
        }
        $range_nav.find('#' + PizzaFilters.All.pizzatype).addClass('active');
        showPizzaList(PizzaFilters.All.isSuitable);
    });
}

exports.initialiseMenu = initialiseMenu;