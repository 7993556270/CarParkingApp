import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import { json, useNavigate } from "react-router-dom";

const ParkkAllocations = () => {
  const [date, setDate] = useState(
    new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    })
  );
  const navi = useNavigate();
  const [show, setShow] = useState("");
  const [sin, setsin] = useState(false);
  const [cardd, setcardd] = useState([]);

  useEffect(() => {
    getNoOfCrds();
  }, []);
  const display = localStorage.getItem("value");

  const locations = [
    "Nandini Layout",
    "MahaLakshmi Layout",
    "Hsr Layout",
    "Jalahalli",
    "BTM Layout",
    "Nelamangala",
    "KorMangala",
    "Indiranagar",
  ];

  const location = locations[Math.floor(Math.random() * locations.length)];

  const getNoOfCrds = () => {
    const arr = [];

    for (let i = 0; i < display; i++) {
      arr.push({
        id: i + 1,
        isAllocated: false,
        locationName: location,
      });
    }
    setcardd(arr);
  };

  const parkedVehicle=cardd.map((d)=>{return d.car});
  console.log(parkedVehicle);

  // const cardd=getNoOfCrds();

  const bookParking = (a, e) => {
    e.preventDefault();

    const vehicle = prompt("Enter Vehicle Number");
    a["car"] = vehicle;
    setsin(true);

    if(parkedVehicle.includes(vehicle)){
      alert("Vehicle with this number already parked");
    }else{
      e.currentTarget.disabled = true;
    if (e.currentTarget.disabled === true) {
      setShow(vehicle);
    } else {
      setShow("");
    }

    var data = {
      time: date,
      details: a,
      vehicleNum: vehicle,
    };

    localStorage.setItem("details", JSON.stringify(data));
    axios({
      method: "POST",
      url: "https://httpstat.us/200",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      console.log(a);
    });
    }

    
  };

  const detailpage = () => {
    navi("/parked");
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Parking allocations</h2>

      <span>
        {cardd.map((s, index) => {
          return (
            <Card
              style={{
                width: "18rem",
                display: "inline-block",
                margin: "10px",
              }}
            >
              <Card.Body>
                <Card.Title>Parking Slot {s.id}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Location:<b> {s.locationName}</b>
                </Card.Subtitle>
                {sin ? <Card.Text onClick={detailpage}>{s.car}</Card.Text> : ""}
                <Card.Text>Time:{date}</Card.Text>
                <span style={{ alignSelf: "center" }}>
                  <Button onClick={(e) => bookParking(s, e)}>Book</Button>
                </span>
              </Card.Body>
            </Card>
          );
        })}
      </span>
    </>
  );
};

export default ParkkAllocations;
