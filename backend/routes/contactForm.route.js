import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinary.js";
import {
  deleteContactForm,
  getContactForm,
  sendContactForm,
} from "../controllers/contactForm.controller.js";

const router = express.Router();
const upload = multer({ storage });

router.get("/form", getContactForm);
router.post("/form", upload.none(), sendContactForm);
router.delete("/form/:id", deleteContactForm);

export default router;
