import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { CardBody, CardHeader, Table, Card } from "reactstrap";
import moment from "moment";
import { message } from "antd";
export default function AllMembers() {
  const [TableData, setTableData] = useState("");
  const getAll = () => {
    axios.get("http://localhost:8082/ticket/get").then((response) => {
      console.log("TableDta", response);
      setTableData(response.data);
    });
  };
  const attened = (dataset) => {
    const model = {
      Class: dataset.Class,
      FirstName: dataset.FirstName,
      LastName: dataset.LastName,
      ListCode: dataset.ListCode,
      User: dataset.User,
      TicketIssued: true,
      Attended: true,
      createdAt: dataset.createdAt,
    };
    axios
      .put("http://localhost:8082/ticket/update/" + dataset._id, model)
      .then((response) => {
        if (response.status == 200) {
          message.success("Atteded  Successfully !!");
          window.location.reload(false);
        } else {
          message.error("Error While Booking !!");
        }
      });
  };
  useEffect(() => {
    if (!TableData) {
      getAll();
    }
  });
  return (
    <Fragment>
      <br></br>
      <Card>
        <CardHeader style={{ textAlign: "center" }}>
          All User Details
        </CardHeader>
        <CardBody>
          <br></br>
          <Table>
            <tr>
              <th style={{ textAlign: "center" }}>Code</th>
              <th style={{ textAlign: "center" }}>First Name</th>
              <th style={{ textAlign: "center" }}>Last Name</th>
              <th style={{ textAlign: "center" }}>Class</th>
              <th style={{ textAlign: "center" }}> Issued Status</th>
              <th style={{ textAlign: "center" }}>Issued User</th>
              <th style={{ textAlign: "center" }}>Issued Date</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
            {TableData &&
              TableData.map((item, index) => {
                return (
                  <tbody>
                    <tr>
                      <td style={{ textAlign: "center" }}>{item.ListCode}</td>
                      <td style={{ textAlign: "center" }}>{item.FirstName}</td>
                      <td style={{ textAlign: "center" }}>{item.LastName}</td>
                      <td style={{ textAlign: "center" }}>{item.Class}</td>
                      <td style={{ textAlign: "center" }}>
                        {item.TicketIssued ? (
                          <div style={{ color: "green", fontWeight: "bolder" }}>
                            Issued
                          </div>
                        ) : (
                          <div style={{ color: "red", fontWeight: "bolder" }}>
                            Pending
                          </div>
                        )}
                      </td>
                      <td style={{ textAlign: "center" }}>{item.User}</td>
                      <td style={{ textAlign: "center" }}>
                        {moment(item.createdAt).format("yyyy-MM-DD")}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {item.Attended ? (
                          <div style={{ color: "green", fontWeight: "bolder" }}>
                            Atteded
                          </div>
                        ) : (
                          <button
                            className="btn btn-success"
                            onClick={() => attened(item)}
                          >
                            Attend
                          </button>
                        )}
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </Table>
        </CardBody>
      </Card>
    </Fragment>
  );
}
