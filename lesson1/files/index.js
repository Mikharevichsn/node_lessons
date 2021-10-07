const fs = require('fs');

fs.readFile('./111.txt', (err, data) => {
  if (err) throw err;
  console.log(data);
  console.log(data.toString());
});

fs.writeFile('./222.txt', 'ffffff', (err) => {
  console.log(err);
})