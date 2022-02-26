import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, required: true },
  coverImage: { type: String, required: true },
  about: { type: String, required: true },
});

const Users = mongoose.model("user", userSchema);

export default Users;
