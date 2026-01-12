
import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, unique: true, sparse: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  bio: { type: String, default: "" },
  isPro: { type: Boolean, default: false },
  subscriptionDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

const User = models.User || model("User", UserSchema);
export default User;
