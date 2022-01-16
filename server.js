import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config.js";

import router  from "./routes/userRoutes.js"

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const URI = process.env.MONGODB_URI;
mongoose.connect(
  URI,
  {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB!!!");
  }
);

//User Routes
app.use("/user", router);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Sever running on port: ${PORT}`));
