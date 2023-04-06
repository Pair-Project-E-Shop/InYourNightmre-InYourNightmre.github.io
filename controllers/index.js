const { User, Product, Category, Chart } = require("../models")
const bcrypt = require('bcryptjs')
const formatSalary = require('../helper/formatSalary')
const {Op} = require('sequelize')


class Controller {
  static homeLogin(req, res) {
    let { error } = req.query
    res.render('login', { error })
  }

  static validateLogin(req, res) {
    let { email, password } = req.body
    const error = `Your login credential don't match an account in our system`

    User.findOne({ where: { email } })
      .then((user) => {
        if (user) {
          const isValidatePassword = bcrypt.compareSync(password, user.password)
          if (isValidatePassword) {
            req.session.UserId = user.id
            return res.redirect('/')
          } else {
            return res.redirect(`/login?error=${error}`)
          }
        } else {
          return res.redirect(`/login?error=${error}`)
        }
      })
      .catch((err) => res.send(err))
  }

  //============= product ==========
  static homeProduct(req, res) {
    let userid = req.session.UserId
    let {search} = req.query
    let listProduct
    let option = {
      include: {
        model: Category
      }
    }
    if(search){
      option.where = {
        name:{
          [Op.iLike]: `%${search}%`
        }
      }
    }
    Product.findAll(option)
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

  static addProduct(req, res) {
    let userid = req.session.UserId
    let error = req.query.error
    let listCategory
    Category.findAll()
      .then((list) => {
        listCategory = list
        return User.findByPk(userid)
      })
      .then((user) => {
        res.render('addProduct', { user, listCategory, error })
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static createProduct(req, res) {
    let { name, description, price, CategoryId, imageURL } = req.body
    if(req.file.filename){
      let filename = req.file.filename 
      imageURL = filename
    }
    Product.create({ name, description, price, CategoryId, imageURL })
      .then(() => res.redirect('/'))
      .catch((err) => {
        if (err.name === "SequelizeValidationError") {
          const error = err.errors.map(el => {
            return el.message
          })
          res.redirect(`/add/product?error=${error}`)
        }else{
          res.send(err)
        }
      })
  }

  static detailProduct(req, res) {
    let id = req.params.productId
    let userid = req.session.UserId
    let product
    Product.findByPk(id)
      .then((list) => {
        product = list

        return User.findByPk(userid)
      })
      .then((user) => {
        res.render('detailProduct', { product, user, formatSalary })
      })
      .catch((err) => res.send(err))
  }

  static deleteProduct(req, res) {
    let id = req.params.productId

    Product.destroy({
      where: {
        id: id
      },
    })
      .then(() => {
        res.redirect('/');
      })
      .catch((err) => {
        response.send(err)
        console.log(err);
      })
  }

  static buy(req, res) {
    const userId = req.session.UserId
    const productId = req.params.productId
    const data = {UserId:userId,ProductId:productId}

    Chart.create(data)
    .then((el) => {
      res.redirect(`/product/${productId}`)
    })
    .catch((err)=> res.send(err))
  }

  static editProduct(req, res) {
    let userid = req.session.UserId
    let id = req.params.productId
    let user
    let category
    User.findByPk(userid)
      .then((dataUser) => {
        user = dataUser
        return Category.findAll()
      })
      .then((Category) => {
        category = Category
        return Product.findByPk(id)

      })
      .then((product) => {
        console.log(user)
        res.render('edit-product', { user, category, product })
      })
      .catch((err) => res.send(err))
  }
  static updateProduct(req, res){
    let id = req.params.productId
    let { name, description, price, CategoryId, imageURL } = req.body
    Product.update({ name, description, price, CategoryId, imageURL }, {where: {
        id: id
      }
      })
      .then(() => res.redirect('/'))
      .catch((err) => res.send(err))
  }
}

module.exports = Controller