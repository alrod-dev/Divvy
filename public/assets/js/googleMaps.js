// Author: Alfredo Rodriguez & Louie Lohebec
// File: JS - googleMaps.js
// Date: 12/2/2017

let map, currentUserLocation,
    otherUsersLocation, options,
    desiredLocation, timeOfTrip;

let geocoder;

//Waits until the page is ready and allows to use search bar for
//Google Autocomplete
$(document).ready(function () {
    mapsAutocomplete();




});

function initMap() {
    // Create the map with no initial style specified.
    // It therefore has default styling.
    let SaltLakeCity = {lat: 40.76, lng: -111.89};

    //Gets the users exact address where they
    //and marks it on the map using a marker
    //and adding info window about them
    function geocodeAddress(geocoder) {
        let address = $("#userAddress").val();
        let userInfo = {
            name: $("#userName").text(), car: $("#userVehicle").text(),
            seats: $("#userSeats").text(), address: $("#userAddress").val()
        };


        //Sets the layout for the window content info
        //of the user
        let userWindow = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">' + userInfo.name + '\'s Place</h1>'+
            '<div id="bodyContent">'+
            '<p><b>' + userInfo.car + '</b></p>'+
            '<p><b>' + userInfo.seats + '</b></p>'+
            '<p><b>Address: ' + userInfo.address + '</b></p>'+
            '</div>'+
            '</div>';


        //Checks for address in users info
        //and turns into coordinates
        geocoder.geocode({'address': address}, function (results, status) {
            if (status === 'OK') {

                //Users exact location based off coordinates
                currentUserLocation = {
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng()
                };

                //Sets the options for how the map is going to look
                //Zoom: sets how close of proximity the map is viewed
                //Center: Where the map center on
                //Map Type Control allows the user to have accessability to other not needed map features
                options = {zoom: 13, center: currentUserLocation, mapTypeControl: false};

                console.log(options);

                //Initializes the map
                map = new google.maps.Map(document.getElementById('map'), options);

                // Add a style-selector control to the map.
                let styleControl = document.getElementById('style-selector-control');
                map.controls[google.maps.ControlPosition.TOP_LEFT].push(styleControl);


                // Set the map's style to the initial value of the selector.
                let styleSelector = document.getElementById('dropdown1');

                //Adds a marker on the map with exact current location of user
                let marker = new google.maps.Marker({
                    position: currentUserLocation,
                    map: map,
                });

                //Adds an info window the marker above
                let infoWindow = new google.maps.InfoWindow({
                    content: userWindow,
                    maxWidth: 350
                });

                //When the marker is clicked the info window displays
                marker.addListener('click', function () {
                    infoWindow.open(map, marker);
                });


            }


            else {
                console.log('Geocode was not successful for the following reason: ' + status);

                options = {zoom: 13, center: SaltLakeCity, mapTypeControl: false};

                console.log(options);

                map = new google.maps.Map(document.getElementById('map'), options);

                // Add a style-selector control to the map.
                let styleControl = document.getElementById('style-selector-control');
                map.controls[google.maps.ControlPosition.TOP_LEFT].push(styleControl);


                // Set the map's style to the initial value of the selector.
                let styleSelector = document.getElementById('dropdown1');

                let marker = new google.maps.Marker({
                    position: SaltLakeCity,
                    map: map,
                });


            }


        });
    }

    //Initializes the geocoder
    geocoder = new google.maps.Geocoder();

    //Starts Map
    geocodeAddress(geocoder);
}


//Google Maps Address Autocomplete
function mapsAutocomplete() {

    let autocomplete = new google.maps.places.Autocomplete(document.getElementById("searchBar"));

    google.maps.event.addListener(autocomplete, "place_changed", function () {


        //Gets the info of Exact spot that has been added
        let place = autocomplete.getPlace();

        console.log(place.formatted_address);
        console.log(place.geometry.location.lat());
        console.log(place.geometry.location.lng());

        desiredLocation = {coords: {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()}};

        addMarker(desiredLocation);
    })

}

//Search button for autocomplete
function searchButton() {

    let autocomplete = new google.maps.places.Autocomplete(document.getElementById("searchBar"));

    let place = autocomplete.getPlace();

    console.log(place.formatted_address);
    console.log(place.geometry.location.lat());
    console.log(place.geometry.location.lng());

    let newLocation = {coords: {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()}};

    addMarker(newLocation);

}


