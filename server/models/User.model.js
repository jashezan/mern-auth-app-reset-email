import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username already exists"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        unique: false,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"],
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    mobile: {
        type: Number,
    },
    address: {
        type: String,
    },
    profile: {
        type: String,
    },
});

export default model.Users || model("User", UserSchema); // export User model to use in server.js
