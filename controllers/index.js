const {User, Product, Category} = require("../models")
const bcrypt = require('bcryptjs')


class Controller{
  static homeLogin(req, res){
    let {error} = req.query
    res.render('login', {error})
  }

  static validateLogin(req, res){
    let {email, password} = req.body
    const error = `Your login credential don't match an account in our system`
    
    User.findOne({where: { email }})
    .then((user) => {
      if(user){
        const isValidatePassword = bcrypt.compareSync(password, user.password)
        if(isValidatePassword){
          req.session.UserId = user.id
          return res.redirect('/')
        }else{
          return res.redirect(`/login?error=${error}`)
        }
      }else{
          return res.redirect(`/login?error=${error}`)
      }
    })
    .catch((err) => res.send(err))
  }

//============= product ==========
  static homeProduct(req, res) {
    let userid = req.session.UserId
    let listProduct
  Product.findAll()
    .then((products) => {
      listProduct = products
      return User.findByPk(userid)
    })
    .then((user) => {
      res.render('products', { user, listProduct })
    })
    .catch((err) => {
      res.send('ini error');
    });
  }

  static addProduct(req, res){
    let userid = req.session.UserId
    let listCategory
    Category.findAll()
    .then((list)=> {
      listCategory = list
      return User.findByPk(userid)
    })
    .then((user) => {
      res.render('addProduct', { user, listCategory })
    })
    .catch((err) => {
      res.send('ini error');
    });
  }

  static createProduct(req, res){
    console.log(req.body)
    const {name, description, price, CategoryId, imageURL} = req.body
    Product.create({name, description, price, CategoryId, imageURL})
    .then(() => res.redirect('/'))
    .catch((err) => res.send(err))
  }

}

module.exports = Controller