import React, { useEffect, useState } from "react";
import { Link, Route, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import CreateEvent from "./CreateEvent";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../Config/firebase-config";
import { toast } from "react-toastify";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import Events from "./Events";
import Footer from "./Footer";
import EventDetail from "./EventDetail";
import YourEvents from "./YourEvents";

const Home = () => {
  const navigate = useNavigate();

  const [sideBar, setSideBar] = useState("All Events");

  //create event useStates
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [registerLink, setRegisterLink] = useState("");
  const [category, setCategory] = useState("");
  const [mode, setMode] = useState("Offline");
  const [date, setDate] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);

  //imageURL
  const [imgUrl, setImgurl] = useState(null);

  //Category functinality useState
  const [activeCategory, setActiveCategory] = useState("All");

  //Loading animation useState
  const [isLoading, setIsLoading] = useState(true);

  //reading database
  const [dbData, setDbData] = useState([]);

   const dbCollectionRef = collection(db, "Events");

  useEffect(() => {
    const readDataBase = async () => {
      const q =
        activeCategory == "All"
          ? query(dbCollectionRef, orderBy("createdAt", "desc"))
          : query(dbCollectionRef, where("category", "==", activeCategory));
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
          console.log(dbData);
        });
      } catch (err) {
        console.log(err);
      }
    };
    readDataBase();
  }, [activeCategory]);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const imageFolderRef = ref(storage, `Event-Images/${imageUpload?.name}`);
    try {
      await uploadBytes(imageFolderRef, imageUpload).then(() => {
        listAll(ref(storage, "Event-Images")).then((imgs) => {
          console.log(imgs);
          imgs.items.forEach((item) => {
            //console.log(item.name);
            if (item.name == imageUpload?.name) {
              getDownloadURL(item).then((url) => {
                setImgurl(url);
                console.log(url);
                alert("upload succesful");
              });
            } else {
              return null;
            }
          });
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

 

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!title || !category || !description || !date) {
      toast.error("Please Provide All Information");
    } else {
      try {
        await addDoc(dbCollectionRef, {
          currentUser: auth.currentUser.email,
          title: title,
          category: category,
          description: description,
          imgUrl: imgUrl,
          mode: mode,
          location: location,
          date: date,
          registerLink: registerLink,
          createdAt: serverTimestamp(),
        }).then(() => {
          navigate("/");
          setSideBar("All Events")
          toast.success("Event Created Successfully");
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      {!localStorage.getItem("users") ? (
        <Link
          to="/login"
          style={{
            textDecoration: "none",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            backgroundColor: "blue",
            padding: "10px 30px",
            borderRadius: "7px",
            color: "white",
            fontWeight: "bold",
          }}
        >
          LOGIN TO CONTINUE
        </Link>
      ) : (
        <>
          <div className="home">
            <Navbar />

            <Sidebar setSideBar={setSideBar} />
            <CreateEvent
              sideBar={sideBar}
              setSideBar={setSideBar}
              setTitle={setTitle}
              setDescription={setDescription}
              setLocation={setLocation}
              setRegisterLink={setRegisterLink}
              setCategory={setCategory}
              setMode={setMode}
              setDate={setDate}
              imageUpload={imageUpload}
              setImageUpload={setImageUpload}
              handleFileUpload={handleFileUpload}
              handleFormSubmit={handleFormSubmit}
            />
            <Events
              sideBar={sideBar}
              dbData={dbData}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              isLoading={isLoading}
            />
            <YourEvents sideBar={sideBar} />
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Home;
