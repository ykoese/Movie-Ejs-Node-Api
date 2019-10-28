const express = require('express');
const request = require('request');


const app = express();
app.set('view engine', 'ejs');

app.use(express.static('public'));//css i eklemek icin

app.get('/', (req, res) => {
    res.render('search');
})
const API_KEY = ""
app.get('/results', (req, res) => {
    const query = req.query.search;
    const url = `http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
    //res.send('hello, it works') send this to brwoser
    request(url, function (error, response, body) {
        /* eval(require('locus'))  */ // for debugging
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            //res.send(results['Search'][0]['Title']);
            res.render('results', { data: data });
        }
    });
});


app.listen(8003, () => {
    console.log(`Movie app has started on http://localhost:8003`)
});
