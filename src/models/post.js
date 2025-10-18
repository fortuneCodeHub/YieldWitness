import mongoose, { model, models, Schema } from "mongoose";

const PostSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    excerpt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 250, // optional: keeps excerpt short
    },

    category: {
      type: String,
      enum: ["finance", "tech", "markets", "analysis", "guides", "investment", "law"],
      required: true,
    },

    thumbnail: {
      type: String, // URL or path to image
      required: true,
    },

    author: {
      type: String,
      required: true,
      trim: true,
    },

    readTime: {
      type: String, // in minutes
      required: true,
      trim: true,
    },

    content: {
      type: Schema.Types.Mixed, // can hold JSON objects
      required: false,
    },

    keywords: {
      type: [String],
      default: [],
      trim: true,
    },

    built: {
      type: Boolean,
      default: false, // false until Elementor-like builder publishes
    },
  },
  {
    timestamps: true, // ✅ adds createdAt & updatedAt
  }
);

const Post = models.Post || model("Post", PostSchema);

export default Post;
