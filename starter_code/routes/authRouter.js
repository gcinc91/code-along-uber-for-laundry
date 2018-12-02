const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const passport = require("passport");

/* GET home page */
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

router.post("/signup", (req, res, next) => {
  const { username, password } = req.body;
  if (username === "" || password === "") {
    res.render("auth/signup", {
      errorMessage: " Error, no se puede poner campos vacios"
    });
  }
  User.findOne({ username: username }, "username").then(user => {
    if (user == null) {
      const salt = bcrypt.genSaltSync(saltRounds);
      let hash = bcrypt.hashSync(password, salt);
      User.create({ username, password: hash })
        .then(
          res.render("auth/signup", {
            errorMessage: "Usuario creado"
          })
        )
        .catch(() => {
          res.render("auth/signup", {
            errorMessage: " Error, no se puede poner campos vacios"
          });
        });
    }
  });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "./login",
  passReqToCallback: true
}));


router.get('/logout',(req,res) => {
  req.logout();
  res.redirect('/')
 })


module.exports = router;
