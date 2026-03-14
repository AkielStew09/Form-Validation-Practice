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
    let result = true;
    elements.forEach((element) => {
        //if any of the elements is invalid
        //or empty, assign false to result
        alert(`testing ${element.id}`);
        if (!element.validity.valid || element.value == "") {
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
    //retrieve the corresponding error since I don't want to have to pass it
    let error = errors[`${element.id}`];

    if (element.value === "") {
        let message = ` You need to fill the ${element.name} field.`;
        element.setCustomValidity(message);
        error.textContent = message;

    } else if (element.validity.typeMismatch) {
        error.textContent = "You need to provide a suitable input";

    } else if (element.validity.tooShort) {
        error.textContent = `The ${element.name} input must be at least ${element.minLength}
        characters, and you have entered ${element.value.length}`;

    } else if (element.validity.tooLong) {
        error.textContent = `The ${element.name} input may not exceed ${element.minLength}
        characters, and you have entered ${element.value.length}`;
    }

};

//here is the generic event listener

const inputListener = (element) => {
    let error = errors[`${element.id}`];

    //if everything is good, then we set the errors to nothing
    if (element.validity.valid && element.value !== "") {
        error.textContent = "";
        element.setCustomValidity("");
    }
    else {
        if (element.value !== "") {
            element.setCustomValidity("");
        }
        //if we have an problem or it's empty, show errors
        showError(element);
    }
};

email.addEventListener("input", () => {
    inputListener(email);
})

country.addEventListener("input", () => {
    inputListener(country);
})

postalCode.addEventListener("input", () => {
    inputListener(postalCode);
})

pw.addEventListener("input", () => {
    inputListener(pw);
})

pwConfirm.addEventListener("input", () => {
    inputListener(pwConfirm);
})
