const http = require('http');
const url = require('url');
const fs = require('fs');

http
  .createServer((req, res) => {
    console.log('req.url = ', req.url);
    const { pathname } = url.parse(req.url);
    console.log('pathname = ', pathname);
    switch (pathname) {
      case '/':
        fs.readFile('./html/index.html', (err, content) => {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.write(content);
          res.end();
        });
        break;

      case '/blog':
        fs.readFile('./html/blog.html', (err, content) => {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.write(content);
          res.end();
        });
        break;

      default:
        break;
    }
  })
  .listen(4343, () => {
    console.log('Сервер запустился на порту  4343');
  });
