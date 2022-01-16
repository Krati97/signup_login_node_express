import User from "../models/userModel.js";
import { hashPassword } from "../auth/user.auth.js";
import { errorMessage, formValidation } from "../validator/user.validate.js";

//User registration
export const userRegistration = (req, res) => {
  const user = req.body;
  try {
    formValidation(user)
      .then((response) => {
        if (response) {
          hashPassword(user.password)
            .then(async (hash) => {
              const { name, email, age, address } = user;
              const newUser = new User({
                name,
                email,
                password: hash,
                age,
                address
              });

              //Save user in DB
              const saveUser = await newUser.save();
              res.status(201).json({message: "Hurray! You have registered successfully!"});
            })
            .catch((error) => {
              res.status(500).json({
                message: error.message,
              });
            });
        } else {
          res.status(400).json({
            message: errorMessage(),
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: error.message,
        });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
