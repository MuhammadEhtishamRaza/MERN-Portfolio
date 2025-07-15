import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinary.js";
import {
  changeHeroData,
  deleteHeroData,
  getHeroData,
  sendHeroData,
} from "../controllers/hero.controller.js";

const router = express.Router();
const upload = multer({ storage });

router.get("/hero", getHeroData);
router.post("/hero", upload.single("image"), sendHeroData);
router.put("/hero/:id", upload.single("image"), changeHeroData);
router.delete("/hero/:id", deleteHeroData);

export default router;
