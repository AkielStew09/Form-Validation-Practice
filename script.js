//grab all inputs
const email = document.querySelector("#email");
const country = document.querySelector("#country");
const postalCode = document.querySelector("#postalCode");
const pw = document.querySelector("#pw");
const pwConfirm = document.querySelector("#pwConfirm");

//store them in an array
let elements = [email, country, postalCode, pw, pwConfirm];

//grab the form
const form = document.querySelector("#submissionForm");

//grab the error spans
const emailError = document.querySelector("#emailError");
const countryError = document.querySelector("#countryError");
const postalCodeError = document.querySelector("#postalCodeError");
const pwError = document.querySelector("#pwError");
const pwConfirmError = document.querySelector("#pwConfirmError");

//made an assoc array that stores the error spans
//and has the corresponding input id's as keys
//so I can retrieve the error given the input
let errors = {
    [`${email.id}`]: emailError,
    [`${country.id}`]: countryError,
    [`${postalCode.id}`]: postalCodeError,
    [`${pw.id}`]: pwError,
    [`${pwConfirm.id}`]: pwConfirmError
};

//submit event listener on the form
form.addEventListener("submit", (e) => {
    //if not everything is all right...
    if (!allValid()) {
        //then show/assign all the errors
        showAllErrors();

        //then stop the form from submitting
        e.preventDefault();
    }
    else {
        //if everything IS alright then give a high five
        alert("SUCCESS! You get a high five.");
        //and then the form will submit
    }
});

//returns whether all fields are valid
const allValid = () => {
    //make a bool and set it to true by default
    let result = true;
    elements.forEach((element) => {
        //if any of the elements fails any of the 3 criteria
        //assign false to result
        if (!element.validity.valid || element.value == "" || !pwMatch(element)) {
            alert(`${element.id} has a problem`);
            result = false;
        } else {
            alert(`${element.id} has no problems`);
        }
    });
    //if it reaches this point, then result should be true
    //return result
    return result;
}

//calls showError on every element
const showAllErrors = () => {
    //for every element
    elements.forEach((elem) => {
        showError(elem);
    })
};

const showError = (element) => {
    console.log(`showError is running on ${element.id}`);
    //retrieve the corresponding error since I don't want to have to pass it
    let error = errors[`${element.id}`];

    //if it's empty
    if (element.value === "") {
        let message = ` You need to fill the ${element.name} field.`;
        element.setCustomValidity(message);
        error.textContent = message;

    } else if (element.validity.typeMismatch) {
        error.textContent = `You need to provide a suitable ${element.id} input`;

    } else if (element.validity.tooShort) {
        error.textContent = `The ${element.name} input must be at least ${element.minLength}
        characters, and you have entered ${element.value.length}`;

    } else if (element.validity.tooLong) {
        error.textContent = `The ${element.name} input may not exceed ${element.minLength}
        characters, and you have entered ${element.value.length}`;
    } else if (!pwMatch(element)) {
        let message = `The passwords must match`;
        element.setCustomValidity(message);
        error.textContent = message;
    }
};

//here is the generic event listener
//I will call it on each input element
const inputListener = (element) => {

    //grab the corresponding error element
    let error = errors[`${element.id}`];

    //firstly remove any carried over customError
    if (element.value !== "" && pwMatch(element)) {
        //if both my custom standards are met then remove my custom error
        element.setCustomValidity("");

        //then furthermore if the machines standards are met
        //then fully clear the error text
        if (element.validity.valid)
            error.textContent = "";
    }

    //now show/apply any errors that may be present
    showError(element);

    logIssues(element)

    // if (!element.validity.valid) {
    //     //debug
    //     if (!pwMatch(element)) {
    //         console.log(`${element.id} doesn't match password`);
    //     }
    //     if (element.value == "")
    //         console.log(`${element.id} is empty`);
    //
    //     if (element.value !== "" && pwMatch(element)) {
    //         element.setCustomValidity("");
    //     }
    //     //if we have an problem or it's empty, show errors
    // }
};

elements.forEach((elem) => {
    elem.addEventListener("input", () => inputListener(elem));
});

const pwMatch = (element) => {
    //returns a bool of whether the elements value 
    if (element.id == "pwConfirm")
        return (element.value === pw.value);
    else
        return true
}

const logIssues = (element) => {
    console.log("=====");
    //iterate through the validity props
    //and log the ones that are issues
    let count = 0;
    console.log(`${element.id}'s issues:`);
    for (let i in element.validity) {
        //if it's true except the "valid" property then log it
        if (i !== "valid" && element.validity[i]) {
            ++count;
            console.log(i);
        }
    }
    if (!count)
        console.log("No issues");
    console.log("=====");
}
