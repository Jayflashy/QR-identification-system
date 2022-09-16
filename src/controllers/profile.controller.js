const mongoose = require("mongoose");
const crypto = require("crypto");
const profileModel = require('../models/profile.model')
// fetch all profiles from database
const getProfiles = async (req, res) => {
    const profiles = await profileModel.find({}).select("-__v").select("-_id")
    .then((result) => {
        console.log("All profiles fetched")
        res.status(201).json({status: "success", message:"All profiles fetched", data: result})
        // res.send(result)
    })
    .catch((err) => {
        console.log("fetching profile error", err)
        res.status(401).send("something is wrong")
    })
     // if (!profiles) {
    //     console.log("Something went wrong")
    //     res.status(401).send("Something went wrong")
    // } else {
    //     
    // }
}

// create new profile
const createProfile = async (req, res) => {
    res.send('index')
}

// delete profile
const deleteProfile = async (req, res) => {
   // get id and delete from database
   let id = req.params.id
//    check if a profile with given id exist on the database
   const checkProfile = await profileModel.findOne({id})
   if(!checkProfile){
       console.log("profile not found")
       return res.status(404).json({status:"error", message:"profile with selected id does not exist"})
   }
   // delete profile
   checkProfile.delete()
   console.log("profile deleted")
   return res.status(201).json({status:"success", message:"profile deleted successfully"})
}

// search profile
const searchProfile = async (req, res) => {
    res.send('index')
}

//sort profile
const sortProfile = async (req, res) => {
    res.send('index')
}

// verify profile
const verifyProfile = async (req, res) => {
    res.send('index')
}
module.exports = { getProfiles,createProfile, deleteProfile, searchProfile, sortProfile, verifyProfile}