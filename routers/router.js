const router = require('express').Router()
const Controller = require('../controllers')
const userController = require('../controllers/userController')



router.get('/login', Controller.homeLogin)
router.post(`/login`, Controller.validateLogin)
router.get('/signup', userController.signUpForm)
router.post('/signup', userController.postSignUp)
router.get('/profile', userController.profile)
router.post('/profile', userController.addProfile)
router.get('/logout', userController.logOut)

router.use((req, res, next) => {
  if(!req.session.UserId){
    const error = `please you must be login dont be crazy as fuck`
    return res.redirect(`/login?error=${error}`)
  }
  next()
})

router.get('/', Controller.homeProduct)
router.get('/add/product', Controller.addProduct)
router.post('/add/product', Controller.createProduct)
router.get('/product/:productId')

module.exports = router