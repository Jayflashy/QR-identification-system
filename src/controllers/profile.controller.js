const mongoose = require("mongoose");
const crypto = require("crypto");
const profileModel = require('../models/profile.model');
const { validationSchema } = require("../utils/validation");
const {v4 :uuid} = require('uuid');
const { cryptoEncryption } = require("../utils/crypto");
const { QRencrypt } = require("../utils/qrcode");
// fetch all profiles from database
const getProfiles = async (req, res, next) => {
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
const createProfile = async (req, res, next) => {
    try {
        const profile = await validationSchema.validateAsync(req.body);
        // create new profile
        profile.id = uuid();  // create unique id with uuid
        const newProfile = await profileModel.create(profile) 
        // convert profile to string
        const profileString = JSON.stringify(newProfile);
        // encrypt profile data with crypto
        const encryptedData = await cryptoEncryption(profileString);
        // convert data to qrcode
        const encryptedQR = await QRencrypt(profileString);

        console.log("profile created successfull") 
        return res.status(201).json({status: "success", message:"profile created successfully", data: encryptedData, qrcode: encryptedQR})
      } catch (error) {
        if (error.isJoi === true) error.status = 400;
        console.log(error)
        next (error);
    }
    
}

// delete profile
const deleteProfile = async (req, res, next) => {
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
const searchProfile = async (req, res, next) => {
    // gwt search parameters
    const {key, value} = req.query;
    // search from database
    const searchResult = await profileModel.findOne({firstName:value}).select("-__v").select("-_id").exec()
    if(searchResult){
        console.log("profile found")
        res.status(201).json({"status":"success", message:"profile found. Your search results is", "data":searchResult})
    }else{
        res.status(404).json({"status":"error", "message":"profile not found"})
    }
}

//sort profile
const sortProfile = async (req, res, next) => {
    res.send('index')
}

// verify profile
const verifyProfile = async (req, res, next) => {
    res.send('index')
}
module.exports = { getProfiles,createProfile, deleteProfile, searchProfile, sortProfile, verifyProfile}