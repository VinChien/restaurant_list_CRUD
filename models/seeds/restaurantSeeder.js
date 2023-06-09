// 載入model
const Restaurant = require('../restaurant');
const User = require('../user');
// 載入json
const restaurantList = require('../../restaurant.json').results;

const bcrypt = require('bcryptjs');

const db = require('../../config/mongoose');

// user的種子資料
const SEED_USER = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    quantity: [1, 2, 3],
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    quantity: [4, 5, 6],
  },
];

db.once('open', () => {
  console.log('running restaurantSeeder script...');
  for (let i = 0; i < SEED_USER.length; i++) {
    User.findOne({ email: SEED_USER[i].email }).then((user) => {
      // 確認資料是否建立
      if (user) {
        console.log('Email已經存在!');
        if (i === SEED_USER.length - 1) {
          console.log('done');
          process.exit();
        }
        return;
      }
      bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(SEED_USER[i].password, salt))
        .then((hash) =>
          User.create({
            name: SEED_USER[i].name,
            email: SEED_USER[i].email,
            password: hash,
          })
        )
        .then((user) => {
          const userId = user._id;
          return Promise.all(
            Array.from({ length: SEED_USER[i].quantity.length }, (_, j) => {
              // 擷取相關的餐廳
              const restaurant = restaurantList.find(
                (restaurant) => restaurant.id === SEED_USER[i].quantity[j]
              );
              const restaurantData = { ...restaurant, userId };
              // 建立資料
              return Restaurant.create(restaurantData);
            })
          );
        })
        .then(() => {
          if (i === SEED_USER.length - 1) {
            console.log('done');
            process.exit();
          }
        });
    });
  }
});
