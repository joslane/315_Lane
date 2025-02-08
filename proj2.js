// validation function: ensures user enters a valid birth date (not in the future)
function checkDate() {
    // get the value
    const birthDate = new Date(document.getElementById("birthdate").value);
    const today = new Date();

    // check if future
    if (birthDate > today) {
        alert("Birthdate cannot be in the future!");
        console.log(`Invalid future birthdate: ${birthDate}`)
        return false;
    }

    // would have already returned false if invalid
    console.log("Valid birthdate")
    return true; // Date is valid
}


// main function: tells the user their exact age in years, months, and days
function calculateAge() {
    // get values for calculation
    const birthDate = new Date(document.getElementById("birthdate").value);
    const today = new Date();
    
    // log to the console
    console.log(`Given birthdate: ${birthDate}`);

    // calculate the years, months, and days of their age
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // adjusts for day of birth date being after day of current month
    if (days < 0) {
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
    }


    // adjusts for month of birth year being after current year
    if (months < 0) {
        years--;
        months += 12;
    }

    // display to the user on the web page
    document.getElementById("result").textContent = `You are ${years} years, ${months} months, and ${days} days old.`;
    
    // adjust the console with calculations
    console.log(`Age: ${years} years, ${months} months, and ${days} days`);
}


// function to send a greeting message when the user submits the form
function greeting(){
    // Get the value of the name input field & the color & email
    const userName = document.getElementById("name").value;
    const color = document.getElementById("colorPicker").value;
    const email = document.getElementById("userEmail").value;

    // get values for console
    console.log(`Given name: ${userName}`);
    console.log(`Given color: ${color}`);
    console.log(`Given email: ${email}`);
                
    // Alert with the variable
    alert("Hello, " + userName + "! Welcome to the site.");
    
    // Change the text content and color of the message paragraph
    let messageElement = document.getElementById("message");

    // change the message
    messageElement.textContent = "Thank you, " + userName + ", for submitting the form!";

    // change the color
    messageElement.style.color = color;
}



// Event listner on the submit button to call the calculateAge function
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("userForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent reload of page

        // ensure not a future date is entered
        if(checkDate()){
            calculateAge();     // Call function
        }

        // greet regardless
        greeting();
        
    });
});