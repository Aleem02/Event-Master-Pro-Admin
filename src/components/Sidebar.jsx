import React from 'react'

const Sidebar = ({setSideBar}) => {
  return (
    <section style={{ display: "flex" }} className="sidebar">
      
        <p onClick={() => setSideBar("All Events")}>
          <i class="fa-solid fa-house"></i> All Events
        </p>
      
      
        <p onClick={() => setSideBar("Create Event")}>
          <i class="fa-solid fa-plus"></i> Create Event
        </p>
      
     
        <p onClick={() => setSideBar("Your Events")}>
          <i class="fa-solid fa-list-ul"></i> Your Events
        </p>
      
    </section>
  );
}

export default Sidebar