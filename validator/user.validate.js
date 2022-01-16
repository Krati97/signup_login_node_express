import User from "../models/userModel.js";

let message = "";
export const errorMessage = () => message;

function passwordValidation(password){
    const passwordCriteria = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&^*])(?=.{8,})/;

    // Test criteria
    let isValidPassword = passwordCriteria.test(password);

    return isValidPassword ? true : false;
};

export const loginValidation = (info) => {
    const {email, password} = info;

    //Missing fields verification
    if(!email && !password){
        message = "Missing required fields! Please try again."
        return false;
    }
    return true;
}

export const formValidation = async (formInfo) => {
    const { name, email, password, confirmPassword } = formInfo;

    // Check if there is any missing field
    if (!name || !email || !password || !confirmPassword) {
        message = "All fields are required.";
        return false;
    }

    // Check if email is already registered
    const isRegisteredEmailId = await User.findOne({ email: email });
    if (isRegisteredEmailId) {
        message = "This emal is already in use!";
        return false;
    }

    // Check if password meets criteria
    const isPasswordValid = passwordValidation(password);
    if (isPasswordValid) {
        // Check if the passwords match
        if (password !== confirmPassword) {
            message = "Passwords don't match.";

            return false;
        }
    } else {
        message = "Invalid Password! Password ctiteria: 1 uppercase, 1 lowercase, 1 digit, 1 special char, min 8 characters.";
        return false;
    }
    return true;
};