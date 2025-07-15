import ExperienceDescription from "../models/experienceDescription.model.js";

export const getExperienceDescription = async (req, res) => {
  try {
    const data = await ExperienceDescription.find();
    res.status(200).json(data);
  } catch (error) {
    console.error(
      "Error in getExperienceDescription controller: ",
      error.message
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendExperienceDescription = async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newExperienceDescription = new ExperienceDescription({
      description,
    });
    await newExperienceDescription.save();
    res.status(200).json(newExperienceDescription);
  } catch (error) {
    console.error(
      "Error in sendExperienceDescription controller: ",
      error.message
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateExperienceDescription = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    if (!description) {
      res.status(400).json({ error: "No data provided to update" });
    }
    const updateData = await ExperienceDescription.findByIdAndUpdate(
      id,
      description,
      { new: true }
    );
    res.status(200).json({
      update: description,
      data: updateData,
      message: "Experience Description data updated successfully",
    });
  } catch (error) {
    console.error(
      "Error in updateExperienceDescription controller: ",
      error.message
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteExperienceDescription = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteData = await ExperienceDescription.findByIdAndDelete(id);
    if (!deleteData) {
      res.status(400).json({ error: "No data found" });
    }
    res
      .status(200)
      .json({ message: "Experience Description data deleted successfully" });
  } catch (error) {
    console.error(
      "Error in deleteExperienceDescription controller: ",
      error.message
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};
