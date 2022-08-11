var x = document.getElementById("xxxxxxxxxxxxxxxxxxxxxx");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);


    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
// goi ham
getLocation();

function showPosition(position) {
    console.log(position.coords.latitude)
    console.log(position.coords.longitude)
    let access_token = "pk.eyJ1IjoidG9hbjEwOTIxIiwiYSI6ImNrdmFwcnBqejh5a24ydXBodTQybXRmd2cifQ.2ocVV4lm0IPJLfslaOEFUQ";
    $.ajax({
        url: "https://api.mapbox.com/geocoding/v5/mapbox.places/" + position.coords.longitude + "," + position.coords.latitude + ".json?access_token=" + access_token
    })
        .done(function (success) {
            console.log(success);
            let len = success.features.length;
            console.log(len);
            let country = success.features[len - 1].place_name ?? "";
            $(".geo").append(country);
        });
    // call api
    // x.innerHTML = "Latitude: " + position.coords.latitude +
    //     "<br>Longitude: " + position.coords.longitude;
}