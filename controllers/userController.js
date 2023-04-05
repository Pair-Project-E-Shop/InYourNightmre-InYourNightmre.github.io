const { User, Profile } = require('../models')

class userController{
    static signUpForm(req, res){
        res.render('signup')
    }
    
    static postSignUp(req, res){
    const {email, password} = req.body
    User.create({email, password})
    .then(newUser =>{
    res.redirect('/profile')//balik kehalaman login atau home
    })
    .catch(err => res.send(err))
    }

    static profile(req, res){
      res.render('profile')
    }

    static addProfile(req, res){
      const {name, location, noHp} = req.body
      Profile.create({name, location, noHp})
      .then(newUser =>{
      res.redirect('/login')//balik kehalaman login atau home
      })
      .catch(err => res.send(err))
      
    }
}

module.exports = userController