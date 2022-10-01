const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const process = require('process');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { createUser, login } = require('./controllers/usres');

const { PORT = 3001 } = process.env;

process.on('uncaughtException', (err, origin) => {
  console.log(`${origin} ${err.name} c текстом ${err.message} не была обработана. Обратите внимание!`);
});

const app = express();

mongoose.connect('mongodb://localhost:27017/mesto');

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/signup', createUser);
app.post('/signin', login);

app.use(require('./midlewares/auth'));

app.use(require('./routes/users'));
app.use(require('./routes/cards'));
app.use(require('./midlewares/notFound'));
app.use(require('./midlewares/errors'));

app.listen(PORT);
