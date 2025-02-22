const express = require("express");
const mongoose = require("mongoose");
const Case = require("./schema/case");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");


dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.log("Error connecting to MongoDB", err);
});

const app = express();

app.use(cors());
app.use(bodyParser.json());


const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    console.log("Hello World");
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post("/tracking", async (req, res) => {
  const  caseId  = req.body.id.trim();
  console.log(req.body);
  console.log(caseId);
  try {
    const caseTrack = await Case.findOne({caseId: caseId});
    console.log(caseTrack);
    res.json({message: caseTrack.caseStatus});
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/register", async (req, res) => {
  const { caseDescription, caseDate, caseTime, caseLocation, caseImpact, caseRisk, caseNotify, caseAnonymous, email } = req.body;
  console.log(req.body);
  try {
    const caseId = `${Math.floor(1000 + Math.random() * 9000)}`; // Generates CA-XXXX where X is a number
    const caseStatus = "Pending";
    const newCase = new Case({ caseId, caseDescription, caseDate, caseTime, caseLocation, caseImpact, caseRisk, caseNotify, caseAnonymous, caseStatus, email });
    await newCase.save();
    res.json(newCase);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
