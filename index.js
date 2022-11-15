const mongoose = require("mongoose");
const express = require('express')
const app = express()
const LogDB = require('./web/other/LogDB');
const bodyparser = require("body-parser")
const ejs = require('ejs');
const UserDB = require("./web/other/UserDB");


process.on('unhandledRejection', (reason, p) => {
  console.log(reason, p)
});
process.on("uncaughtException", (err, origin) => {
  console.log(err, origin)
})
process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log(err, origin)

});

mongoose 
.connect("mongodb+srv://mg:mani2244@cluster0.ldetkfl.mongodb.net/Logs", {
       useNewUrlParser: true,
       useUnifiedTopology: true,
})   
.then(() => console.log("Connected To Database"))
.catch(err => console.log("Kose Nanat Khoamneyi"));

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: true }))

app.get('/', function routeHandler(req, res) {

  res.sendFile(__dirname + "/web/Html/login.html")

});

app.get('/Css/login.css', function routeHandler(req, res) {

  res.sendFile(__dirname + "/web/Css/login.css");
});
app.get('/Css/style.css', function routeHandler(req, res) {

  res.sendFile(__dirname + "/web/Css/style.css");
});
app.get('/Css/Main-Image.jpeg', function routeHandler(req, res) {

  res.sendFile(__dirname + "/web/Css/Main-Image.jpeg");
});

app.post('/', async(req, res) => {

  
  const Data = await UserDB.findOne({Name : req.body.Pass })
  var then = Data.Subscribe
  var now = Date.now()
  var SubTime = Math.abs(then - now)

    const days = Math.floor(SubTime / (24 * 60 * 60 * 1000));
    const daysms = SubTime % (24 * 60 * 60 * 1000);
    const hours = Math.floor(daysms / (60 * 60 * 1000));
    const hoursms = SubTime % (60 * 60 * 1000);
    const minutes = Math.floor(hoursms / (60 * 1000));
    const minutesms = SubTime % (60 * 1000);
    const sec = Math.floor(minutesms / 1000);
  
    LogDB.find({Pass : req.body.Pass }, function(err, user) {
    res.render('index', {
      userslist: user,
      days,
      hours,
      minutes,
      sec,

    })
  })
  
})


var server_port = process.env.YOUR_PORT || process.env.PORT || 8585;
var server_host = process.env.YOUR_HOST || '0.0.0.0';

app.listen(server_port, server_host, function() {
  console.log("Server Online");
});