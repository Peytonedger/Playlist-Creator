const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  album: {
    type: String,
    required: false,
  },
  durration: {
    type: String,
    required: false,
  },
  favorite: {
    type: Boolean,
    required: false,
  }
  
})

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  playlist: [songSchema],
})


const User = mongoose.model('User', userSchema);

module.exports = User;