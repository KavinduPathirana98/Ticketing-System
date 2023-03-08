import { Col, Form, message, Row, Modal } from "antd";

import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import {
  CardBody,
  FormGroup,
  Input,
  Label,
  Table,
  Button,
  CardHeader,
  Card,
} from "reactstrap";
import moment from "moment";

import QRCode from "qrcode";
export default function ReserveTicket() {
  const [qr, setQr] = useState("");
  const [Class, setClass] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [ListCode, setListCode] = useState("");
  const [User, setUser] = useState("");
  const [TicketId, setTicketId] = useState();
  const [Availabitity, setAvailablity] = useState(true);
  const [Booked, setBooked] = useState(false);
  const [GenerateStatus, setGenerateStatus] = useState(true);
  //Validation
  const [ListCodeValidation, setListCodeValidation] = useState("");
  const [UserValidation, setUserValidation] = useState("");
  const getUser = () => {
    setListCodeValidation("");
    setUserValidation("");
    if (ListCode == "") {
      setListCodeValidation("Please Enter Code !!");
    } else if (User == "") {
      setUserValidation("Please Select User !!");
    } else {
      axios
        .post("http://localhost:8082/ticket/check", { ListCode: ListCode })
        .then((response) => {
          if (response.data.Ticketi.length == 1) {
            setGenerateStatus(false);
            setAvailablity(true);
            console.log("Response", response.data.Ticketi);
            setFirstName(response.data.Ticketi[0].FirstName);
            setLastName(response.data.Ticketi[0].LastName);
            setClass(response.data.Ticketi[0].Class);
            setTicketId(response.data.Ticketi[0]._id);
            if (response.data.Ticketi[0].TicketIssued == false) {
              setBooked(false);
              GenerateQRCode(
                ListCode,
                response.data.Ticketi[0].FirstName,
                response.data.Ticketi[0].LastName,
                response.data.Ticketi[0].Class
              );
            } else {
              setBooked(true);
            }
          } else {
            setGenerateStatus(false);
            setAvailablity(false);
          }
        });
    }
  };

  const bookNow = (ticketId) => {
    const model = {
      Class: Class,
      FirstName: FirstName,
      LastName: LastName,
      ListCode: ListCode,
      User: User,
      TicketIssued: true,
      createdAt: new Date(),
    };
    axios
      .put("http://localhost:8082/ticket/update/" + ticketId, model)
      .then((response) => {
        if (response.status == 200) {
          message.success("Ticket Booked Successfully !!");
          window.location.reload(false);
        } else {
          message.error("Error While Booking !!");
        }
      });
  };
  const GenerateQRCode = (listcode, fname, lname, classn) => {
    const data =
      "Code : " +
      listcode +
      "\n" +
      "Name : " +
      fname +
      "\t" +
      lname +
      "\n" +
      "Class : " +
      classn +
      "\t" +
      "Created User : " +
      User;
    QRCode.toDataURL(
      data,
      {
        width: 800,
        margin: 2,
        color: {
          dark: "#335383FF",
          light: "#EEEEEEFF",
        },
      },
      (err, url) => {
        if (err) return console.error(err);

        console.log(url);
        setQr(url);
      }
    );
  };

  return (
    <Fragment>
      <br></br>
      <br></br>
      <div className="app">
        <h1 style={{ textAlign: "center" }}>Espero Ticket Generator</h1>
        {qr && (
          <div style={{ textAlign: "center" }}>
            <img
              className="imageticket"
              src="http://localhost:3000/static/media/Ticket.9935d85226b91ed81e2b.jpg"
            />
            <img className="imageqr" src={qr} />
            <br></br>
            {/* <a href={qr} download="qrcode.png">
        Download
      </a> */}
          </div>
        )}
        <br></br>

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header" style={{ textAlign: "center" }}>
                Member Details
              </div>
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>List Code</label>
                        &nbsp;
                        <input
                          type="text"
                          className="form-control"
                          placeholder="List Code"
                          value={ListCode}
                          onChange={(e) => setListCode(e.target.value)}
                        />
                        {ListCodeValidation && (
                          <small style={{ color: "red" }}>
                            {ListCodeValidation}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Class</label>
                        &nbsp;
                        <input
                          disabled
                          type="text"
                          className="form-control"
                          placeholder="Class"
                          value={Class}
                          onChange={(e) => setClass(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <br></br>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>First Name</label>
                        &nbsp;
                        <input
                          disabled
                          value={FirstName}
                          type="text"
                          className="form-control"
                          placeholder="First Name"
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="formInput">Last Name</label>
                        &nbsp;
                        <input
                          disabled
                          value={LastName}
                          type="text"
                          placeholder="Last Name"
                          className="form-control"
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <br></br>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label>User</label>
                        &nbsp;
                        <select
                          className="form-control"
                          onChange={(e) => setUser(e.target.value)}
                        >
                          <option value="">Select Creating User</option>
                          <option value="Sanju">Sanju</option>
                          <option value="Chathura">Chathura</option>
                          <option value="Kanishka">Kanishka</option>
                          <option value="Damitha">Damitha</option>
                          <option value="Kavishka">Kavishka</option>
                          <option value="Piumi">Piumi</option>
                        </select>
                        {UserValidation && (
                          <small style={{ color: "red" }}>
                            {UserValidation}
                          </small>
                        )}
                      </div>
                    </div>
                  </div>
                  <br></br>
                </form>
              </div>
            </div>
            <br></br>
            <div className="row">
              <div className="col-md-5"></div>
              <div className="col-md-3">
                {GenerateStatus ? (
                  <div>
                    <button className="btn btn-success" onClick={getUser}>
                      Genrate
                    </button>
                  </div>
                ) : (
                  <div>
                    {Availabitity ? (
                      <div>
                        {Booked ? (
                          <div>
                            <div style={{ color: "red" }}>
                              Already Booked Ticket
                            </div>
                          </div>
                        ) : (
                          <button
                            className="btn btn-success"
                            onClick={() => bookNow(TicketId)}
                          >
                            Book Now
                          </button>
                        )}
                      </div>
                    ) : (
                      <div> No User Registered !! Please Register</div>
                    )}
                  </div>
                )}
              </div>
              <div className="col-md-4"></div>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
      <br></br>
    </Fragment>
  );
}
