// change properties when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
    const bgColorInput = document.getElementById("bgColor");
    const textColorInput = document.getElementById("textColor");
    const fontSizeInput = document.getElementById("fontSize");
    const submitButton = document.getElementById("customizeSubmit");
    
    function applyPreferences(bgColor, textColor, fontSize) {
        document.body.style.backgroundColor = bgColor;
        document.body.style.color = textColor;
        document.body.style.fontSize = fontSize + "pt";
    
        // Override existing CSS for <p> elements
        document.querySelectorAll("p").forEach(p => {
            p.style.setProperty("color", textColor, "important");
        });
    }
    
    // see if there are any cookies storing previous preferences
    function getCookie(name) {
        const cookies = document.cookie.split('; ');
        for (let cookie of cookies) {
            let [key, value] = cookie.split('=');
            if (key === name) return decodeURIComponent(value);
        }
        return null;
    }

    // create a cookie if needed
    function setCookie(name, value, days) {
        let date = new Date();
        
        // expire the cookie after a certain number of days (7 is default)
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/`;
    }

    // read the query string
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // update query string
    function updateQueryString(bgColor, textColor, fontSize) {
        const newParams = new URLSearchParams();
        newParams.set("bgColor", bgColor);
        newParams.set("textColor", textColor);
        newParams.set("fontSize", fontSize);
        window.history.replaceState(null, "", "?" + newParams.toString());
    }

    // update preferences if there are any from cookies or the query string
    function loadPreferences() {
        let bgColor = getQueryParam("bgColor") || getCookie("bgColor") || "#ffffff";
        let textColor = getQueryParam("textColor") || getCookie("textColor") || "#000000";
        let fontSize = getQueryParam("fontSize") || getCookie("fontSize") || "16";
        
        applyPreferences(bgColor, textColor, fontSize);

        bgColorInput.value = bgColor;
        textColorInput.value = textColor;
        fontSizeInput.value = fontSize;
    }

    // call proper functions when the form is submitted to create a cookie, generate a query string, and update the appearance
    submitButton.addEventListener("click", function (event) {
        event.preventDefault();
        let bgColor = bgColorInput.value;
        let textColor = textColorInput.value;
        let fontSize = fontSizeInput.value;
        
        applyPreferences(bgColor, textColor, fontSize);

        // create cookies to expire in 7 days
        setCookie("bgColor", bgColor, 7);
        setCookie("textColor", textColor, 7);
        setCookie("fontSize", fontSize, 7);

        // create query string to be shown in URL
        updateQueryString(bgColor, textColor, fontSize);
    });

    loadPreferences();
});
