import mongoose from "mongoose";

const portfolioDescriptionSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const PortfolioDescription = mongoose.model(
  "PortfolioDescription",
  portfolioDescriptionSchema
);

export default PortfolioDescription;
