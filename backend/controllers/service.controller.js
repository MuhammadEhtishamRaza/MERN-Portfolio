import Service from "../models/service.model.js";

export const getServiceData = async (req, res) => {
  try {
    const service = await Service.find();
    res.status(200).json({ service });
  } catch (error) {
    console.log("Error in getServiceData controller: ", error.messsage);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendServiceData = async (req, res) => {
  try {
    // console.log("req.body:", req.body);
    // console.log("req.file:", req.file);
    const { title, description } = req.body;
    const image = req.file?.path;
    // console.log("title: ", title);
    // console.log("description: ", description);

    if (!title || !image || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newService = new Service({
      title,
      image,
      description,
    });

    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    console.error("Error in sendServiceData controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateServiceData = async (req, res) => {
  try {
    const updatedFields = {};
    const { id } = req.params;
    if (req.body.title) updatedFields.title = req.body.title;
    if (req.body.description) updatedFields.description = req.body.description;
    if (req.file) updatedFields.image = req.file?.path;

    if (Object.keys(updatedFields).length === 0) {
      res.status(400).json({ error: "No data provided to update" });
    }

    const updateData = await Service.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    res.status(200).json({
      update: updatedFields,
      data: updateData,
      message: "Service data updated Successfully",
    });
  } catch (error) {
    console.error("Error in updateServiceData controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteServiceData = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteData = await Service.findByIdAndDelete(id);
    if (!deleteData) {
      res.status(400).json({ error: "No data found" });
    }
    res.status(200).json({ message: "Service data deleted successfully" });
  } catch (error) {
    console.error("Error in deleteServiceData controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
