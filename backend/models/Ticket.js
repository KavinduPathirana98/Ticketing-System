const mongoose = require("mongoose");
const internal = require("stream");

const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  ListCode: {
    type: String,
    required: true,
  },
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Class: {
    type: String,
    required: true,
  },
  TicketIssued: {
    type: Boolean,
    required: true,
    default: false,
  },
  User: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    required: false,
  },
  Attended: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Ticket = mongoose.model("Ticket", TicketSchema);

module.exports = Ticket;
