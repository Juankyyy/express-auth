import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 200,
    },
    images: {
      type: [String],
      default: [],
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: [],
      },
    ],
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Post = mongoose.model("Post", postSchema);
