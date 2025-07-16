import Portfolio from "../models/portfolio.model.js";

export const getPortfolioData = async (req, res) => {
  try {
    const data = await Portfolio.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in getPortfolioData controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendPortfolioData = async (req, res) => {
  try {
    const image = req.file?.path;
    if (!image) {
      res.status(400).json({ error: "All fields are required." });
    }
    const newPortfolio = new Portfolio({
      image,
    });

    await newPortfolio.save();
    res.status(201).json(newPortfolio);
  } catch (error) {
    console.error("Error in sendPortfolioData controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updatePortfolioData = async (req, res) => {
  try {
    const { id } = req.params;
    const image = req.file?.path;
    if (!image) {
      return res.status(400).join({ error: "All fields are required" });
    }

    const updateData = await Portfolio.findByIdAndUpdate(id, image, {
      new: true,
    });

    res.status(200).json({
      updata: image,
      data: updateData,
      message: "Portfolio data updated successfully",
    });
  } catch (error) {
    console.error("Error in updatePortfolioData controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deletePortfolioData = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteData = await Portfolio.findByIdAndDelete(id);
    if (!deleteData) {
      return res.status(400).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Portfolio data deleted successfully" });
  } catch (error) {
    console.error("Error in deletePortfolio Controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
