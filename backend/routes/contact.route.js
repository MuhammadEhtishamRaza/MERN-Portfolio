import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinary.js";
import {
  deleteContactData,
  getContactData,
  sendContactData,
  updateContactData,
} from "../controllers/contact.controller.js";

const router = express.Router();
const upload = multer({ storage });

router.get("/contact", getContactData);
router.post("/contact", upload.none(), sendContactData);
router.put("/contact/:id", upload.none(), updateContactData);
router.delete("/contact/:id", deleteContactData);

export default router;
