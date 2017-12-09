var PizzaCart = require('./order_PizzaCart');
var ajax_api = require('../ajax');

var name;
var tel;
var addr;

var ua_lang_template = {
    UNKNOWN: 'невідомий'
}

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

    function initializeGoogleMap() {
        var mapProp = {
            center: new google.maps.LatLng(50.464379, 30.519131),
            zoom: 13
        };

        /*var renderer = new google.maps.DirectionsRenderer({
            supressMarkers:true,
            map: map
        });*/

        var html_element = document.getElementById("googleMap");
        var map = new google.maps.Map(html_element, mapProp);
        var point = new google.maps.LatLng(50.464379, 30.519131);
        var geocoder = new google.maps.Geocoder();
        var directionService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
        directionsDisplay.setOptions({suppressMarkers: true});

        var pizzaMarker = new google.maps.Marker({
            position: point,
            map: map,
            icon: "assets/images/map-icon.png"
        });

        var homeMarker;

        function resetHomeMarker(coordinates) {
            if (homeMarker) {
                homeMarker.setMap(null);
            }
            homeMarker = new google.maps.Marker({
                position: coordinates,
                map: map,
                icon: "assets/images/home-icon.png"
            });
        }

        function calculateRoute(dest_point, callback) {
            directionService.route({
                origin: pizzaMarker.position,
                destination: dest_point,
                travelMode: google.maps.TravelMode["DRIVING"]
            }, function (response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    // TODO add all
                    directionsDisplay.setDirections(response);
                    resetHomeMarker(dest_point);

                    var leg = response.routes[0].legs[0];

                    callback(null, {duration: leg.duration.text});
                } else {
                    callback(true);
                }
            });
        }

        google.maps.event.addListener(map, 'click', function (me) {
            resetHomeMarker(me.latLng);

            directionsDisplay.setDirections({routes: []});

            function geocodeViaListenerError() {
                document.getElementById('addr-orderer').value = '';
                $('#addr-orderer').css('border-color', 'red');
                $('#wrong-input-addr').css('display', '');
                $('#order-delivery-time').text(ua_lang_template.UNKNOWN);
                $('#order-delivery-address').text(ua_lang_template.UNKNOWN);
            }

            geocoder.geocode({'location': me.latLng}, function (result, status) {
                if (status === google.maps.GeocoderStatus.OK && result[1]) {
                    calculateRoute(me.latLng, function (err, data) {
                        if (!err) {
                            document.getElementById('addr-orderer').value = result[1].formatted_address;

                            addr = result[1].formatted_address;

                            $('#order-delivery-time').text(data.duration);
                            $('#order-delivery-address').text(addr);
                            $('#addr-orderer').css('border-color', 'chartreuse');
                            $('#wrong-input-addr').css('display', 'none');
                        } else
                            geocodeViaListenerError();
                    });
                } else
                    geocodeViaListenerError();

                // {
                //     //$("#addr-orderer").text(result[1].formatted_address);
                //     console.log(result[1].formatted_address);
                //     $('#addr-orderer').css('border-color', 'chartreuse');
                //     $('#wrong-input-addr').css('display', 'none');
                // } else {
                //     console.log("Wrong adress!");
                //     console.log(status + " " + result[1] + calculateRoute(me.latLng));
                // }
            });
        });

        document.getElementById('addr-orderer').onkeyup = function () {
            var textValue = document.getElementById('addr-orderer').value;
            geocoder.geocode({'address': textValue}, function (result, status) {
                if (status === google.maps.GeocoderStatus.OK && result[0]) {
                    calculateRoute(result[0].geometry.location, function (err, data) {
                        if (!err) {
                            resetHomeMarker(result[0].geometry.location);

                            geocoder.geocode({'location': result[0].geometry.location}, function (result, status) {
                                if (status === google.maps.GeocoderStatus.OK && result[1]) {
                                    addr = result[1].formatted_address;
                                    $('#order-delivery-address').text(addr);
                                }
                            });

                            $('#addr-orderer').css('border-color', 'chartreuse');
                            $('#wrong-input-addr').css('display', 'none');
                            $('#order-delivery-time').text(data.duration);
                        } else {
                            addr = null;
                        }
                    });
                } else {
                    addr = null;
                }
            })
        };

        document.getElementById('addr-orderer').onblur = function () {

            if (!addr) {
                $('#order-delivery-time').text(ua_lang_template.UNKNOWN);
                $('#order-delivery-address').text(ua_lang_template.UNKNOWN);
                $('#addr-orderer').css('border-color', 'red');
                $('#wrong-input-addr').css('display', '');
                if (homeMarker) {
                    homeMarker.setMap(null);
                }
            }
        };
    }

    document.getElementById('name-orderer').onkeyup = function () {
        var textValue = document.getElementById('name-orderer').value;
        if (isWord(textValue)) {
            name = textValue;
            $('#name-orderer').css('border-color', 'chartreuse');
            $('#wrong-input-name').css('display', 'none');
        } else {
            $('#name-orderer').css('border-color', 'red');
            $('#wrong-input-name').css('display', '');
        }
    };

    document.getElementById('tel-orderer').onkeyup = function () {
        var textValue = document.getElementById('tel-orderer').value;
        if (isUaMobileNumber(textValue)) {
            tel = (textValue[0] === '+') ? textValue : ('+38' + textValue);
            $('#tel-orderer').css('border-color', 'chartreuse');
            $('#wrong-input-tel').css('display', 'none');
        } else {
            $('#tel-orderer').css('border-color', 'red');
            $('#wrong-input-tel').css('display', '');
        }
    };

    $('#button-forvard').click(function () {
        if (tel && name && addr) {
            console.log("Trying to order...");
            ajax_api.post('order', {cart: JSON.stringify(PizzaCart.getPizzaInCart())}, function () {
                console.log("Order sent");
                PizzaCart.clearCart();
            });
        } else {
            if (!name)
                $('#name-orderer').css('border-color', 'red');
            if (!tel)
                $('#tel-orderer').css('border-color', 'red');
            if (!addr)
                $('#addr-orderer').css('border-color', 'red');
        }
    });

    google.maps.event.addDomListener(window, 'load', initializeGoogleMap);
}

exports.initialiseRange = initialiseRange;