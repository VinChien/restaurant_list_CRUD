// require packages used in the project
const express = require('express');
const app = express();
const port = 3000;

// require mongoose
const mongoose = require('mongoose');
// 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
// setting connect to mongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// require express-handlebars
const exphbs = require('express-handlebars');

const restaurantList = require('./restaurant.json');

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// setting static files
app.use(express.static('public'));

// get database connect status
const db = mongoose.connection;
// connect error
db.on('error', () => {
  console.log('mongodb error!');
});
// connect success
db.once('open', () => {
  console.log('mongodb connected!');
});

// routes setting
// index
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results });
});
// show
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(
    (restaurant) => restaurant.id.toString() === req.params.restaurant_id
  );
  res.render('show', { restaurant: restaurant });
});
// search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword;
  const restaurants = restaurantList.results.filter((restaurant) => {
    return restaurant.name
      .toLocaleLowerCase()
      .includes(keyword.toLocaleLowerCase());
  });
  res.render('index', { restaurants: restaurants, keyword: keyword });
});

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});