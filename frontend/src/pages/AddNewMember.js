import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import React, { Fragment, useState } from "react";
import { userimage } from "./constant";
import axios from "axios";
import "antd/dist/antd.css";
import { message, Space } from "antd";
import { useNavigate } from "react-router-dom";
export default function AddNewMember() {
  const navigate = useNavigate();
  const [Class, setClass] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [ListCode, setListCode] = useState("");
  const [User, setUser] = useState("");

  //Validation
  const [ClassValidation, setClassValidation] = useState("");
  const [FirstNameValidation, setFirstNameValidation] = useState("");
  const [LastNameValidation, setLastNameValidation] = useState("");
  const [ListCodeValidation, setListCodeValidation] = useState("");
  const success = () => {
    message.success("Successfully Registered");
  };

  const AddMember = () => {
    setListCodeValidation("");
    setClassValidation("");
    setFirstNameValidation("");
    setLastNameValidation("");
    if (ListCode == "") {
      setListCodeValidation("Please Enter List Code !!!");
    } else if (Class == "") {
      setClassValidation("Please Enter Class !!!");
    } else if (FirstName == "") {
      setFirstNameValidation("Please Enter First Name !!!");
    } else if (LastName == "") {
      setLastNameValidation("Please Enter Last Name !!!");
    } else {
      const model = {
        Class: Class,
        FirstName: FirstName,
        LastName: LastName,
        ListCode: ListCode,
        User: User,
        TicketIssued: false,
      };
      axios.post("http://localhost:8082/ticket/add", model).then((response) => {
        console.log(response);
        if (response.status == 200) {
          success();
          setClass("");
          setFirstName("");
          setLastName("");
          setListCode("");
        }
      });
    }
  };
  return (
    <Fragment>
      <br></br>
      <br></br>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header" style={{ textAlign: "center" }}>
              Add New Member Details
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
                        type="text"
                        className="form-control"
                        placeholder="Class"
                        value={Class}
                        onChange={(e) => setClass(e.target.value)}
                      />
                      {ClassValidation && (
                        <small style={{ color: "red" }}>
                          {ClassValidation}
                        </small>
                      )}
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
                        type="text"
                        value={FirstName}
                        className="form-control"
                        placeholder="First Name"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      {FirstNameValidation && (
                        <small style={{ color: "red" }}>
                          {FirstNameValidation}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="formInput">Last Name</label>
                      &nbsp;
                      <input
                        value={LastName}
                        type="text"
                        placeholder="Last Name"
                        className="form-control"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                      {LastNameValidation && (
                        <small style={{ color: "red" }}>
                          {LastNameValidation}
                        </small>
                      )}
                    </div>
                  </div>
                </div>
                <br></br>

                <br></br>
              </form>
            </div>
          </div>
          <br></br>
          <div className="row">
            <div className="col-md-5"></div>
            <div className="col-md-3">
              <button className="btn btn-success" onClick={() => AddMember()}>
                Register
              </button>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </Fragment>
  );
}
