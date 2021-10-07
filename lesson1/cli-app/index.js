const fs = require('fs');
const { Command } = require('commander');
const colors = require('colors');

const filePath = './users.json';

const program = new Command();

program
  .option('-a, --action <type>', 'action')
  .option('-i, --id <type>', 'id')
  .option('-n, --name <type>', 'user name')


program.parse(process.argv);

const argv = program.opts();

const invokeAction = ({ action, id, name }) => {
  switch (action) {
    case 'read':
      fs.readFile(filePath, (err, data) => {
        if (err) return console.log(err);
        if (!id) return console.log('Не указан id пользователя'.red);

        const parsedData = JSON.parse(data.toString());
        const user = parsedData.users.find(user => user.id === Number(id));
        console.log(user);
      })
      break;

      case 'add':
        fs.readFile(filePath, (err, data) => {
          if (err) return console.log(err);
          if (!name) return console.log('Не указан name пользователя'.red);
  
          const parsedData = JSON.parse(data.toString());
          const newUser = {
            id: parsedData.users.length + 1,
            name,
          };

          parsedData.users.push(newUser);

          fs.writeFile(filePath, JSON.stringify(parsedData, null, 2), (err) => {
            if (err) console.log(err);
          })
        })
        break;

        case 'delete':
        fs.readFile(filePath, (err, data) => {
          if (err) return console.log(err);
          if (!id) return console.log('Не указан id пользователя'.red);
  
          const parsedData = JSON.parse(data.toString());

          parsedData.users = parsedData.users.filter(user => user.id !== Number(id));

          fs.writeFile(filePath, JSON.stringify(parsedData, null, 2), (err) => {
            if (err) console.log(err);
          })
        })
        break;
  
    default:
      console.log('Нет такого action');
      break;
  }
}

invokeAction(argv);

// const readUser = (id) => {
//   fs.readFile(filePath, (err, data) => {
//     if (err) return console.log(err);
  
//     const parsedData = JSON.parse(data.toString());
//     const user = parsedData.users.find(user => user.id === id);
//     console.log(user);
//   })
// };