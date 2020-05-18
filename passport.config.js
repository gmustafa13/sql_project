/** @format */

const localStrategy = require("passport-local").Strategy;
const base64 = require('base-64')

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    console.log("in auth", email, password)
    let user = await getUserByEmail(email);
    if (user == null) {
      return done(null, false, {
        massage: "No user with that email"
      });
    }
    try {
      user = JSON.stringify(user);
      user = JSON.parse(user)
      let decodedPassword = await base64.decode(user.password)
      console.log("decode", decodedPassword, typeof decodedPassword)
      console.log("pas",password,typeof password)
      if (decodedPassword == password) {
        return done(null, user)
      } else {
        return done(null, false, {
          massage: "Invalid password"
        })
      }
    } catch (error) {
      return done(error)
    }
  }
  passport.use(
    new localStrategy({
      usernameField: "email",
    }, authenticateUser)
  );
  passport.serializeUser((user, done) => {
    done(null, user.email)
  })
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })

}
module.exports = initialize