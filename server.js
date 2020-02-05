var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

//import routes
const routes = require('./routes/routes');
require('dotenv').config()
var app = express();

const uri = process.env.MONGO_URI;
mongoose.connect( process.env.MONGODB_URI || uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Database connection succesful!")
})

app.use(express.json());
app.use(bodyParser.urlencoded({extended: 'false'}));
app.use(bodyParser.json());
app.use(cors());
app.use('/', routes);

//var baseUrl = 'glitch.com/~motley-elderberry/';


//Make sure we use the client folder when in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });
}

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port: ${port}`));
