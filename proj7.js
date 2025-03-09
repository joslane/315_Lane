let form = document.forms["userForm"];
let message = document.getElementById("message");

function displayText(){
    // Requirement 3: display file back to user
    let reader = new FileReader();
    let fileInput = form.elements["file"];
    let file = fileInput.files[0];

    // ensure .txt file
    if (!file.name.toLowerCase().endsWith(".txt")) {
        alert("Invalid file type. Please upload a .txt file.");
        fileInput.value = ""; // Clear the invalid selection
        return;
    }

    reader.onload = function (e) {
        // store the text of the file
        let text = e.target.result;

        let fileResult = document.getElementById("fileResult");

        fileResult.innerHTML = `File Content:<br><pre>${text}</pre>`;

        // count the vowels
        let vowelCounts = { a: 0, e: 0, i: 0, o: 0, u: 0 };
        for (let char of text.toLowerCase()) {
            if (vowelCounts.hasOwnProperty(char)) {
                vowelCounts[char]++;
            }
        }

        let countsText = "Vowel Counts:<br>";
        for (let [vowel, count] of Object.entries(vowelCounts)) {
            countsText += `${vowel}: ${count}<br>`;
        }

        fileResult.innerHTML += `<br>${countsText}`;
    };

    reader.readAsText(file);
}

function validate() {
    console.log("New validation attempt");
    let courses = []

    let success = true; // Flag for validation status

    try {
        // Get form elements
        let fullname = form.elements["fullname"];

        // Full Name Validation (ex: First M. Last)
        // Requirement 2: regular expressions for form validation
        let nameRegex = /^[A-Z][a-z]+ [A-Z]. [A-Z][a-z]+$/;
        if (!nameRegex.test(fullname.value)) {
            throw new Error("Full name must follow the specified pattern: First M. Last");
        }


        // Requirement 1: displaying results of checkboxes to user
        // loop through checkboxes
        for (let checkbox of form.elements) {
            if (checkbox.type === "checkbox" && checkbox.checked) {
                courses.push(checkbox.nextElementSibling.innerHTML);
            }
        }

        console.log(courses);

        message.innerHTML = `${courses.length} courses taken:<br>`;
        for (let i = 0; i < courses.length; ++i){
            message.innerHTML += `${courses[i]}<br>`
        }

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
        displayText();
    });
});
