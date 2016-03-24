'use strict'
let jwt = require('jsonwebtoken');
let User = require(__dirname + '/../models/user_model');

module.exports = (publicRouter) => {
  publicRouter.post('/login', (req, res) => {
    let authorizationArray = req.headers.authorization.split(' ');
    let base64en = authorizationArray[1];
    let authArray = new Buffer(base64en, 'base64').toString().split(':')
    let name = authArray[0];
    let password = authArray[1];

    User.find({userName: name}, (err, user) => {
      let valid = user[0].compareHash(password);
      if(!valid) {
        return res.json({message: 'incorrect input'})
      }

      res.json({
        status: 200,
        token: user[0].generateToken()
      })
      res.end();
    })
  })
}
