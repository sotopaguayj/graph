import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DosDe from "../pages/2D";
import TresDe from "../pages/3D";
import TresDeImg from "../pages/3D/images";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DosDe />} />
        <Route path="/3dlabel" element={<TresDe />} />
        <Route path="/3dimage" element={<TresDeImg />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
