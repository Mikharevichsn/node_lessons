import express from 'express';
import cors from 'cors';
import { HttpCodes } from './constants.js';
import catsRouter from './api/cats/catsRouter.js';
import userRouter from './api/cats/userRouter.js';
import './database/index.js';

const app = express();
const PORT = process.env.PORT || 6789;

app.use(cors());
app.use(express.json());

app.use('/api/cat', catsRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
  res.send('works!')
})

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

  const data = err.status >= 500 && err.status < 600 ? 'Internal Server Error' : err.data;
  const message = err.message || 'Упс! Что-то сломалось! Мы уже чиним!';

  res.status(err.status).send({
    success: false,
    code: err.status,
    data,
    message: err.status >= 500 && err.status < 600 ? 'Internal Server Error' : message,
  });
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
})