var PizzaCart = require('./order_PizzaCart');
var ajax_api = require('../ajax');

var name;
var tel;
var addr;

function isWord(nameStr) {
    for (var i = 0; i < nameStr.length; ++i)
        if (nameStr[i].toUpperCase() === nameStr[i].toLowerCase())
            return false;
    return (!!nameStr);
}

function isUaMobileNumber(numberStr) {
    if (numberStr.substr(0, 4) === '+380') {
        return (numberStr.substr(3).length === 10 && /^\d+$/.test(numberStr.substr(3)));
    } else {
        return (numberStr[0] === '0' && numberStr.length === 10 && /^\d+$/.test(numberStr));
    }
}

function initialiseRange() {
    document.getElementById('name-orderer').onblur = function () {
        var textValue = document.getElementById('name-orderer').value;
        if (isWord(textValue)) {
            $('#name-orderer').css('border-color', 'chartreuse');
            $('#wrong-input-name').css('display', 'none');
            name = textValue;
        } else {
            $('#name-orderer').css('border-color', 'red');
            $('#wrong-input-name').css('display', '');
        }
    };
    document.getElementById('tel-orderer').onblur = function () {
        var textValue = document.getElementById('tel-orderer').value;
        if (isUaMobileNumber(textValue)) {
            $('#tel-orderer').css('border-color', 'chartreuse');
            tel = (textValue[0] === '+') ? textValue : ('+38' + textValue);
            $('#wrong-input-tel').css('display', 'none');
        } else {
            $('#tel-orderer').css('border-color', 'red');
            $('#wrong-input-tel').css('display', '');
        }
    };
    document.getElementById('addr-orderer').onblur = function () {
        var textValue = document.getElementById('addr-orderer').value;
        if (textValue) {
            $('#addr-orderer').css('border-color', 'chartreuse');
            addr = textValue;
            $('#wrong-input-addr').css('display', 'none');
        } else {
            $('#addr-orderer').css('border-color', 'red');
            $('#wrong-input-addr').css('display', '');
        }
    }
    $('#button-forvard').click(function () {
        console.log("Trying to order...");
        ajax_api.post('order', {cart: JSON.stringify(PizzaCart.getPizzaInCart())}, function () {
            console.log("Order sent");
            PizzaCart.clearCart();
        });
    });
}

exports.initialiseRange = initialiseRange;