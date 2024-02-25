import React, { useState } from "react";
import Event from "./Event";

const Events = ({ dbData, activeCategory, setActiveCategory, isLoading,sideBar }) => {
  const [active, setActive] = useState(false);

  return (
    <>
        {sideBar=="All Events"?      <main className="events" id="available-events">
        <h1>Available Events</h1>
        <div className="search">
          {/* <div>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search" />
          </div> */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            //   padding: "10px 0",
              cursor: "pointer",
            }}
            onClick={() => setActive(!active)}
          >
            <p style={{ paddingLeft: "10px" }}>{activeCategory}</p>
            <i
              className="fa-solid fa-caret-down "
              style={{ marginRight: "15px" }}
            ></i>
          </div>
          <div
            className={
              active
                ? "category-dropdown category-dropdown-active"
                : "category-dropdown"
            }
          >
            <p
              onClick={() => {
                setActiveCategory("All");
                setActive(false);
              }}
            >
              All
            </p>
            <p
              onClick={() => {
                setActiveCategory("Career Development");
                setActive(false);
              }}
            >
              Career Development
            </p>
            <p
              onClick={() => {
                setActiveCategory("Entertainment");
                setActive(false);
              }}
            >
              Entertainment
            </p>
            <p
              onClick={() => {
                setActiveCategory("Webinar");
                setActive(false);
              }}
            >
              Webinar
            </p>
            <p
              onClick={() => {
                setActiveCategory("Bootcamp");
                setActive(false);
              }}
            >
              Bootcamp
            </p>
            <p
              onClick={() => {
                setActiveCategory("Technical");
                setActive(false);
              }}
            >
              Technical
            </p>
          </div>
        </div>

        <div className="event-card">
          {isLoading ? (
            <span className="loader"></span>
          ) : dbData.length ? (
            dbData.map((item) => (
              <Event key={item.id} item={item} id={item.id} />
            ))
          ):<p style={{textAlign:'center'}}>No available Events</p>}
        </div>
      </main>:null}
    </>
  );
};

export default Events;
