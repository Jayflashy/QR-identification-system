const  express = require('express')
const router = express.Router()
const profileController = require('../controllers/profile.controller')
// get profiles
router.get('/profiles', profileController.getProfiles)
// create profile
router.post('/profile', profileController.createProfile)
// delete profile
router.delete('/profile/:id', profileController.deleteProfile)
// search 
router.get('/search', profileController.searchProfile)
// verify profile
router.post('/profile/verify', profileController.verifyProfile)
// sort profile
router.get('/profile_sort', profileController.sortProfile)

module.exports = router