import mongoose from "mongoose";
import validator from 'validator';

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
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        minlength: 8,
        required: true,
        validate(value){
            //to check if password entered by user = "password"
            if(value.toLowerCase().includes('password')){ 
                throw new Error('Password cannot contain password')
            }
        }
    },
    age: {
        type: Number,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    address: {
        type: String
    }
});

const User = mongoose.model("users", UserSchema);

export default User;
