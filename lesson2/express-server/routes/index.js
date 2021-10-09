const express = require('express');
const { posts } = require('../data/blogPosts');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Expre555ss' });
});

router.get('/blog', function (req, res, next) {
  res.render('blog', {
    title: 'Expre555ss',
    subTitle: 'Подзаголовок 454545',
    posts,
    user: { name: 'Serjo' },
  });
});

module.exports = router;
