//grab all inputs
const email = document.querySelector("#email");
const country = document.querySelector("#country");
const postalCode = document.querySelector("#postalCode");
const pw = document.querySelector("#pw");
const pwConfirm = document.querySelector("#pwConfirm");

//grab the form
const form = document.querySelector("#submissionForm");

//grab the error spans
const emailError = document.querySelector("#emailError");
const countryError = document.querySelector("#countryError");
const postalCodeError = document.querySelector("#postalCodeError");
const pwError = document.querySelector("#pwError");
const pwConfirmError = document.querySelector("#pwConfirmError");

form.addEventListener("submit", (e) => {
    //if everything is not all right...
    if (!allValid()) {
        //then show all the errors
        showAllErrors();

        //then stop the form from submitting
        e.preventDefault();
    }
    else {
        //if everything IS alright then give a high five
        alert("SUCCESS! You get a high five.");
    }
})
