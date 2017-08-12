const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let users = [{
  name: 'Vasiliy',
  score: 3
  },
  {
    name: 'Pavel',
    score: 15
  },
  {
    name: 'Semen',
    score: 0
  }
];

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/v1/users', function(req, res) {
  res.send(users);
});

app.get('/v1/users/:id', function(req, res) {
  if (!users[+req.params.id -1]) {
    res.status(404);
    res.send({ error: 'User is not exist' });
  }
  res.send(users[+req.params.id -1]);
  console.log(users[+req.params.id -1]);
});

app.post('/v1/users', function(req, res) {
  if (!req.body.name || ! req.body.score) {
    res.status(400);
    res.send({ error: 'Name or score is not defined' });
  }
  console.log(req.body);
  users.push({
    name: req.body.name,
    score: req.body.score
  });
  res.send(users);
});

app.put('/v1/users/:id', function(req, res) {
  if (!users[+req.params.id -1]) {
    res.status(404);
    res.send({ error: 'User is not exist' });
  }
  users[req.params.id - 1].name = req.body.name;
  users[req.params.id - 1].score = req.body.score;
  res.send(users);
});

app.delete('/v1/users/:id', function (req, res){
  users.splice(req.params.id - 1, 1)
  res.send(users);
});

app.delete('/v1/users', function (req, res){
  users = {};
  res.send(users);
});

app.use(function(req, res, next){
  res.status(404);
  res.send({ error: 'Not found' });
});

app.use(function(err, req, res, next){
  res.status(err.status || 500);
});


app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
