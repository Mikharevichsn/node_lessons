const fs = require('fs');
const filePath = './guests.json';

console.log(111);

fs.readFile(filePath, (err, data) => {
  // console.log(data.toString());
  const obj = JSON.parse(data.toString());
  console.log(obj);
  // console.log(obj.names);
  // obj.names.push('Kris');
  // console.log(obj.names);
  // fs.writeFile(filePath, JSON.stringify(obj, null, 2), (err) => console.log(err))
});

console.log(222);