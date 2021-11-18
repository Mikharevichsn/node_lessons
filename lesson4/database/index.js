import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const db = mongoose.connect(process.env.DB_URL, {});

mongoose.connection.on('connected', () => {
  console.log('Подключились к БД');
});

mongoose.connection.on('error', (err) => {
  console.log('Что-то не так с подключением к БД');
  console.log('error: ', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('Отключились от БД');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    process.exit(1);
  });
});

export default db;
