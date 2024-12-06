const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

const users = [
  {id: "1", name: "Bruno", apellido: "Fandiño", tlf: "123456789"},
  {id: "2", name: "Ana", apellido: "Martínez", tlf: "987654321"},
  {id: "3", name: "Carlos", apellido: "Pérez", tlf: "456789123"},
  {id: "4", name: "Lucía", apellido: "García", tlf: "321654987"},
  {id: "5", name: "Javier", apellido: "López", tlf: "654321789"},
  {id: "6", name: "María", apellido: "Hernández", tlf: "789123456"},
  {id: "7", name: "Luis", apellido: "Sánchez", tlf: "159753486"},
  {id: "8", name: "Sofía", apellido: "Torres", tlf: "753159864"},
  {id: "9", name: "Fernando", apellido: "Gómez", tlf: "951357486"},
  {id: "10", name: "Isabel", apellido: "Cruz", tlf: "852369741"}
];

app.get('/users',(req,res) => {
  res.json(users);
});

app.get('/users/:id', (req,res) => {
  let userId = parseInt(req.params.id, 10);
  res.json(users[userId - 1])
});

app.post('/users', (req,res) => {
  let newUser = {
    id: users.length + 1,
    name: req.body.name,
    apellido: req.body.apellido,
    tlf: req.body.tlf
  }

  users.push(newUser)
  res.status(201).json(newUser);
})

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;