var PizzaFilters = {
    All: {
        pizzatype: 'pizzatype-all',
        ua_name: 'Усі',
        isSuitable: function (pizza) {
            return true;
        }
    },
    Meat: {
        pizzatype: 'pizzatype-meat',
        ua_name: 'М\'ясні',
        isSuitable: function (pizza) {
            return (pizza.type && pizza.type === 'М’ясна піца');
        }
    },
    WithPinapple: {
        pizzatype: 'pizzatype-has-pinapple',
        ua_name: 'З ананасами',
        isSuitable: function (pizza) {
            return (pizza.content && pizza.content.pineapple);
        }
    },
    WithMushrooms: {
        pizzatype: 'pizzatype-has-mushrooms',
        ua_name: 'З грибами',
        isSuitable: function (pizza) {
            return (pizza.content && pizza.content.mushroom);
        }
    },
    Sea: {
        pizzatype: 'pizzatype-sea',
        ua_name: 'З морепродуктами',
        isSuitable: function (pizza) {
            return (pizza.type && pizza.type === 'Морська піца');
        }
    },
    Vega: {
        pizzatype: 'pizzatype-vega',
        ua_name: 'Вега',
        isSuitable: function (pizza) {
            return (pizza.type && pizza.type === 'Вега піца');
        }
    }
}

module.exports = PizzaFilters;