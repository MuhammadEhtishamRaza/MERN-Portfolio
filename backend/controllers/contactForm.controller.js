import ContactForm from "../models/contactForm.model.js";
import nodemailer from "nodemailer";

export const getContactForm = async (req, res) => {
  try {
    const data = await ContactForm.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in getContactForm controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      res.status(400).json({ error: "No contact form data provided" });
    }
    const newContactForm = new ContactForm({
      name,
      email,
      message,
    });
    await newContactForm.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Contact Form Submission from ${name}`,
      text: message,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ data: newContactForm, message: "Message Received" });
  } catch (error) {
    console.error("Error in sendContactForm controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteContactForm = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await ContactForm.findByIdAndDelete(id);
    if (!deletedData) {
      return res.status(400).json({ error: "No User found" });
    }
    res
      .status(200)
      .json({ message: "User Contact Form Data deleted successfully" });
  } catch (error) {}
};
