import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home'
import Login from './components/Login';
import Register from './components/Register';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './components/mediaquery.css'
import EventDetail from './components/EventDetail';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <ToastContainer style={{ zIndex: 99 }} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:id" element={<EventDetail />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
