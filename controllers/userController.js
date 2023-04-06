const { User, Profile } = require("../models");

class userController {
  static signUpForm(req, res) {
    res.render("signup");
  }

  static postSignUp(req, res) {
    const { email, password } = req.body;
    User.create({ email, password })
      .then((newUser) => {
        res.redirect("/profile");
      })
      .catch((err) => res.send(err));
  }

  static profile(req, res) {
    res.render("profile");
  }

  static addProfile(req, res) {
    const { name, location, noHp } = req.body;
    Profile.create({ name, location, noHp })
      .then((newUser) => {
        res.redirect("/login"); //balik kehalaman login atau home
      })
      .catch((err) => res.send(err));
  }

  static logOut(req, res) {
    req.session.destroy((err) => {
      if (err) res.send(err);
      else res.redirect("/login");
    });
  }

  static viewProfile(req, res) {
    const { UserId } = req.session;
    Profile.findOne({
      where: { UserId },
      include: { model: User, attributes: ["email"] },
    })
      .then((profile) => {
        res.render("viewProfile", { profile });
      })
      .catch((err) => res.send(err));
  }
}

module.exports = userController;
