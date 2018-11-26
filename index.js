/* modules */
const express = require('express');

/* services */
require('./services/passport'); // 매번 수행됨

/* routes */
const home = require('./routes/home');
const auth = require('./routes/auth');

/* middleware */
const app = express();
app.use('/auth/google', auth);
app.use('/', home);

/* port */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
  console.log(`Listening on port ${PORT}`);
})