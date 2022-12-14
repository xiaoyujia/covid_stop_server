var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt')

var locationSchema = new Schema({
    token: {
        type: String,
        require: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },/*
    year: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    hour: {
        type: String,
        required: true
    },
    minute: {
        type: String,
        required: true
    },
    second: {
        type: String,
        required: true
    },*/
    time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    secret: {
        type: String,
        required: true
    }
})

locationSchema.pre('save', function(next) {
    var location = this;
    
    if(this.isModified('time') || this.isNew) {
    //if(this.isModified('time') || this.isNew) {

        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err)
            }
            bcrypt.hash(location.secret, salt, function(err,hash) {
                if (err) {
                    return next(err)
                }
                location.secret = hash;
                next()
            })
        })
    } else {
        return next()
    }
})



module.exports = mongoose.model('Location', locationSchema)