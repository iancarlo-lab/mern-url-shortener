const router = require('express').Router();
const express = require('express')
const urlRegex = require('url-regex');
const Url = require('../models/urlModels');

//var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
//var regex = new RegExp("(http|ftp|https)://[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?")


// router.get('/', (req,res) => {
//     res.send(html)
// });

router.post('/api/shorturl/new', (req, res) => {

    var original_url = req.body.url;
    //8console.log(original_url)
    var result = urlRegex().test(original_url); //Variable created to test REGEX
    var reservedNumber = generateShortNum();
    var baseUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    //var baseUrl = 'http://localhost:3000/api/shorturl/new'
    var short_url = reservedNumber;

    if(result === true){
    var newUrl = new Url({
        original_url,
        short_url
    });
        newUrl.save(function(err,data){
            if(err){
                console.log(err)
                res.status(500).send(err);
            }else{
             res.send(data);
            }
        });
    }
    else{
            res.send({error: 'Invalid URL'})
        }
   
});


router.get('/api/shorturl/:shortid', function(req, res) {
    var short = req.params.shortid;
    //var shortUrl = short.toString()
    //var baseUrl = `http://localhost:3000/api/shorturl/new/${short}`
    console.log(short)

        Url.find({short_url: short}, function(err,data){
           if(err) {
               return (err)
           } else if(data == null){
                console.log('No data available: ' + data)
               res.status(404).send('Provided URL not founded in our data base')
            }
            else if(data == []){
                console.log("That short url doesn't exist!" + data)
                res.status(404).send('Provided URL not founded in our data base')
            }
            console.log(data)
            const value = data[0].original_url.toString();
            //console.log(typeof value)
            res.json( value)
            }
    );
});


reservedNum = [0,1]
function generateShortNum(){
    var randomNum = 0;
    do {
        randomNum = Math.floor(Math.random()*1000);
    }
    while(reservedNum.indexOf(randomNum) > -1)

    return(randomNum)
}

module.exports = router;
