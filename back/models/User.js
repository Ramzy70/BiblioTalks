const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  isSuperUser: {
    type: Boolean,
    default: false,
  },
  username: {
    type: String,
    required: true,
    unique: true,
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
  photo: {
    type: String,
    default: 'default.jpg', // You can customize the default photo
  },
});

// Hash the password before saving to the database
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password') || user.isNew) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      next();
    } catch (error) {
      return next(error);
    }
  } else {
    return next();
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = function(candidatePassword, next) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return next(err);
    next(null, isMatch);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;