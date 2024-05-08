import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: "string",
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: "string",
      min: 2,
      max: 50,
    },
    email: {
      type: "string",
      require: true,
      max: 50,
      unique: true,
    },
    password: {
      type: "string",
      require: true,
      min: 5,
    },
    picturePath: {
      type: "string",
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    socials: {
      twitter: String,
      linkedin: String,
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

const User= mongoose.model("User",UserSchema);

export default User 