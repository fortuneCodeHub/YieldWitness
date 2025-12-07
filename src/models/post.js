import mongoose, { model, models, Schema } from "mongoose";
import slugify from "slugify";

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

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    excerpt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 250,
    },

    category: {
      type: String,
      enum: ["finance", "tech", "insurance", "art-design"],
      required: true,
    },

    thumbnail: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      required: true,
      trim: true,
    },

    readTime: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: Schema.Types.Mixed,
      required: false,
    },

    keywords: {
      type: [String],
      default: [],
      trim: true,
    },

    built: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//
// 🪄 Pre-save middleware: automatically generate slug from title
//
PostSchema.pre("validate", async function (next) {
  if (this.title && (!this.slug || this.isModified("title"))) {
    let baseSlug = slugify(this.title, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    while (await mongoose.models.Post.findOne({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }

    this.slug = slug;
  }
  next();
});


const Post = models.Post || model("Post", PostSchema);

export default Post;
