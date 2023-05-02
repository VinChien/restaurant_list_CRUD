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
  const {
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  } = req.body;
  const userId = req.user._id;
  const _id = req.params.id;
  restaurant
    .findOne({ _id, userId })
    .then((restaurant) => {
      (restaurant.name = name),
        (restaurant.name_en = name_en),
        (restaurant.category = category),
        (restaurant.image = image),
        (restaurant.location = location),
        (restaurant.phone = phone),
        (restaurant.google_map = google_map),
        (restaurant.rating = rating),
        (restaurant.description = description);
      return restaurant.save();
    })
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
