document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('name');
    const timezoneSelect = document.getElementById('timezone');
    const getQuoteButton = document.getElementById('getQuoteButton');
    const quoteSection = document.getElementById('quote-section');
    const hourlyQuoteDisplay = document.getElementById('hourly-quote');

    const quotes = [
        "The only way to do great work is to love what you do.",
        "Strive not to be a success, but rather to be of value.",
        "The mind is everything. What you think you become.",
        "Believe you can and you're halfway there.",
        "The future belongs to those who believe in the beauty of their dreams.",
        "Don't watch the clock; do what it does. Keep going.",
        "It does not matter how slowly you go as long as you do not stop.",
        "Our greatest glory is not in never failing, but in rising up every time we fail.",
        "The journey of a thousand miles begins with a single step.",
        "Success is not final, failure is not fatal: it is the courage to continue that counts."
        // Add more motivational quotes here!
    ];

    function getRandomQuote() {
        return quotes[Math.floor(Math.random() * quotes.length)];
    }

    function updateQuote() {
        const name = nameInput.value.trim();
        const quote = getRandomQuote();
        const greeting = name ? `${name}, here's your inspiration for the hour:\n\n` : "Here's your inspiration for the hour:\n\n";
        hourlyQuoteDisplay.textContent = greeting + quote;
        quoteSection.classList.remove('hidden');
    }

    getQuoteButton.addEventListener('click', () => {
        const selectedTimezone = timezoneSelect.value;
        if (nameInput.value.trim() && selectedTimezone) {
            localStorage.setItem('userName', nameInput.value.trim());
            localStorage.setItem('userTimezone', selectedTimezone);
            setupHourlyUpdates(selectedTimezone);
            updateQuote(); // Show initial quote
            // Optionally disable the input fields and button after submission
            nameInput.disabled = true;
            timezoneSelect.disabled = true;
            getQuoteButton.disabled = true;
        } else {
            alert('Please enter your name and select your timezone.');
        }
    });

    function setupHourlyUpdates(timezone) {
        function checkAndUpdate() {
            const now = new Date();
            // Get the current hour in the user's timezone
            const userTime = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
            const currentMinute = userTime.getMinutes();

            // Update the quote at the start of the hour (minute 0)
            if (currentMinute === 0) {
                updateQuote();
            }
        }

        // Check immediately and then every minute
        checkAndUpdate();
        setInterval(checkAndUpdate, 60 * 1000); // Check every minute
    }

    // Check if user data is already stored and restore if so
    const storedName = localStorage.getItem('userName');
    const storedTimezone = localStorage.getItem('userTimezone');
    if (storedName && storedTimezone) {
        nameInput.value = storedName;
        timezoneSelect.value = storedTimezone;
        setupHourlyUpdates(storedTimezone);
        updateQuote(); // Show initial quote
        nameInput.disabled = true;
        timezoneSelect.disabled = true;
        getQuoteButton.disabled = true;
    }
});
