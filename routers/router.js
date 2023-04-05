const router = require('express').Router()
const Controller = require('../controllers')
const userController = require('../controllers/userController')


router.get('/')
router.get('/login', Controller.homeLogin)
router.post(`/login`, Controller.validateLogin)
router.get('/signup', userController.signUpForm)
router.post('/signup', userController.postSignUp)
router.get('/profile', userController.profile)
router.post('/profile', userController.addProfile)

module.exports = router