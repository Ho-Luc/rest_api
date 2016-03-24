'use strict'

let express = require('express');
let app = express();
let apiRouter = express.Router();
let publicRouter = express.Router();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let authenticate = require(__dirname + '/lib/authenticate');

require('./routes/login')(publicRouter);
require('./routes/userRoute')(publicRouter)
require('./routes/animals-route')(apiRouter);
require('./routes/people-route')(apiRouter);

mongoose.connect('mongodb://localhost/db')
app.use(bodyParser.json());

app.use('/api', authenticate , apiRouter);
app.use('/', publicRouter);

app.listen(3000, () => {
  console.log('server started on port 3000');
})
