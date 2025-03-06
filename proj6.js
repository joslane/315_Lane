let form = document.forms["userForm"];

function validate() {
    console.log("New validation attempt");

    let success = true; // Flag for validation status

    try {
        // Get form elements
        let fullname = form.elements["fullname"];
        let username = form.elements["username"];
        let email = form.elements["userEmail"];
        let password = form.elements["password"];
        let passwordConfirmation = form.elements["passwordConfirmation"];
        let phoneNumber = form.elements["phoneNumber"];
        let birthdate = form.elements["birthdate"];

        // Full Name Validation (no numbers or special characters)
        let nameRegex = /^[A-Za-z\s]+$/;
        if (!nameRegex.test(fullname.value)) {
            throw new Error("Full name should not contain numbers or special characters.");
        }

        // Username Validation (6-15 chars, alphanumeric, cannot start with number)
        let usernameRegex = /^[A-Za-z][A-Za-z0-9]{5,14}$/;
        if (!usernameRegex.test(username.value)) {
            throw new Error("Username must be 6-15 characters long, contain only letters and numbers, and not start with a number.");
        }

        // Password Validation (8-20 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special character)
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
        if (!passwordRegex.test(password.value)) {
            throw new Error("Password must be 8-20 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.");
        }

        // Password Confirmation
        if (password.value !== passwordConfirmation.value) {
            throw new Error("Mismatch between password and password confirmation.");
        }

        // Phone Number Validation (xxx-xxx-xxxx format)
        let phoneRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
        if (!phoneRegex.test(phoneNumber.value)) {
            throw new Error("Phone number must follow the format: xxx-xxx-xxxx.");
        }

        // Birth Date Validation (Must be 18 or older)
        const today = new Date();
        const birth = new Date(birthdate.value);
        let isEighteen = true;

        if (today.getFullYear() - birth.getFullYear() === 18) {
            if (today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) {
                isEighteen = false;
            }
        } else if (today.getFullYear() - birth.getFullYear() < 18) {
            isEighteen = false;
        }

        if (!isEighteen) {
            throw new Error("Must be 18 years or older.");
        }

        console.info("Validation successful. Form is ready to submit.");

        message = document.getElementById("message");
        message.innerHTML = "form submitted!";

    } catch (error) {
        console.error(`Validation Error: ${error.message}`);
        alert(error.message); // Display error message to user
        success = false;
        message = document.getElementById("message");
        message.innerHTML = "";
    } finally {
        if (!success) {
            console.warn("Form validation failed. Please correct the errors and try again.");
            message = document.getElementById("message");
            message.innerHTML = "";
        }
    }
}

// Add event listener for form submission
document.addEventListener("DOMContentLoaded", function () {
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page reload
        validate();
    });
});
