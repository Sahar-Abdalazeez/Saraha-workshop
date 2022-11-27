import Navbar from "./screens/Navbar";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";
import AllUsers from "./screens/AllUsers";
import Message from "./screens/Message";
import RecievedMessages from "./screens/RecievedMessages";
import { Route, Routes } from "react-router-dom";
import User from "./screens/User";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/message" element={<Message />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/user" element={<User />}></Route>
        <Route path="/users" element={<AllUsers />}></Route>
        <Route path="/recievedMessages" element={<RecievedMessages />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
