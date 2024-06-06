let quoteContainer = document.getElementById('quote-container');
let quoteText = document.getElementById('quote');
let authorText = document.getElementById('author');
let twitterBtn = document.getElementById('twitter');
let newQuoteBtn = document.getElementById('quote-btn');
let loader = document.getElementById("loader");

function loadingFromSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function RemoveFromSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}



let apiQuotes = [];

// define a function to set a quote with random numbers 

function newQuotes() {
    // loading();
    const quotes = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // console.log(quotes);

    // if author is not define then replace the null to "Unknown"
    if(!quotes.author){
        authorText.textContent = "Unknown";
    }
    else{
        authorText.textContent = quotes.author;
    }

    // check the length of quotes if quote greater than 70 the font size of quote is less than
    if(quotes.text.length > 70) {
        quoteText.classList.add("long-quote");
    }else{
        quoteText.classList.remove("long-quote");
    }
    quoteText.textContent = quotes.text;

    RemoveFromSpinner();
}

// to define a function to get a date from api 

const getfunction = async() => {
    loadingFromSpinner();

    let apiUrl = 'https://type.fit/api/quotes';
    try{
        // fetch the date from api 
        let response = await fetch(apiUrl);
        apiQuotes =await response.json();

        newQuotes();
    }catch(error) {
        alert(error);
    }
}

const tweetBtn = () => {
    let tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(tweetUrl, "_blank");
}

newQuoteBtn.addEventListener("click", newQuotes);
twitterBtn.addEventListener("click", tweetBtn);

// on load 
getfunction();