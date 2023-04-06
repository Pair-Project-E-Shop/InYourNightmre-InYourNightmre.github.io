const router = require('express').Router()
const Controller = require('../controllers')
const userController = require('../controllers/userController')
const path = require('path')
const multer = require('multer')
const storage = multer.diskStorage({
  destination:(req, file, cb)=>{
    cb(null, 'Images')
  },
  filename:(req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({storage: storage})


router.get('/login', Controller.homeLogin)
router.post('/login', Controller.validateLogin)
router.get('/signup', userController.signUpForm)
router.post('/signup', userController.postSignUp)
router.get('/profile', userController.profile)
router.post('/profile', userController.addProfile)
router.get('/logout', userController.logOut)
router.get('/profile:', userController.viewProfile)//menampilkan data profile yang sudah di sign up

router.use((req, res, next) => {
  if(!req.session.UserId){
    const error = `please you must be login baby!`
    return res.redirect(`/login?error=${error}`)
  }
  next()
})

router.get('/', Controller.homeProduct)
router.get('/add/product', Controller.addProduct)
router.post('/add/product', upload.single('imageURL') ,Controller.createProduct)
router.get('/product/:productId', Controller.detailProduct)
router.get('/product/:productId/delete', Controller.deleteProduct)
router.get('/product/:productId/edit', Controller.editProduct)
router.post('/product/:productId/edit', Controller.updateProduct)
router.get('/product/:productId/buy', Controller.buy)
module.exports = router