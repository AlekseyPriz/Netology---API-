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

let RPC = {
  getUsers: function (req, res) {
    res.send(users);
  },

  getUser: function(req, res) {
    if (!users[+req.body.id]) {
      res.status(404);
      res.send({ error: 'User is not exist' });
    } else {
      res.send(users[req.body.id]);
    }
  },

  createUser: function(req, res) {
    if (!req.body.name) {
      res.status(400);
      res.send({ error: 'Name is not defined' });
    } else if (!req.body.score) {
      res.status(400);
      res.send({ error: 'Score is not defined' });
    } else {
      users.push({
        name: req.body.name,
        score: req.body.score
      });
      res.send(users);
    }
  },

  updateUser: function(req, res) {
    if (!users[req.body.id]) {
      res.status(404);
      res.send({ error: 'User is not exist' });
    }
    users[req.body.id].name = req.body.name;
    users[req.body.id].score = req.body.score;
    res.send(users);
  },

  deleteUser: function (req, res){
    if (!users[req.body.id]) {
      res.status(404);
      res.send({ error: 'User is not exist' });
    } else {
      users.splice(req.body.id - 1, 1);
      res.send(users);
    }
  },

  deleteAllUsres: function (req, res){
    users = {};
    res.send(users);
  }
};

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/rpc", function(req, res) {
  console.log(req.body);
  const method = RPC[req.body.method];
  method(req, res);
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
