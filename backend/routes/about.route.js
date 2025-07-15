import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinary.js";
import {
  deleteAboutData,
  getAboutData,
  sendAboutData,
  updateAboutData,
} from "../controllers/about.controller.js";

const router = express.Router();
const upload = multer({ storage });

router.get("/about", getAboutData);
router.post("/about", upload.single("image"), sendAboutData);
router.put("/about/:id", upload.single("image"), updateAboutData);
router.delete("/about/:id", deleteAboutData);

export default router;
