import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinary.js";
import {
  deletePortfolioDescription,
  getPortfolioDescription,
  sendPortfolioDescription,
  updatePortfolioDescription,
} from "../controllers/portfolioDescription.controller.js";

const router = express.Router();
const upload = multer({ storage });

router.get("/description", getPortfolioDescription);
router.post("/description", upload.none(), sendPortfolioDescription);
router.put("/description/:id", upload.none(), updatePortfolioDescription);
router.delete("/description/:id", deletePortfolioDescription);

export default router;
