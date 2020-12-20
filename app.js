var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

var shoppingRoutes = require('./routes/shoppings');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile("index.html");
});

app.use('/api/shoppinglist', shoppingRoutes);

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Deploying Port 3000");
});