import Contact from "../models/contact.model.js";

export const getContactData = async (req, res) => {
  try {
    const data = await Contact.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in getContactData controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendContactData = async (req, res) => {
  try {
    const { address, phone, email, github } = req.body;
    if (!address || !phone || !email || !github) {
      res.status(400).json({ error: "All fields are required" });
    }
    const newContact = new Contact({
      address,
      phone,
      email,
      github,
    });

    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    console.error("Error in sendContactData controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateContactData = async (req, res) => {
  try {
    const updatedFields = {};
    const { id } = req.params;
    if (req.body.address) updatedFields.address = req.body.address;
    if (req.body.phone) updatedFields.phone = req.body.phone;
    if (req.body.email) updatedFields.email = req.body.email;
    if (req.body.github) updatedFields.github = req.body.github;

    if (Object.keys(updatedFields).length === 0) {
      res.status(400).json({ error: "No data is provided" });
    }

    const updatedData = await Contact.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    res.status(200).json({
      update: updatedFields,
      data: updatedData,
      message: "Contact Updated Successfully",
    });
  } catch (error) {
    console.error("Error in updateContactData controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteContactData = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await Contact.findByIdAndDelete(id);
    if (!deletedData) {
      res.status(400).json({ error: "No data Found" });
    }
    res.status(200).json({ message: "Contact data deleted successfully" });
  } catch (error) {
    console.error("Error in deleteContactData: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
