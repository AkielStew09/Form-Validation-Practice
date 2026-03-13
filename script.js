//grab all inputs
const email = document.querySelector("#email");
const country = document.querySelector("#country");
const postalCode = document.querySelector("#postalCode");
const pw = document.querySelector("#pw");
const pwConfirm = document.querySelector("#pwConfirm");

let elements = [email, country, postalCode, pw, pwConfirm];

//grab the form
const form = document.querySelector("#submissionForm");

//grab the error spans
const emailError = document.querySelector("#emailError");
const countryError = document.querySelector("#countryError");
const postalCodeError = document.querySelector("#postalCodeError");
const pwError = document.querySelector("#pwError");
const pwConfirmError = document.querySelector("#pwConfirmError");

let errors = {
    [`${email.id}`]: emailError,
    [`${country.id}`]: countryError,
    [`${postalCode.id}`]: postalCodeError,
    [`${pw.id}`]: pwError,
    [`${pwConfirm.id}`]: pwConfirmError
};

//submit event listener on the form
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
});

//returns whether all fields are valid
const allValid = () => {
    elements.forEach((element) => {
        //if any of the elements is invalid, return false
        if (!element.validity.valid) {
            return false;
        }
    });
    //if it reaches this point, then all are valid, so return true
    return true;
}

//calls showError on every element
const showAllErrors = () => {
    //for every element
    for (let i = 0; i < elements.length; ++i) {
        //call showError and pass each element 
        //along with its corresponding error
        showError(elements[i], errors[i]);
    }
};

const showError = (element) => {
    //retrieve the corresponding error since I don't want to have to pass it
    let error = errors[`${element.id}`];

    if (element.value == "") {
        let message = ` You need to fill the ${element.name} field.`;
        element.setCustomValidity(message);
        error.textContent = message;

    } else if (element.validity.typeMismatch) {
        error.textContent = "You need to provide a suitable input";

    } else if (element.validity.tooShort) {
        error.textContent = `The ${element.name} input must be at least ${element.minlength}
        characters, and you have entered ${element.value.length}`;

    } else if (element.validity.tooLong) {
        error.textContent = `The ${element.name} input may not exceed ${element.minlength}
        characters, and you have entered ${element.value.length}`;
    }

};
