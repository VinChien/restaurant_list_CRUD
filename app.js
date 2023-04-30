// require packages used in the project
const express = require('express');

const session = require('express-session');

const app = express();
const port = 3000;
// require express-handlebars
const exphbs = require('express-handlebars');
// require body-parser
const bodyParser = require('body-parser');
// require methodOverride
const methodOverride = require('method-override');
// require router
const routes = require('./routes');

// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport');

// require mongoose config
require('./config/mongoose');

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(
  session({
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true,
  })
);

// setting static files
app.use(express.static('public'));
// 每筆請求都要透過 body-parser 作前置處理
app.use(bodyParser.urlencoded({ extended: true }));
// 每筆請求都會先以 methodOverride 進行前置處理
app.use(methodOverride('_method'));
// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app);
// 使用 app.use 代表這組 middleware 會作用於所有的路由
app.use((req, res, next) => {
  // 你可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  next();
});
// import request into router
app.use(routes);

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
