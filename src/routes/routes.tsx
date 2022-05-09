import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../pages/Auth";
import Blip from "../pages/Blip";

const RouterPage = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/blip" element={<Blip />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default RouterPage;
