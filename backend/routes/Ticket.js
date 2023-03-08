const router = require("express").Router();
let Ticket = require("../models/Ticket");

router.route("/add").post((req, res) => {
  const ListCode = req.body.ListCode;
  const FirstName = req.body.FirstName;
  const LastName = req.body.LastName;
  const Class = req.body.Class;

  const newTicket = new Ticket({
    ListCode,
    FirstName,
    LastName,
    Class,
  });
  //new item add
  newTicket
    .save()
    .then(() => {
      res.json("New Ticket added");
    })
    .catch((err) => {
      console.log(err);
    });
});
//read
router.route("/get").get((req, res) => {
  Ticket.find()
    .then((Ticket) => {
      res.json(Ticket);
    })
    .catch((err) => {
      console.log(err);
    });
});
//update

router.route("/update/:id").put(async (req, res) => {
  let userID = req.params.id;

  const {
    ListCode,
    FirstName,
    LastName,
    Class,
    User,
    TicketIssued,
    Attended,
    createdAt,
  } = req.body;

  const updateTicket = {
    ListCode,
    FirstName,
    LastName,
    Class,
    User,
    TicketIssued,
    Attended,
    createdAt,
  };
  const update = await Ticket.findByIdAndUpdate(userID, updateTicket)
    .then(() => {
      res.status(200).send({ status: "Ticket Booked" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ Status: "Error with updating data", error: err.message });
    });
});
//delete
router.route("/delete/:id").delete(async (req, res) => {
  let userID = req.params.id;

  await Ticket.findByIdAndDelete(userID)
    .then(() => {
      res.status(200).send({ status: "Ticket deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with deleting data", error: err.message });
    });
});
router.route("/get/:id").get(async (req, res) => {
  let userID = req.params.id;
  const user = await Ticket.find({ user: userID })
    .then((Ticketi) => {
      res.status(200).send({ status: "Ticket fetched", Ticketi });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get Ticket", error: err.message });
    });
});
router.route("/check").post(async (req, res) => {
  // let userID = req.params.id;
  const ListCode = req.body.ListCode;

  const channel = await Ticket.find({
    ListCode: ListCode,
  })
    .then((Ticketi) => {
      res.status(200).send({ status: "Ticket fetched", Ticketi });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get Ticket", error: err.message });
    });
});

module.exports = router;
