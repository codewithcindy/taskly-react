const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  // id: {
  //   type: String,
  //   required: true,
  // },
  text: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    //   // required: true,
  },
});

const PlannedTask = mongoose.model("PlannedTask", taskSchema);
const ProgressTask = mongoose.model("ProgressTask", taskSchema);
const CompletedTask = mongoose.model("CompletedTask", taskSchema);

module.exports = { PlannedTask, ProgressTask, CompletedTask };
