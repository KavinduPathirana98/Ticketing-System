import Navbar from "./Navbar";

import AllMembers from "./pages/AllMembers";
import { Route, Routes } from "react-router-dom";
import AddNewMember from "./pages/AddNewMember";
import ReserveTicket from "./pages/ReserveTicket";

function App() {
  localStorage.setItem("UserId", "1");
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<ReserveTicket />} />
          <Route path="/channel" element={<AddNewMember />} />
          <Route path="/allmembers" element={<AllMembers />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
