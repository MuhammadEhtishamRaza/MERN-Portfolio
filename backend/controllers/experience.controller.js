import Experience from "../models/experience.model.js";

export const getExperienceData = async (req, res) => {
  try {
    const data = await Experience.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in getExperienceData controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendExperienceData = async (req, res) => {
  try {
    const { duration, position, company, description } = req.body;
    if (!duration || !position || !company || !description) {
      res.status(400).json({ error: "All fields are required" });
    }
    const newExperience = new Experience({
      duration,
      position,
      company,
      description,
    });

    await newExperience.save();
    res.status(200).json(newExperience);
  } catch (error) {
    console.error("Error in sendExperienceData controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateExperienceData = async (req, res) => {
  try {
    const updatedFields = {};
    const { id } = req.params;
    if (req.body.duration) updatedFields.duration = req.body.duration;
    if (req.body.company) updatedFields.company = req.body.company;
    if (req.body.position) updatedFields.position = req.body.position;
    if (req.body.description) updatedFields.description = req.body.description;

    if (Object.keys(updatedFields).length === 0) {
      res.status(400).json({ error: "No data provided to update experience" });
    }

    const updateData = await Experience.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    res.status(200).json({
      update: updatedFields,
      data: updateData,
      message: "Experience Data is updated.",
    });
  } catch (error) {
    console.error("Error in updateExperienceData controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteExperienceData = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await Experience.findByIdAndDelete(id);
    if (!deletedData) {
      return res.status(400).json({ error: "No data found" });
    }
    res.status(200).json({ message: "Experience data deleted successfully" });
  } catch (error) {
    console.error("Error in deleteExperienceData controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
