import mongoose from 'mongoose';

const db = mongoose.connect(
  'mongodb+srv://serjo:FEbMO7VHQtxFXueL@cluster0.idfrh.mongodb.net/example?retryWrites=true&w=majority',
  {}
);

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
})

export default db;