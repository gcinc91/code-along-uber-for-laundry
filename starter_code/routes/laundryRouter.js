const express = require("express");
const router = express.Router();
const { roleCheck } = require("../middlewares/roleCheck");
const { isLoggedIn } = require("../middlewares/isLogged");
const User = require("../models/Users");

router.get("/dashboard", isLoggedIn("/"), (req, res, next) => {
  let user= req.user
  let launder=false
  if(req.user.role=="launderer"){
     launder=true
  }
  res.render("laundry/dashboard", {user, launder});
});

router.get("/launderers", isLoggedIn("/"), (req, res, next) => {
  User.find({ role: "launderer" }).then(laun => {
    console.log(laun);
    res.render("laundry/launderers", { laun });
  });
});

router.post("/launderers", (req, res, next) => {
  const userId = req.user._id;
  const laundererInfo = {
    fee: req.body.fee,
    role: 'launderer'
  };

  User.findByIdAndUpdate(userId, laundererInfo, { new: true }).then(theUser => {
    req.session.currentUser = theUser;
    res.redirect("/laundry/dashboard");
  });
});


router.get('/launderers/:id', (req, res, next) => {
  const laundererId = req.params.id;

  User.findById(laundererId)
  .then(theUser => {res.render('laundry/launderer-profile', {theLaunderer: theUser})})
  .catch(console.log("Error al convertir a alunderer"))
})






module.exports = router;
