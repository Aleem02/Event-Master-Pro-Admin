import React, { useEffect, useState } from "react";
import Event from "./Event";
import { auth, db } from "../Config/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const YourEvents = ({ sideBar }) => {
  //Loading animation useState
  const [isLoading, setIsLoading] = useState(true);

  //reading database
  const [dbData, setDbData] = useState([]);

  const dbCollectionRef = collection(db, "Events");

  useEffect(() => {
    const readDataBase = async () => {
      const q = query(
        dbCollectionRef,
        where("currentUser", "==", localStorage.getItem("users"))
      );
      try {
        // const data = await getDocs(dbCollectionRef);
        // const filteredData = data.docs.map((doc) => ({
        //   ...doc.data(),
        //   id: doc.id,
        // }));
        //console.log(filteredData);

        onSnapshot(q, (snapshot) => {
          const filteredData = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setDbData(filteredData);
          setIsLoading(false);
          //   console.log(dbData);
        });
      } catch (err) {
        console.log(err);
      }
    };
    readDataBase();
  }, [])
  

  return (
    <div>
      {sideBar == "Your Events" ? (
        <div>
          <h1>Your Events</h1>
          <div className="event-card">
            {isLoading ? (
              <span className="loader"></span>
            ) : (
              dbData.map((item) => (
                <Event key={item.id} item={item} id={item.id} />
              ))
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default YourEvents;
