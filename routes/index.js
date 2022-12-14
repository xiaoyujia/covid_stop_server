const express = require('express')
const actions = require('../methods/actions')
const router = express.Router()




router.get('/', (req, res) => {
    res.send('COVID STOP Server App')
})

//add new user
router.post('/addnew', actions.addNewUser)

//user auhentication
router.post('/auth', actions.authentication)

//get health status on a user
router.post('/getstatus', actions.getstatus)

//user location update
router.post('/locationupdate', actions.locationUpdate)

//create qr code
router.post('/qrcode', actions.qrcode)

//get status from qrcode
router.get('/getqr', actions.getqr)


module.exports = router