const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  discordId: {
    type: mongoose.SchemaTypes.String,
    require: true,
    unique: true,
  },
  discordTag: {
    type: mongoose.SchemaTypes.String,
    require: true,
  },
  avatar: {
    type: mongoose.SchemaTypes.String,
    require: false,
  },
  guilds: {
    type: mongoose.SchemaTypes.Array,
    require: true,
  }
});

module.exports = mongoose.model('User', UserSchema);
