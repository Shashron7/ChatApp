import "./App.css";
import Navbar from "./Components/Navbar";
import Welcome from "./Components/Welcome";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Signedin from "./Components/Signedin";
import ChatRoom from "./Components/ChatRoom";
import { UserProvider } from "./Components/UserContext";
import { app, getAuth } from "./Components/Firebase";
import { RecoilRoot } from "recoil";

function App() {
  
  return (
    <div className="App">
      <UserProvider>
        <Router>
        <RecoilRoot>
          <Navbar />
          <Routes>
            <Route path="/" element={<Welcome />}></Route>
            <Route path="/in" element={<Signedin />}></Route>
            <Route path="/chat" element={<ChatRoom />}></Route>
          </Routes>
          </RecoilRoot>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
