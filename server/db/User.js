const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

// Ensure indexes are created
User.on('index', error => {
  if (error) {
    console.error('Indexes could not be created:', error);
  }
});

module.exports = User;
