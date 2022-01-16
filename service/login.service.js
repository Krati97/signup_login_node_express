import User from "../models/userModel.js";

export const findUser = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (err) {
    console.log(err);
  }
};
