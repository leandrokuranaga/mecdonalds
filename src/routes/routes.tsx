import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../pages/Auth";
import Blip from "../pages/Blip";
import UserStorage from "../state/UserStorage";

const RouterPage = () => {
  return (
    <div>
      <UserStorage>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/blip" element={<Blip />} />
          </Routes>
        </BrowserRouter>
      </UserStorage>
    </div>
  );
};

export default RouterPage;
