'use strict'
let User = require(__dirname + '/../models/user_model');

module.exports = (apiRouter) => {
  apiRouter.route('/createUser')
    .post((req, res) => {
      req.on('data', (data) => {
        req.body = JSON.parse(data);
        let name = req.body.userName
        User.findOne({userName: name}, (err, user) => {
          if(user) {
            res.status(404).json({message: 'username is already taken'})
          }
          if (user == null) {
            let newUser = new User(req.body);
            newUser.save((err, user) => {
              res.json({
                status: 200,
                data: user
              })
              res.end();
            })
          }
        })
      })
    })
}
