// user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String },                      // optional
    email: { type: String, required: true },     // required
    password: { type: String, required: true },  // required
    mobile: { type: String },                    // optional
    address: { type: String }                    // optional
});

module.exports = mongoose.model('User', userSchema);