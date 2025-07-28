import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import heroRouter from "./routes/hero.route.js";
import aboutRouter from "./routes/about.route.js";
import contactRouter from "./routes/contact.route.js";
import service1Router from "./routes/service.route.js";
import service2Router from "./routes/serviceDescription.route.js";
import portfolio1Router from "./routes/portfolio.route.js";
import portfolio2Router from "./routes/portfolioDescription.route.js";
import experience1Router from "./routes/experience.route.js";
import experience2Router from "./routes/experienceDescription.route.js";
import contactFormRouter from "./routes/contactForm.route.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const allowedOrigins = [
//   // "http://localhost:5173",
//   "http://localhost:5174",
//   "https://react-portfolio-two-pi.vercel.app",
// ];
app.use(cors());

app.use("/api/herosection", heroRouter);
app.use("/api/aboutsection", aboutRouter);
app.use("/api/contactsection", contactRouter);
app.use("/api/servicesection1", service1Router);
app.use("/api/servicesection2", service2Router);
app.use("/api/portfoliosection1", portfolio1Router);
app.use("/api/portfoliosection2", portfolio2Router);
app.use("/api/experiencesection1", experience1Router);
app.use("/api/experiencesection2", experience2Router);
app.use("/api/contactform", contactFormRouter);

app.listen(PORT, () => {
  connectDb();
  console.log("Server is running at http://localhost:" + PORT);
});
