import { Routes, Route } from "react-router-dom";
import { HomePage, CartsPage, OrdersPage, ContactUsPage } from "./Pages";
import CarousalSlider from "./components/Carousal_swipe";

import { AuthProvider } from "./utils/authContext.jsx";
import Navbar from "./components/Navbar";

import "./App.css";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/carts" element={<CartsPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/contact" element={<ContactUsPage />} />

          {/* <Route path="/slider" element={<CarousalSlider />} /> */}
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
