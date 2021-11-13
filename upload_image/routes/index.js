const dayjs = require('dayjs');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { rename } = require('fs/promises');
const Jimp = require('jimp');
const path = require('path');

const TMP_IMAGES_PATH = 'tmp/images/';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TMP_IMAGES_PATH);
  },
  filename: function (req, file, cb) {
    const arrFromStr = file.originalname.split('.');
    const ext = arrFromStr[arrFromStr.length - 1];

    const now = dayjs().format('DD-MM-YYYY_HH-mm-ss');

    const newFilename = `${file.fieldname}_${now}.${ext}`;
    cb(null, newFilename);
  },
});

const upload = multer({ storage: storage });

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post(
  '/profile',
  upload.single('avatar'),
  async function (req, res, next) {
    const img = await Jimp.read(req.file.path);
    await img
      .autocrop()
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(req.file.path);

    const newPath = path.join('public', 'images', req.file.filename);
    const url = newPath.replace('public', '');

    await rename(req.file.path, newPath, (err) => {
      if (err) throw err;
      console.log('renamed complete');
    });

    // записать юзеру в БД

    res.send({
      success: true,
      url,
    });
  }
);

module.exports = router;
