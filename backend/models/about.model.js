import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    description1: {
      type: String,
      required: true,
    },
    description2: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const About = mongoose.model("About", aboutSchema);

export default About;
