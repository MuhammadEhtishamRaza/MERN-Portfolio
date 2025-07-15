import mongoose from "mongoose";

const experienceDescriptionSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ExperienceDescription = mongoose.model(
  "ExperienceDescription",
  experienceDescriptionSchema
);

export default ExperienceDescription;
