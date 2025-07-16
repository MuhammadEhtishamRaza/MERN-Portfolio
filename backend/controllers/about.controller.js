import About from "../models/about.model.js";

export const getAboutData = async (req, res) => {
  try {
    const data = await About.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in getAboutData Controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendAboutData = async (req, res) => {
  try {
    const { description1, description2 } = req.body;
    const image = req.file?.path;

    if (!description1 || !description2 || !image) {
      res.status(400).json({ error: "All fields are required" });
    }

    const newAbout = new About({
      description1,
      description2,
      image,
    });

    await newAbout.save();
    res.status(201).json(newAbout);
  } catch (error) {
    console.error("Error in sendAboutData controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateAboutData = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = {};

    if (req.body.description1)
      updatedFields.description1 = req.body.description1;
    if (req.body.description2)
      updatedFields.description2 = req.body.description2;
    if (req.file) updatedFields.image = req.file?.path;

    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ error: "No data provided to change." });
    }

    const updatedData = await About.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    res.status(200).json({
      update: updatedFields,
      data: updatedData,
      message: "About Updated Successfully",
    });
  } catch (error) {
    console.error("Error in updateAboutData controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteAboutData = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteData = await About.findByIdAndDelete(id);
    if (!deleteData) {
      res.status(400).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error("Error in deleteAboutData controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
