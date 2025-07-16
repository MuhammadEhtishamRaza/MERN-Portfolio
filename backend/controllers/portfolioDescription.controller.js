import PortfolioDescription from "../models/portfolioDescription.model.js";

export const getPortfolioDescription = async (req, res) => {
  try {
    const data = await PortfolioDescription.find();
    res.status(200).json(data);
  } catch (error) {
    console.error(
      "Error in getPortfolioDescription controller: ",
      error.message
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendPortfolioDescription = async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newPortfolioDescription = new PortfolioDescription({
      description,
    });
    await newPortfolioDescription.save();
    res.status(200).json(newPortfolioDescription);
  } catch (error) {
    console.error(
      "Error in sendPortfolioDescription controller: ",
      error.message
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updatePortfolioDescription = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    if (!description) {
      res.status(400).json({ error: "No data provided to update" });
    }
    const updateData = await PortfolioDescription.findByIdAndUpdate(
      id,
      { description },
      { new: true }
    );
    res.status(200).json({
      update: description,
      data: updateData,
      message: "Portfolio Description data updated successfully",
    });
  } catch (error) {
    console.error(
      "Error in updatePortfolioDescription controller: ",
      error.message
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deletePortfolioDescription = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteData = await PortfolioDescription.findByIdAndDelete(id);
    if (!deleteData) {
      res.status(400).json({ error: "No data found" });
    }
    res
      .status(200)
      .json({ message: "Portfolio Description data deleted successfully" });
  } catch (error) {
    console.error(
      "Error in deletePortfolioDescription controller: ",
      error.message
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};
