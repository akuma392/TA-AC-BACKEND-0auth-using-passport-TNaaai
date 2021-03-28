var User = require('../models/user');

module.exports = {
  loggedInUser: (req, res, next) => {
    if (req.session && req.session.userId) {
      next();
    } else {
      res.redirect('/users/login');
    }
  },
  userInfo: (req, res, next) => {
    console.log(req.session, 'tttttttttttttttttttt');

    // if (!req.session.passport) {
    //   let user = undefined;
    //   req.session.passport = user;
    // }
    console.log(req.session, 'gggggggggggggggggggggggggg');
    var userpassport = req.session && req.session.passport;
    if (userpassport) {
      let id = req.session.passport.user;
      User.findById(id, (err, user) => {
        if (err) return next(err);

        res.locals.user = user;
        next();
      });
    } else {
      req.user = null;
      res.locals.user = null;
      next();
    }
  },
};
