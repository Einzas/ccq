const AppError = require('./utils/appError');
const cors = require('cors');
const express = require('express');
const globalErrorHandler = require('./controllers/error.controller');
const helmet = require('helmet');
const hpp = require('hpp');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const sanitizer = require('perfect-express-sanitizer');

const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/user.routes');
const app = express();

const limiter = rateLimit({
  max: 100000,
  windowMs: 60 * 60 * 1000,

  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(
  sanitizer.clean({
    xss: true,
    noSql: true,
    sql: false,
  })
);
app.use('/api/v1', limiter);
// toutes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server! 🧨`, 404)
  );
});

app.use(globalErrorHandler);
module.exports = app;
