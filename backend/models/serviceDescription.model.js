import mongoose from "mongoose";

const serviceDescriptionSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ServiceDescription = mongoose.model(
  "ServiceDescription",
  serviceDescriptionSchema
);

export default ServiceDescription;
