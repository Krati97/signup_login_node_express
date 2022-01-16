import express from "express";

const router = express.Router();

import { loginUser } from "../controller/login.controller.js";
import { userRegistration } from "../controller/register.controller.js";

// User login end points
router.post("/login", loginUser);

// User register end points
router.post("/register", userRegistration);

export default router;

