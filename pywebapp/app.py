from flask import Flask, render_template
import requests

app = Flask(__name__)

# Function to fetch a random quote from ZenQuotes API
def get_quote():
    response = requests.get("https://zenquotes.io/api/random")
    data = response.json()
    quote = data[0]['q']  # Extracting the quote from the response
    return quote

@app.route("/")
def index():
    quote = get_quote()
    return render_template("index.html", quote=quote)

if __name__ == "__main__":
    app.run(debug=True)
