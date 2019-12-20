// let $ = require('jquery')
async function load() {
    let r = await fetch('quotes.json')
    return await r.json()
}
let quotes
let selectedQuote = {}
$(function () {
    load().then(d => {
        quotes = d.quotes
        console.log(`${quotes.length} quotes loaded`)
        updateUI()
    })

    $('body').keypress(function (event) {
        if (event.keyCode == 32) { // space
            newQuote()
        }
    })

    $('#new').click(function () {
        newQuote()
    })

    $('.logo').click(function (event) {
        share(event.target.id)
    })
})

const colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#77B1A9", "#73A857"]

function updateUI() {
    getRandomQuote()
    let color = colors[Math.floor(random(colors.length))]

    $('html').css('--bg', color)
    $('#text').text(selectedQuote.quote)
    $('#author').text(selectedQuote.author)
}

function getRandomQuote() {
    selectedQuote = quotes[random(quotes.length)]
}

function random(max) {
    return Math.floor(Math.random() * max)
}

function newQuote() {
    $("#author").animate(
        { opacity: 0 },
        50,
        function () {
            $(this).animate({ opacity: 1 }, 500);
        }
    )

    $("#text").animate(
        { opacity: 0 },
        50,
        function () {
            $(this).animate({ opacity: 1 }, 500);
        })

    updateUI()
}

function share(id) {
    switch (id) {
        case 'twitter':
            let text = `"${selectedQuote.quote}" --${selectedQuote.author}.`
            window.open(`https://twitter.com/intent/tweet?hashtags=quote,QuoteMachine&&text=${text}`)
            break;

        default:
            console.log('invalid value: share')
            break;
    }
}