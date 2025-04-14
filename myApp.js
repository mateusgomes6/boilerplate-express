const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip)
  next();
})

app.use('/public', express.static(__dirname + '/public'));

app.route('/name')
  .get((req, res) => {
  console.log(req.query);
  res.json({ name: `${req.query.first} ${req.query.last}`});
})
  .post((req, res) => {
  console.log(req.body.first);
  console.log(req.body.last);
  res.json({ name: `${req.body.first} ${req.body.last}`});
});

app.get('/json', (req, res) => {
   const HelloJson = 'Hello json';
   let message;
   if (process.env.MESSAGE_STYLE === 'uppercase') {
     message = HelloJson.toUpperCase();
   } else {
     message = HelloJson;
   }
  const data = {
    'message': message
  };
  res.json(data);
});

app.get('/', (req, res) => {
  let absolutePath = __dirname + '/views/index.html';
  res.sendFile(absolutePath);
});

app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.send({time: req.time});
});

app.get('/:word/echo', (req, res) => {
  const word = req.params.word;
  res.json({echo: word})
});




































 module.exports = app;
