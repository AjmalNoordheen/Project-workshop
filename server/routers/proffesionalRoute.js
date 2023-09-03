const express        = require('express')
const prorouter      = express.Router()
const auth           = require('../middleWare/auth')
const proController  = require('../controller/proffesioanalController')
const multer         = require('../config/multer')
const upload         = multer.createMulter()
const chatController = require('../controller/chatController')
const bookingController = require('../controller/bookingController')
prorouter.post('/proffesionalsignUp',proController.ProffesionalSignup)
prorouter.post('/proffesionalLogin',proController.proffesionalLogin)
prorouter.post('/progoogleMail',proController.googleMailDetails)
prorouter.post('/proOtp',proController.otpCheckMobile)
prorouter.get('/checkPro',auth.verifyProToken,proController.checkProffesional)
prorouter.post('/updateProDetails',auth.verifyProToken,upload.single('file'),proController.updatePro)
prorouter.get('/getWorkShop',auth.verifyProToken,proController.listWorkShop)
prorouter.get('/getFreelancer',proController.listFreelancer)
prorouter.get('/proMapDetails',proController.proMapDetails)
prorouter.get('/listChat',chatController.listChat)
prorouter.get('/loadProChat',chatController.listChatProf)
prorouter.post('/addProMessage',chatController.addMessage)
prorouter.get('/listAllBooking',bookingController.listAllBooking) 
prorouter.get('/proBookings',bookingController.proBookings) 
prorouter.get('/proProfile',auth.verifyProToken,proController.proProfile) 
prorouter.patch('/updateEditPro',upload.single('file'),proController.updateEditPro) 
prorouter.get('/getProBookings',auth.verifyProToken,proController.proBookings) 
prorouter.patch('/updateBookingStatus',auth.verifyProToken,proController.updateBookingStatus) 

module.exports=prorouter