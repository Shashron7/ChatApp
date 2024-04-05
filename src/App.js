import "./App.css";
import Navbar from "./Components/Navbar";
import Welcome from "./Components/Welcome";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Signedin from "./Components/Signedin";
import ChatRoom from "./Components/ChatRoom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/in" element={<Signedin />}></Route>
          <Route path="/chat" element={<ChatRoom />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
