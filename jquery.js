// JQuery for final website

$(document).ready(function () {
    // --- jQuery Effect 1: Disappearance ---
    $('#disappearBtn').click(function () {
        $('#selectedBook').animate({ 
            opacity: 0,
            fontSize: "0px"
        }, 600).slideUp(400);
    });

    // --- jQuery Effect 2: Reappearance ---
    $('#reappearBtn').click(function () {
        $('#selectedBook')
    .css({ display: "none", fontSize: "10px", opacity: 0 })
    .slideDown(300)
    .animate({
        fontSize: "20px",
        opacity: 1
    }, 500)
    .css("color", "#6C584C");
    });


    // --- Autosuggest Bible Books ---
    // list of books that can be suggested
    const booksOfBible = [
        "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
        "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
        "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra",
        "Nehemiah", "Esther", "Job", "Psalms", "Proverbs",
        "Ecclesiastes", "Song of Songs", "Isaiah", "Jeremiah", "Lamentations",
        "Ezekiel", "Daniel", "Hosea", "Joel", "Amos",
        "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk",
        "Zephaniah", "Haggai", "Zechariah", "Malachi",
        "Matthew", "Mark", "Luke", "John", "Acts",
        "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians",
        "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy",
        "2 Timothy", "Titus", "Philemon", "Hebrews", "James",
        "1 Peter", "2 Peter", "1 John", "2 John", "3 John",
        "Jude", "Revelation"
    ];

    // populates the possible books using suggestive search
    $('#bibleSearch').on('input', function () {
        const query = $(this).val().toLowerCase();
        const filtered = booksOfBible.filter(book => book.toLowerCase().startsWith(query));
        const suggestions = filtered.map(book => `<li>${book}</li>`).join('');
        $('#suggestions').html(suggestions);
    });

    // allow click to autofill
    $('#suggestions').on('click', 'li', function () {
        const book = $(this).text();
        $('#bibleSearch').val(book);
        $('#suggestions').empty();
    
        // Display the selected book to apply a jQuery effect
        $('#selectedBook').text(`You selected: ${book}`).hide().fadeIn(600);
    });
    
});
