const express = require("express");
const bodyParser = require("body-parser");
const server = express();
const users = require('./models/users');

server.set('view engine' , 'pug');
server.use(bodyParser.json());



server.get('/api/user', (req, res) => {
  res.json(users)
  // res.render('login', {user:users})
});

server.get('/api/user/:id', (req, res) => {
  const user = users.find((user) => {
    return user.id === req.params.id;
  });

  if(user) {
    res.json(user);
  } else {
    res.status(404).json({errMessage: "찾으시는 사용자가 없습니다."})
  }

});

server.post('/api/user', (req, res) => {
  console.log(req.body);
  users.push(req.body);
  res.json(users)
});

server.put('/api/user/:id', (req, res) => {
  let foundIdx = users.findIndex(user => user.id === req.params.id);

  if(foundIdx === -1) {
    res.status(404).json({errMessage: "찾으시는 사용자가 없습니다."})
  } else {
    users[foundIdx] = {...users[foundIdx], ...req.body}
    res.json(users[foundIdx]);
  }
});

server.delete('/api/user/:id', (req, res) => {
  let foundIdx = users.findIndex(user => user.id === req.params.id);

  if(foundIdx === -1) {
    res.status(404).json({errMessage: "찾으시는 사용자가 없습니다."})
  } else {
    let foundUser = users.splice(foundIdx,1);
    res.json(foundUser[0]);
  }
});

server.listen(3000, () => {
  console.log("서버가 열렸습니다. :>")
})