/* modules */
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const config = require('config');
const express = require('express');
const passport = require('passport');

/* services */
require('./services/passport'); // 매번 수행됨

/* routes */
const home = require('./routes/home');
const auth = require('./routes/auth');
const users = require('./routes/users');

/* database */
mongoose.connect(config.DB.mongoURI, { useNewUrlParser: true })
  .then(() => console.log('CONNECTED TO MONGODB'))
  .catch(error => console.error(error.message));

/* middleware */
  // NPM
const app = express();
app.use(
  cookieSession({ // req.session 으로의 접근을 가능케 함
    name: 'MERN cookie',
    maxAge: (30 * 24 * 60 * 60 * 1000), // 쿠키의 유통기한 설정 mili second 단위로 설정한다.
    keys: [config.cookieKey] // cookie-session이 암호화한걸 풀 때 쓰는 key 1번째 key가 master key
  })
)
app.use(passport.initialize()); // 인증모듈의 초기화
app.use(passport.session()); // req.user라는 <USER INSTANCE>를 사용할 수 있다.
  // routes
app.use('/', home);
app.use('/auth/google', auth);
app.use('/api/users', users);

/* port */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
  console.log(`Listening on port ${PORT}`);
})