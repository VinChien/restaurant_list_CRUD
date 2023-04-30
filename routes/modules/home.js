// require Express and Express router
const express = require('express');
const router = express.Router();

// require restaurant model
const restaurant = require('../../models/restaurant');

// index
router.get('/', (req, res) => {
  const userId = req.user._id;
  restaurant
    .find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then((restaurants) => res.render('index', { restaurants: restaurants }))
    .catch((error) => console.error(error));
});

// delete
router.delete('/:id', (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  restaurant
    .findOneAndDelete({ _id, userId })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error));
});

// export router
module.exports = router;
