const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth");

async function login({ username, password }, callback) {
  const user = await User.findOne({ username });
  if (user != null) {
    if (user.password === password) {
      const token = auth.generateAccessToken(username);
      return callback(null, { ...user.toJSON(), token });
    } else {
      return callback({
        message: "Invalid Username/Password!",
      });
    }
  } else {
    return callback({
      message: "Invalid Username/Password!",
    });
  }
}

async function register(params, callback) {
  if (params.username === undefined) {
    return callback({ message: "Username Required" });
  }

  const user = new User(params);
  user
    .save()
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

async function getUser(callback){
    const users = await User.find();
    console.log("listUSer", users);
    if(users != null){
        return callback(users);
    }
}

module.exports = {
  login,
  register,
  getUser
};
