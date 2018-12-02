const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema(
  {
    username: String,
    password: String,
    role: {
      type: String,
      enum: ["user", "launderer"],
      default: "user"
    },
    fee: Number,
    email: String,
    schedule: Array,
  },
  {
    timestamps: true
  }
);


module.exports = mongoose.model("Users", userSchema);