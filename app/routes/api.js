const fs = require('fs');
const express = require('express');
const { body, validationResult, param } = require('express-validator');
const router = express.Router();

const pathToData = `${__dirname}/../restaurantsData.json`;



router.get('/restaurant', (req, res, next) => {
  fs.readFile(pathToData, (err, data) => {
    console.log('🚀 ~ file: api.js ~ line 11 ~ fs.readFile ~ err', err)
    if (err) return res.status(404).send('Ошибка чтения базы данных!');

    const prepearedData = JSON.parse(data.toString());

    res.send(prepearedData);
  });
});


router.get('/restaurant/:id',
  param('id').isNumeric(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = Number(req.params.id);

    fs.readFile(pathToData, (err, data) => {
      console.log('🚀 ~ file: api.js ~ line 11 ~ fs.readFile ~ err', err)
      if (err) return res.status(404).send('Ошибка чтения базы данных!');

      const prepearedData = JSON.parse(data.toString());
      const restaurant = prepearedData.find(rest => rest.id === id);
      if (!restaurant) return res.status(400).send('Ошибка! Нет элемента с таким id');

      res.send(restaurant);
    });
  });

router.post('/restaurant',
  body('name').isString(),
  body('description').isString(),
  body('averageBill').isNumeric(),
  body('opened').isBoolean(),
  (req, res, next) => {
    const { name, description, averageBill, opened } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // return res.send('ok')

    fs.readFile(pathToData, (err, data) => {
      console.log('🚀 ~ file: api.js ~ line 11 ~ fs.readFile ~ err', err)
      if (err) return res.status(404).send('Ошибка чтения базы данных!');

      const prepearedData = JSON.parse(data.toString());

      const newRestaurant = {
        id: prepearedData.length + 1,
        name,
        description,
        averageBill,
        opened,
      };

      const newRestaurants = [...prepearedData, newRestaurant];

      fs.writeFile(pathToData, JSON.stringify(newRestaurants, null, 2), (err) => {
        console.log('🚀 ~ file: api.js ~ line 56 ~ fs.writeFile ~ err', err)
        if (err) return res.status(404).send('Ошибка записи базы данных!');
        res.send({ success: true, error: false, id: newRestaurant.id });
      })
    });
  });

router.delete('/restaurant',
  body('id').isNumeric(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = Number(req.body.id);




    fs.readFile(pathToData, (err, data) => {
      console.log('🚀 ~ file: api.js ~ line 11 ~ fs.readFile ~ err', err)
      if (err) return res.status(404).send('Ошибка чтения базы данных!');

      const prepearedData = JSON.parse(data.toString());
      const restaurant = prepearedData.find(rest => rest.id === id);
      if (!restaurant) return res.status(400).send('Ошибка! Нет элемента с таким id');

      const newRestaurants = prepearedData.filter(rest => rest.id !== id);

      fs.writeFile(pathToData, JSON.stringify(newRestaurants, null, 2), (err) => {
        console.log('🚀 ~ file: api.js ~ line 56 ~ fs.writeFile ~ err', err)
        if (err) return res.status(404).send('Ошибка записи базы данных!');
        res.send({ success: true, error: false });
      })
    });
  });

module.exports = router;
