const express = require('express');

const app = express();

// Function to fetch a random quote from ZenQuotes API
async function fetchQuote() {
    try {
        const response = await fetch('https://zenquotes.io/api/quotes');
        const data = await response.json();
        return data[0].q;
    } catch (error) {
        console.error('Error fetching quote:', error);
        return 'Failed to fetch quote. Please try again later.';
    }
}

// Serve HTML page with random quote
app.get('/', async (req, res) => {
    const quote = await fetchQuote();
    res.json({
        name:quote
    })
    // res.send(`
    //     <!DOCTYPE html>
    //     <html lang="en">
    //     <head>
    //         <meta charset="UTF-8">
    //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //         <title>Random Quote</title>
    //     </head>
    //     <body>
    //         <h1>Random Quote</h1>
    //         <div id="quote">${quote}</div>
    //         <script>
    //             // Function to update quote every 60 seconds
    //             async function updateQuote() {
    //                 const quoteElement = document.getElementById('quote');
    //                 const response = await fetch('/');
    //                 const data = await response.text();
    //                 quoteElement.innerHTML = data;
    //             }
    //             // Update quote immediately and every 60 seconds
    //             updateQuote();
    //             setInterval(updateQuote, 60000);
    //         </script>
    //     </body>
    //     </html>
    // `);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
