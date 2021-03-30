var User = require('../models/user')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')
const { token } = require('morgan')

var functions = {
    addNewUser: function (req, res) {
        if((!req.body.name) || (!req.body.password)) {
            res.json({
                success: false,
                msg: 'Please fill all fields'
            })
        } else {
            var newUser = User({
                name: req.body.name,
                password: req.body.password
            });
            newUser.save(function(err, newUser) {
                if (err) {
                    res.json({
                        success: false,
                        msg: 'Failed to save'
                    })
                } else {
                    res.json({
                        success: true,
                        msg: 'Successfully saved'
                    })
                }
            })
        }
    },
    authentication: function (req, res) {
        User.findOne({
            name: req.body.name
        },
        function (err, user) {
            if (err) throw err
            if (!user) {
                res.status(403).send({
                    success: false,
                    msg: 'User not found'
                })
            } else {
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        var token = jwt.encode(user, config.secret)
                        res.json({
                            success: true,
                            token: token
                        })
                    } else {
                        return res.status(403).send({
                            success: false,
                            msg: 'Wrong Password'
                        })
                    }

                })
            }
        })
    },
    getstatus: function (req, res) {
        if (req.headers.auths && req.headers.auths.split(' ')[0] === 'Header') {
            var token = req.headers.auths.split(' ')[1]
            var decodedtoken = jwt.decode(token, config.secret)
            return res.json({
                success: true,
                msg: 'green'
            })
        } else{
            return res.json({
                success: false,
                msg: 'No Header'
            })
        }
    },

    locationUpdate: function (req, res) {
        //GeoJSON
        var GeoSchema = newSchema ({
            type: {
                type: String,
                default: "Point"
            },
            coordinates: {
                type: [Number],
                index: "2dsphere"
            }
        })

        if ((req.body.latitude == null) && (req.body.longitude == null)) {
            return res.json({
                success: false,
                msg: 'Location Update Error'
            })
        }else{
            var lat = req.body.latitude,
            var lon = req.body.longitude,

            var newLocation = Location({
                token = this.token,
                geometry = GeoSchema(
                    coordinates = [lat, lon]
                )

            });
            newLocation.save(function(err, newLocation) {
                if (err) {
                    res.json({
                        success: false,
                        msg: 'Failed to save'
                    })
                } else {
                    res.json({
                        success: true,
                        msg: 'Successfully saved'
                    })
                }
            })
        }
    }
}

module.exports = functionss