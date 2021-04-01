var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt')

var locationSchema = new Schema({
    token: {
        type: String,
        require: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
})

locationSchema.pre('save', function(next) {

})



module.exports = mongoose.model('Location', locationSchema)