import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinary.js";
import {
  deleteServiceDescription,
  getServiceDescription,
  sendServiceDescription,
  updateServiceDescription,
} from "../controllers/serviceDescription.controller.js";

const router = express.Router();
const upload = multer({ storage });

router.get("/description", getServiceDescription);
router.post("/description", upload.none(), sendServiceDescription);
router.put("/description/:id", upload.none(), updateServiceDescription);
router.delete("/description/:id", deleteServiceDescription);

export default router;
