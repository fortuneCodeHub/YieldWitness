import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    passwordClue: {
        type: String,
        required: true,
        trim: true,
    },
    access: {
        type: String,
        trim: true,
        enum: ["user", "admin"],
        default: "user",
    },
    avatar: {
        type: String,
        trim: true,
        required: true,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt properties to the schema
})

const User = models.User || model('User', UserSchema);

export default User;