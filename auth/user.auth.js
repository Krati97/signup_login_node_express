import bcrypt from "bcrypt";

// Hash the user password before saving to the database
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};
  
//compare password
export const comparePassword = async (password, userPassword) => {
  const isMatch = await bcrypt.compare(password, userPassword);
  return isMatch;
};

