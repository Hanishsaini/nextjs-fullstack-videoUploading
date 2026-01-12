import mongoose, { Schema, model, models } from "mongoose";

const LikeSchema = new Schema({
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Like = models.Like || model("Like", LikeSchema);
export default Like;