// Add Marker Function
function addMarker(props) {
    let marker = new google.maps.Marker({
        position: props.coords,
        map: map,
        //icon:props.iconImage
    });

    map.setCenter(props.coords);

    // Check for customicon
    if (props.iconImage) {
        // Set icon image
        marker.setIcon(props.iconImage);
    }

    // Check content
    if (props.content) {
        var infoWindow = new google.maps.InfoWindow({
            content: props.content
        });

        marker.addListener('click', function () {
            infoWindow.open(map, marker);
        });
    }

}

function makeTrip() {


    let directionsDisplay = new google.maps.DirectionsRenderer({
        map: map
    });

    console.log(desiredLocation);
    console.log(currentUserLocation);

    // Set destination, origin and travel mode.
    let request = {
        destination: desiredLocation.coords,
        origin: currentUserLocation,
        travelMode: 'DRIVING'
    };

    // Pass the directions request to the directions service.
    let directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function(response, status) {
        if (status == 'OK') {
            // Display the route on the map.
            directionsDisplay.setDirections(response);

            console.log(response.routes[0].legs[0].duration.text);



        }
    });

}




//Changes color to silver
function silver() {

    map.setOptions({styles: styles["silver"]});

}

//Changes color to retro
function retro() {

    map.setOptions({styles: styles["retro"]});
}

//Changes color to default
function defaultColor() {

    map.setOptions({styles: styles["default"]});

}

//Changes color to night mode
function nightMode() {

    map.setOptions({styles: styles["night"]});

}

//Changes color to hiding
function hideFeature() {

    map.setOptions({styles: styles["hiding"]});

}

//Styles of Google Maps
const styles = {
    default: null,
    silver: [
        {
            elementType: 'geometry',
            stylers: [{color: '#f5f5f5'}]
        },
        {
            elementType: 'labels.icon',
            stylers: [{visibility: 'off'}]
        },
        {
            elementType: 'labels.text.fill',
            stylers: [{color: '#616161'}]
        },
        {
            elementType: 'labels.text.stroke',
            stylers: [{color: '#f5f5f5'}]
        },
        {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [{color: '#bdbdbd'}]
        },
        {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{color: '#eeeeee'}]
        },
        {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#757575'}]
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#e5e5e5'}]
        },
        {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9e9e9e'}]
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#ffffff'}]
        },
        {
            featureType: 'road.arterial',
            elementType: 'labels.text.fill',
            stylers: [{color: '#757575'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#dadada'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#616161'}]
        },
        {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9e9e9e'}]
        },
        {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [{color: '#e5e5e5'}]
        },
        {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [{color: '#eeeeee'}]
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#c9c9c9'}]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9e9e9e'}]
        }
    ],

    night: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
        },
        {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#263c3f'}]
        },
        {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#6b9a76'}]
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#38414e'}]
        },
        {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{color: '#212a37'}]
        },
        {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9ca5b3'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#746855'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#1f2835'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#f3d19c'}]
        },
        {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{color: '#2f3948'}]
        },
        {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#17263c'}]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#515c6d'}]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#17263c'}]
        }
    ],

    retro: [
        {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
        {
            featureType: 'administrative',
            elementType: 'geometry.stroke',
            stylers: [{color: '#c9b2a6'}]
        },
        {
            featureType: 'administrative.land_parcel',
            elementType: 'geometry.stroke',
            stylers: [{color: '#dcd2be'}]
        },
        {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [{color: '#ae9e90'}]
        },
        {
            featureType: 'landscape.natural',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
        },
        {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
        },
        {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#93817c'}]
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry.fill',
            stylers: [{color: '#a5b076'}]
        },
        {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#447530'}]
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#f5f1e6'}]
        },
        {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [{color: '#fdfcf8'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#f8c967'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#e9bc62'}]
        },
        {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry',
            stylers: [{color: '#e98d58'}]
        },
        {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry.stroke',
            stylers: [{color: '#db8555'}]
        },
        {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [{color: '#806b63'}]
        },
        {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
        },
        {
            featureType: 'transit.line',
            elementType: 'labels.text.fill',
            stylers: [{color: '#8f7d77'}]
        },
        {
            featureType: 'transit.line',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#ebe3cd'}]
        },
        {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
        },
        {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [{color: '#b9d3c2'}]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#92998d'}]
        }
    ],

    hiding: [
        {
            featureType: 'poi.business',
            stylers: [{visibility: 'off'}]
        },
        {
            featureType: 'transit',
            elementType: 'labels.icon',
            stylers: [{visibility: 'off'}]
        }
    ]
};