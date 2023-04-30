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
  useCreateIndex: true,
});

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

module.exports = db;