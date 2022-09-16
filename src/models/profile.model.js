const mongoose = require('mongoose')

const {Schema, model} = mongoose ;// import Schema & model

// Profile Schema
const ProfileSchema = new Schema({
    id: {
        type: String,
        required: [true, 'ID is important'],
        unique:true,
        trim:true
    },
    firstName: {
        type: String,
        required: [true, 'A user must have a name'],
        maxlength: [30, 'firstname must be less than or equal to 30 characters.'], 
        trim:true
    },
    lastName: {
        type: String,
        required: [true, 'lastname is required'],
        maxlength: [30, 'lastname must be less than or equal to 30 characters.'], 
        trim:true
    },

},
{
    timestamps:{
        createdAt: 'dateCreated',
        updatedAt:false
    }
})

// Profile model
const profileModel = model("Profile", ProfileSchema)

module.exports = profileModel