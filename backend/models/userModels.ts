import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String },
  image: { type: String },
  coverImage: { type: String },
  about: { type: String },
});

const Users = mongoose.model("user", userSchema);

export default Users;
