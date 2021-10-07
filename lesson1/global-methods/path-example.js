const path = require('path');


console.log(path.relative('./dir1/dir1-1', './dir2'));
console.log(path.normalize('./dir1////dir1-1/../dir1-1////123.txt'));
console.log(path.parse('./dir1/dir1-1/123.txt'));
console.log(path.sep);
console.log(path.join('dir1', 'dir1-1'));
console.log(path.resolve('./dir1/dir1-1', './123.txt'));


