import mongoose from "mongoose";

// Create user schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 8,
        required: true,
    },
    age: {
        type: Number
    },
    address: {
        type: String
    }
});

const User = mongoose.model("users", UserSchema);

export default User;
