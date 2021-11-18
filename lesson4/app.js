import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { HttpCodes } from './constants.js';
import catsRouter from './api/cats/catsRouter.js';
import userRouter from './api/cats/userRouter.js';
import './database/index.js';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  handler: (req, res) => {
    res.status(403).send({ message: ' Превышен лимит запросов' });
  },
});

export const app = express();
const PORT = process.env.PORT || 6789;

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: 10000 }));

app.use('/api/', limiter);

app.use('/api/cat', catsRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
  res.send('works!');
});

app.use((req, res, next) => {
  console.log(res);

  res.status(HttpCodes.NOT_FOUND).send({
    success: false,
    code: HttpCodes.NOT_FOUND,
    data: `Not found`,
    message: `Страница ${req.headers.host + req.originalUrl} не найдена`,
  });
});

app.use((err, req, res, next) => {
  err.status = err.status ? err.status : HttpCodes.INTERNAL_SERVER_ERROR;

  const data =
    err.status >= 500 && err.status < 600 ? 'Internal Server Error' : err.data;
  const message = err.message || 'Упс! Что-то сломалось! Мы уже чиним!';

  res.status(err.status).send({
    success: false,
    code: err.status,
    data,
    message:
      err.status >= 500 && err.status < 600 ? 'Internal Server Error' : message,
  });
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
