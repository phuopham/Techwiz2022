var x = document.getElementById("xxxxxxxxxxxxxxxxxxxxxx");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        $.ajax{
            url: "",
                context: document.body
        }).done(function () {
            $(this).addClass("done");
        });

    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
// goi ham
getLocation();

function showPosition(position) {
    console.log(position.coords.latitude)
    console.log(position.coords.longitude)
    // call api
    // x.innerHTML = "Latitude: " + position.coords.latitude +
    //     "<br>Longitude: " + position.coords.longitude;
}