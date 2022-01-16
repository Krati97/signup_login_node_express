import jwt from "jsonwebtoken";
import { findUser } from "../service/login.service.js";
import { errorMessage, formValidation } from "../validator/user.validate.js";
import { comparePassword } from "../auth/user.auth.js";

//User Login
export const loginUser = async (req, res) => {
  const userInfo = req.body;
  try {
    if (formValidation(userInfo)) {
      const { email, password } = userInfo;
      //Check for existing user
      const user = await findUser(email);

      //If no user is present
      if (!user) {
        return res.status(404).json({
          message:
            "There is no account with this id! Please create an account first.",
        });
      }

      //Check for valid user password
      comparePassword(password, user.password)
        .then((response) => {
          //Correct password
          if (response) {
            //Login user
            const token = jwt.sign(
              {
                _id: user._id,
                name: user.name,
              },
              process.env.JWT_SECRET_KEY
            );

            res.status(200).json({
              token,
              message: `Welcome ${user.name}!`,
            });
          } else {
            res.status(401).json({
              message: "Invalid credentials!",
            });
          }
        })
        .catch((error) => {
          res.status(500).json({
            message: error.message,
          });
        });
    } else {
      res.status(400).json({ message: errorMessage() });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
