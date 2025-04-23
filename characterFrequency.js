const fileInput = document.getElementById('fileInput');
const ctx = document.getElementById('charChart').getContext('2d');
let chart;

fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;

    // creates file reader
    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        const freqMap = {};

        // loops through to properly adjust frequency of characters
        for (let char of text) {
            char = char.toLowerCase(); // Normalize case
            if (!char.match(/[a-z0-9]/)) continue; // Filter to alphanumerics
            freqMap[char] = (freqMap[char] || 0) + 1;
        }


        const sortedEntries = Object.entries(freqMap).sort((a, b) => b[1] - a[1]);
        const labels = sortedEntries.map(entry => entry[0]);
        const data = sortedEntries.map(entry => entry[1]);


        if (chart) chart.destroy();

        // creates bar chart based on frequencies
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Character Frequency',
                    data: data,
                    borderWidth: 1
                }]
            },

            // sets labels on the axes, for character and frequency
            options: {
                scales: {
                    x: { title: { display: true, text: 'Character' }},
                    y: { beginAtZero: true, title: { display: true, text: 'Frequency' }}
                }
            }
        });
    };

    reader.readAsText(file);
});
