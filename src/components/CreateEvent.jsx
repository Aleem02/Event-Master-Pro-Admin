import React, { useState } from "react";
import "./createnew.css";

const CreateEvent = ({
  setTitle,
  setDescription,
  setLocation,
  setRegisterLink,
  setCategory,
  setMode,
  setDate,
  imageUpload,
  setImageUpload,
  handleFileUpload,
  handleFormSubmit,
  sideBar,
  setSideBar
}) => {
  const [isLocation, setIsLocation] = useState(true);

  const handleModeChange = (e) => {
    setMode(e.target.value);
    setIsLocation(!isLocation);
  };

  const handleImageChange = (e) => {
    setImageUpload(e.target.files[0]);
  };

  return (
    <>
    {sideBar=="Create Event"?<form>
      <h1>Create Event</h1>
      <div className="title">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div style={{ cursor: "auto" }}>
          <label htmlFor="category1">Choose Category</label>
          <select
            name="category"
            id="category1"
            onChange={(e) => setCategory(e.target.value)}
            style={{ marginBottom: "0px", cursor: "pointer" }}
          >
            <option></option>
            <option value="Career Development">Career Development</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Webinar">Webinar</option>
            <option value="Bootcamp">Bootcamp</option>
            <option value="Technical">Technical</option>
            <option value="Others">Others</option>
          </select>
        </div>
      </div>
      <textarea
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <div className="file-upload">
        <label htmlFor="file">Image</label>
        <input type="file" onChange={(e) => handleImageChange(e)} />
        <button
          className={
            imageUpload != null ? "upload-image-active" : "upload-image"
          }
          onClick={handleFileUpload}
        >
          Upload Image
        </button>
      </div>
      <div className="mode">
        <div>
          <label htmlFor="category">Choose Mode</label>
          <select
            name="mode"
            id="category1"
            onChange={(e) => handleModeChange(e)}
            style={{ marginBottom: "0px" }}
          >
            <option value="Offline">Offline</option>
            <option value="Online">Online</option>
          </select>
        </div>
        {isLocation ? (
          <div>
            <i className="fa-solid fa-location-dot"></i>
            <input
              type="text"
              placeholder="Enter Location"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        ) : null}
      </div>
      <div className="date">
        <label htmlFor="date">Select Date</label>
        <input
          type="date"
          id="date"
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="url">
        <input
          type="url"
          placeholder="Register Link"
          onChange={(e) => setRegisterLink(e.target.value)}
        />
      </div>
      <button
        className="submit-btn"
        onClick={handleFormSubmit}
        style={{ cursor: "pointer" }}
      >
        Create Event
      </button>
    </form>:null}
    </>
  );
};

export default CreateEvent;
