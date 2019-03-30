var localStrategy = require('passport-local').Strategy;
const UsersDB = require('./DB/usersDB');


module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user)
    })
    passport.deserializeUser(function (user, done) {
        done(null, user)
    })

    passport.use(new localStrategy(function (username, password, done) {
        UsersDB.findOne({
            username: username
        }, function (err, doc) {
            if (err) {
                done(err)
            } else {
                if (doc) {
                    var valid = doc.comparePassword(password, doc.password)
                    if (valid) {

                        // do not add password hash to session
                        done(null, {
                            username: doc.username,
                            id: doc._id
                        })
                    } else {
                        c
                        done(null, false)
                    }
                } else {
                    done(null, false)
                }
            }
        })
    }))
}