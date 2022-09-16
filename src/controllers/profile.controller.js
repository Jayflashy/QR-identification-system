const mongoose = require("mongoose");
const crypto = require("crypto");

// fetch all profiles from database
const getProfiles = (req, res) => {
    res.send('index')
}

// create new profile
const createProfile = (req, res) => {
    res.send('index')
}

// delete profile
const deleteProfile = (req, res) => {
    res.send('index')
}

// search profile
const searchProfile = (req, res) => {
    res.send('index')
}

//sort profile
const sortProfile = (req, res) => {
    res.send('index')
}

// verify profile
const verifyProfile = (req, res) => {
    res.send('index')
}
module.exports = { getProfiles,createProfile, deleteProfile, searchProfile, sortProfile, verifyProfile}