const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const process = require('process');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mesto');

app.use(cors());
app.use((req, res, next) => {
  req.user = {
    _id: '6323082955e2de14704d5966',
  };

  next();
});
app.use(require('body-parser').json());
app.use(require('./routes/auth'));
app.use(require('./routes/users'));
app.use(require('./routes/cards'));
app.use(require('./midlewares/notFound'));

app.listen(PORT);

process.on('uncaughtException', (err, origin) => {
  console.log(`${origin} ${err.name} c текстом ${err.message} не была обработана. Обратите внимание!`);
});
