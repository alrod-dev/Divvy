//=======================Global Functions=================================
//Global variables


//Globar variables
let userId, newUser;

//Waits until document is ready and allows the user to
//use all these specific buttons
$(document).on("click", "#registerBtn", registerUser);

//initialize all modals
$('.modal').modal();
//or by click on trigger
$('.modal-trigger').modal();


// Form validation
// To validate all the info
function validateForm() {
    let isValid = true;

    $(".form-control").each(function () {
        if ($(this).val() === "")
            isValid = false;
    });

    return isValid;
}

//Clears form box input field
function clearContent() {

    $(".validate").val("");

}

//Adds a new medication
function registerUser() {

    // If all required fields are filled
    if (validateForm() === true) {
        // Create an object for the user's data
        newUser = {
            //Grabs the value data
            fullname: $("#name").val(),
            address: $("#address").val(),
            phone: $("#phone").val(),
            vehicle: $("#vehicle").val(),
            seats: $("#seats").val(),
            email: $("#email").val(),
            username: $("#username").val(),
            password: $("#password").val()
        };


        // AJAX post the data to the friends API.
        $.post("/api/users", newUser, function (data) {

            console.log("Success");

            console.log(data);


        });

        //Opens up modal after its added
        $('#modal1').modal('open');

        setTimeout(function(){location.href="/login-page"} , 2000);

    }

    else {

        $('#modal2').modal('open');
    }

    console.log(newUser);

    clearContent();

    return false;

}



