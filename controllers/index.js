const {User, Product} = require("../models")
const bcrypt = require('bcryptjs')


class Controller{
  static homeLogin(req, res){
    let {error} = req.query
    res.render('login', {error})
  }

  static validateLogin(req, res){
    let {email, password} = req.body
    const error = `Your login credential don't match an account in our system`
    if(!email){
      return res.redirect(`/login?error=${error}`)
    }
    User.findOne({where: { email }})
    .then((user) => {
      if(user){
        const isValidatePassword = bcrypt.compareSync(password, user.password)
        if(isValidatePassword){
          return res.redirect('/')
        }else{
          return res.redirect(`/login?error=${error}`)
        }
      }
    })
  }

//============= product ==========
  static homeProduct(req, res) {
  Product.findAll()
    .then((products) => {
      res.render('products', { products });
    })
    .catch((err) => {
      console.log(err);
      res.send('ini error');
    });
}

}

module.exports = Controller