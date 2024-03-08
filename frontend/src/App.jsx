import { Routes, Route } from "react-router-dom";
import { HomePage, CartsPage, OrdersPage, ContactUsPage } from "./Pages";
import Navbar from "./components/Navbar";

import "./App.css";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/carts" element={<CartsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
      </Routes>
    </>
  );
};

export default App;
