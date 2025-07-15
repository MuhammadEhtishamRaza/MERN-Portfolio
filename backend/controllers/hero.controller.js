import Hero from "../models/hero.model.js";

export const getHeroData = async (req, res) => {
  try {
    const data = await Hero.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in getHeroData controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendHeroData = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file?.path;
    if (!title || !description || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newHero = new Hero({
      title,
      description,
      image,
    });

    await newHero.save();
    res.status(201).json(newHero);
  } catch (error) {
    console.error("Error in sendHeroData controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const changeHeroData = async (req, res) => {
  try {
    const updatedFields = {};
    const { id } = req.params;

    if (req.body.title) updatedFields.title = req.body.title;
    if (req.body.description) updatedFields.description = req.body.description;
    if (req.file) updatedFields.image = req.file?.path;

    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ error: "No data provided to change." });
    }

    const updatedHero = await Hero.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    res.status(200).json({
      update: updatedFields,
      data: updatedHero,
      message: "Hero Updated Successfully",
    });
  } catch (error) {
    console.error("Error in changeHeroData controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteHeroData = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHero = await Hero.findByIdAndDelete(id);
    if (!deletedHero) {
      res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Hero section data deleted successfully" });
  } catch (error) {
    console.error("Error in deleteHeroData controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
