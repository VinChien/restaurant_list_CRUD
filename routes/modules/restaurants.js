// require Express and Express router
const express = require('express');
const router = express.Router();

// require restaurant model
const restaurant = require('../../models/restaurant');

// create page
router.get('/new', (req, res) => {
  res.render('new');
});

// create
router.post('/', (req, res) => {
  const userId = req.user._id;
  const restaurantData = { ...req.body, userId };
  restaurant
    .create(restaurantData)
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err));
});

// detail
router.get('/:id', (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  return restaurant
    .findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('detail', { restaurant: restaurant }))
    .catch((error) => console.log(error));
});

// edit page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  restaurant
    .findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant: restaurant }))
    .catch((error) => console.log(error));
});

// edit
router.put('/:id', (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  const updateData = req.body;
  restaurant
    .findOneAndUpdate({ _id, userId, updateData })
    .then(() => {
      res.redirect(`/restaurants/${_id}`);
    })
    .catch((error) => {
      console.log(error);
    });
});

// delete page
router.get('/:id/delete', (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  return restaurant
    .findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('delete', { restaurant: restaurant }))
    .catch((error) => console.log(error));
});

// export router
module.exports = router;
