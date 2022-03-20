const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { PlannedTask, ProgressTask, CompletedTask } = require("./models/task");

const port = process.env.PORT || 3000;

// Mongoose
mongoose
  .connect("mongodb://localhost:27017/tasklyDB")
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log("Error connecting to database", e));

// Serve files for React app
app.use(express.static(path.resolve(__dirname, "client/build")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// app.get("/", (req, res) => {
//   res.send("server good");
// });

// Retrieve list of planned tasks
app.get("/plannedTasks/index", async (req, res) => {
  const result = await PlannedTask.find()
    .then((res) => res)
    .catch((e) => console.log(e));

  res.json(result);
});

// Retrieve list of progress tasks
app.get("/progressTasks/index", async (req, res) => {
  const result = await ProgressTask.find()
    .then((res) => res)
    .catch((e) => console.log(e));

  res.json(result);
});

// Retrieve list of progress tasks
app.get("/completedTasks/index", async (req, res) => {
  const result = await CompletedTask.find()
    .then((res) => res)
    .catch((e) => console.log(e));

  res.json(result);
});

// Create new task instance/document
app.post("/plannedTasks/add", async (req, res) => {
  const formData = { ...req.body };
  const newPlannedTask = await new PlannedTask(formData);

  newPlannedTask.save();

  res.json(newPlannedTask);
});

app.post("/progressTasks/add", async (req, res) => {
  const formData = { ...req.body };
  const newProgressTask = await new ProgressTask(formData);

  newProgressTask.save();

  res.json(newProgressTask);
});

app.post("/completedTasks/add", async (req, res) => {
  const formData = { ...req.body };
  const newCompletedTask = await new CompletedTask(formData);

  newCompletedTask.save();

  res.json(newCompletedTask);
});

app.patch("/plannedTasks/:id", async (req, res) => {
  const { text } = req.body;
  const updatedTask = await PlannedTask.findByIdAndUpdate(
    req.params.id,
    {
      text: text,
    },
    { new: true }
  );

  updatedTask.save();

  res.json(updatedTask);
});

app.patch("/progressTasks/:id", async (req, res) => {
  const { text } = req.body;
  const updatedTask = await ProgressTask.findByIdAndUpdate(
    req.params.id,
    {
      text: text,
    },
    { new: true }
  );

  updatedTask.save();

  res.json(updatedTask);
});

app.delete("/plannedTasks/:id", async (req, res) => {
  const { id } = req.params;
  await PlannedTask.findByIdAndDelete(id);
});

app.delete("/progressTasks/:id", async (req, res) => {
  const { id } = req.params;
  await ProgressTask.findByIdAndDelete(id);
});

app.delete("/completedTasks/:id", async (req, res) => {
  const { id } = req.params;
  await CompletedTask.findByIdAndDelete(id);
});

app.delete("/tasks", async (req, res) => {
  await PlannedTask.deleteMany({});
  await ProgressTask.deleteMany({});
  await CompletedTask.deleteMany({});

  res.json();
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
