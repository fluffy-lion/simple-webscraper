const PORT = 8000

const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

const url = 'https://www.discogs.com/sell/list?sort=listed%2Cdesc&limit=50&genre=Rock&ships_from=United+Kingdom&format=Vinyl&condition=Mint+%28M%29'
// pass a url and get a response back
axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const articles = []
        $('.shortcut_navigable', html).each(function() {
            const title = $(this).find('a[class=item_description_title]').text()
            //.hasClass('item_description_title')
            // const title = $(this).find('.item_description_title').attr('href')
            articles.push({
                title,
                // url
            })
        })
        console.log('item: ', articles)
    }).catch(err => console.log(err))

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})