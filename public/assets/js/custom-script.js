//=======================Global Functions=================================
//Global variables


//Globar variables
let userId, newUser;

//Waits until document is ready and allows the user to
//use all these specific buttons
// $(document).on("click", "#registerBtn", registerUser);

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

        //Opens up modal after its added
        $('#modal1').modal('open');


    }

    else {

        $('#modal2').modal('open');
    }

    clearContent();

    return false;

}



