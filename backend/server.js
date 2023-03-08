const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8082;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  // useCreateindex:true,
  // useNewUrlParser:true,
  // userUnifiedTopologyL:true,
  // useFindAndModify :false
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb Connection success!");
});

const TicketRouter = require("./routes/Ticket.js");

app.use("/ticket", TicketRouter);

app.listen(PORT, () => {
  console.group(`Server is up and running on port number: ${PORT}`);
});
