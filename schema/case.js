const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema({
  caseId: {
    type: String,
    required: true,
  },
  caseDescription: {
    type: String,
    required: true,
  },
  caseDate: {
    type: String,
    required: true,
  },
  caseTime: {
    type: String,
    required: true,
  },
  caseLocation: {
    type: String,
    required: true,
  },
  caseImpact: {
    type: String,
    required: true,
  },
  caseRisk: {
    type: String,
    required: true,
  },
  caseNotify:{
    type: String,
  },
  caseAnonymous:{
    type: String,
  },
  caseStatus:{
    type: String,
  },
  email:{
    type: String,
  },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Case", caseSchema);
