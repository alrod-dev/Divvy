$(document).ready(function(){
    mapsAutocomplete();
});

function mapsAutocomplete() {

    let autocomplete = new google.maps.places.Autocomplete(document.getElementById("address"));

    google.maps.event.addListener(autocomplete, "place_changed", function () {


        let place = autocomplete.getPlace();

        console.log(place.formatted_address);
        console.log(place.geometry.location.lat());
        console.log(place.geometry.location.lng());

    })

}