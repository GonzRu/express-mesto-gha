require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const process = require('process');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
const { createUser, login } = require('./controllers/usres');
const { linkValidator } = require('./utils/validators');

const { PORT = 3000 } = process.env;

process.on('uncaughtException', (err, origin) => {
  // eslint-disable-next-line no-console
  console.log(`${origin} ${err.name} c текстом ${err.message} не была обработана.`);
});

const app = express();

mongoose.connect('mongodb://localhost:27017/mesto');

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(linkValidator),
    }),
  }),
  createUser,
);
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

app.use(require('./midlewares/auth'));

app.use(require('./routes/users'));
app.use(require('./routes/cards'));
app.use(require('./midlewares/notFound'));

app.use(errors());
app.use(require('./midlewares/errors'));

app.listen(PORT);
