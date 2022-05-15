import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../pages/Auth";
import Blip from "../pages/Blip";
import UserStorage from "../state/UserStorage";

const RouterPage = () => {
  const baseName = process.env.PUBLIC_URL;

  return (
    <div>
      <UserStorage>
        <BrowserRouter basename={baseName}>
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
