const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

//creating custom static method
userSchema.statics.signup = async function (email, password) {
  //validation
  const exists = await this.findOne({ email: email });

  if (exists) {
    throw Error("Email already in use");
  }

  //make sure the user inserted both email and password
  if (!email || !password) {
    throw Error("Please fill all fields");
  }

  //validate email
  if (!validator.isEmail(email)) {
    throw Error("email is not valid");
  }

  //validate password
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "make sure to use atleast 8 character, uppercase, one lowercase, a number and a symbol"
    );
  }

  //encrpt pass
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  //create user
  const user = await this.create({ email, password: hash });

  return user;
};

// static custom login method
userSchema.statics.login = async function (email, password) {
  //check that i have both fields
  if (!email || !password) {
    throw Error("Please fill all fields");
  }

  const user = await this.findOne({ email });

  // check that email is correct
  if (!user) {
    throw Error("Incorrect email");
  }

  // check the password
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
