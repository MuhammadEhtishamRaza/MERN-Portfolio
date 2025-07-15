import ServiceDescription from "../models/serviceDescription.model.js";

export const getServiceDescription = async (req, res) => {
  try {
    const data = await ServiceDescription.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in getServiceDescription controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendServiceDescription = async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newServiceDescription = new ServiceDescription({
      description,
    });
    await newServiceDescription.save();
    res.status(200).json(newServiceDescription);
  } catch (error) {
    console.error(
      "Error in sendServiceDescription controller: ",
      error.message
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateServiceDescription = async (req, res) => {
  try {
    // console.log("req.body:", req.body);
    const { id } = req.params;
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ error: "No data provided to update" });
    }
    const updateData = await ServiceDescription.findByIdAndUpdate(
      id,
      description,
      { new: true }
    );
    if (!updateData) {
      return res.status(400).json({ error: "No data found" });
    }
    res.status(200).json({
      update: description,
      data: updateData,
      message: "Service Description data updated successfully",
    });
  } catch (error) {
    console.error(
      "Error in updateServiceDescription controller: ",
      error.message
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteServiceDescription = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteData = await ServiceDescription.findByIdAndDelete(id);
    if (!deleteData) {
      res.status(400).json({ error: "No data found" });
    }
    res
      .status(200)
      .json({ message: "Service Description data deleted successfully" });
  } catch (error) {
    console.error(
      "Error in deleteServiceDescription controller: ",
      error.message
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};
