import React, { useEffect, useState } from "react";
// import hero from "./hero.png";
import "./eventdetail.css";
import { db, auth } from "../Config/firebase-config";
import { getDoc, doc, deleteDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
// import  RelatedEvents  from './RelatedEvents';

const EventDetail = () => {
  const [eventDetails, setEventDetails] = useState({});
  const navigate = useNavigate();

  const params = useParams();
  //const sliced = params.id.slice(1);
  console.log(params);

  useEffect(() => {
    const getEventDetail = async () => {
      const collectionRef = doc(db, "Events", params.id);
      try {
        const data = await getDoc(collectionRef);
        const filteredData = data.data();
        // console.log(data);
        console.log(data.data());
        setEventDetails(filteredData);
        console.log(eventDetails);
      } catch (err) {
        console.log(err);
      }
    };
    getEventDetail();
  }, []);

  const handleDelete = async (id) => {
    const collectionRef = doc(db, "Events", id);
    if (window.confirm("Are you sure to delete")) {
      try {
        await deleteDoc(collectionRef).then(() => {
          navigate("/");
          toast.success("Event Deleted");
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div style={{width:'80%',margin:'auto'}}>
        <Navbar />
      </div>
      <main className="eventdetails">
        <img src={eventDetails.imgUrl} alt="image" />
        <div className="details">
          <h1>{eventDetails.title}</h1>
          <p id="category">{eventDetails.category}</p>
          {eventDetails.registerLink ? (
            <a href={eventDetails.registerLink} target="_blank">
              Register
            </a>
          ) : null}
          <p id="date">
            <i className="fa-solid fa-calendar-days"></i>
            {eventDetails.date}
          </p>
          <p id="mode">
            <i className="fa-solid fa-location-dot"></i>
            {eventDetails.mode == "Offline" || "" ? (
              <span>{eventDetails.location}</span>
            ) : (
              <span>Online</span>
            )}
          </p>
          <span>What You'll Learn:</span>
          <p>{eventDetails.description}</p>
          {auth.currentUser?.email == eventDetails.currentUser ? (
            <button
              className="delete-event"
              onClick={() => handleDelete(params.id)}
            >
              Delete
            </button>
          ) : null}
        </div>
      </main>
    </>
  );
};

export default EventDetail;
