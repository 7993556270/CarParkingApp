import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ParkedDetails = () => {
  const [date, setDate] = useState(new Date().toLocaleTimeString("fa-IR"));

  const obj = JSON.parse(localStorage.getItem("details"));
  console.log(obj);
  useEffect(() => {
    getDeatils();
    document.title = date;
    const timerID = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(timerID);
    };
  }, []);

  const tick = () => {
    setDate(new Date().toLocaleTimeString());
  };

  const navi=useNavigate();


  const dellocate=()=>{
    localStorage.clear();
    navi('/');

  }
  const getDeatils = () => {
    axios({
      method: "GET",
      url: "https://httpstat.us/200",
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <div>
      <h1>Parking Booked Now</h1>

      <Card style={{ width: "18rem", margin: "10px" }}>
        <ListGroup variant="flush">
        <ListGroup.Item>Vehicle Number:{obj.vehicleNum}</ListGroup.Item>
          <ListGroup.Item>Parked Booked From:{obj.time}</ListGroup.Item>
          <ListGroup.Item>Parked Booked Till:{date}</ListGroup.Item>
          <ListGroup.Item>Location:{obj.details.locationName}</ListGroup.Item>
        </ListGroup>
      </Card>

      <button className="btn btn-danger" onClick={dellocate}>Deallocate</button>
    </div>
  );
};

export default ParkedDetails;
