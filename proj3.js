document.addEventListener("DOMContentLoaded", function () {
    const professorSelect = document.getElementById("professor");
    const resultParagraph = document.getElementById("result");
    const daySelect = document.getElementById("days");
    const dayResult = document.getElementById("dayResult");

    document.getElementById("userForm").addEventListener("submit", function () {
        // prevent reload
        event.preventDefault();

        // First Functionality: professor's courses taught---------------------------------
        // find professor to display
        const selectedProfessor = professorSelect.value;

        if (!selectedProfessor) {
            resultParagraph.textContent = "";
        }

        // create array of cells
        const tds = document.getElementsByTagName("td");

        // create array of courses
        let courses = [];

        // add the course code, days, and time for each class the professor teaches
        for (let i = 0; i < tds.length; i++){
            if (tds[i].innerHTML==selectedProfessor){
                courses.push([tds[i-3].innerHTML, tds[i-2].innerHTML, tds[i-1].innerHTML]);
            }
        }

        // generate a string to display to the user including all of the courses
        resultString = "";
        for (let i = 0; i < courses.length; i++){
            resultString += `${courses[i][0]} on ${courses[i][1]} at ${courses[i][2]} <br>`;
        }


        // Second functionality: courses offered on a specific day----------------------------
        // retrieve selected day
        const selectedDay = daySelect.value;
        let dayString = ""

        // find matching courses
        for (let i = 0; i < tds.length; i++){
            switch(tds[i].innerHTML){
                // if MWF class
                case 'M/W/F':
                    // check if user is looking for M, W, or F
                    if (['M','W','F'].includes(selectedDay)){
                        dayString += `${tds[i-1].innerHTML} at ${tds[i+1].innerHTML} by ${tds[i+2].innerHTML} <br>`
                    }
                    break;

                // if TR class
                case 'T/R':
                    // check if user is looking for T or R
                    if (['T', 'R'].includes(selectedDay)){
                        dayString += `${tds[i-1].innerHTML} at ${tds[i+1].innerHTML} by ${tds[i+2].innerHTML} <br>`
                    }
                    break;

                // not a "days" cell; do nothing
                default:
                    break;
            }
        }

        let selectedDayLong = "";
        if (selectedDay == 'M'){
            selectedDayLong = 'Monday';
        }
        else if (selectedDay == 'T'){
            selectedDayLong = 'Tuesday';
        }
        else if (selectedDay == 'W'){
            selectedDayLong = 'Wednesday';
        }
        else if (selectedDay == 'R'){
            selectedDayLong = 'Thursday';
        }
        else{
            selectedDayLong = "Friday";
        }

        // debug help
        console.log(courses);

        // format output
        if (courses.length > 0) {
            resultParagraph.innerHTML = `<strong>Courses taught by Professor ${selectedProfessor}:</strong><br>` + resultString;
        } else {
            resultParagraph.textContent = "No courses found.";
        }

        if (dayString.length > 0) {
            dayResult.innerHTML = `<strong>Courses on ${selectedDayLong}:</strong><br>` + dayString;
        } else {
            dayResult.textContent = "No courses found.";
        }
    });
});
