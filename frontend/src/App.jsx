import { Routes, Route, useLocation } from "react-router-dom";
import {
  HomePage,
  CartsPage,
  OrdersPage,
  ContactUsPage,
  EditProfile,
} from "./Pages";
import AdminLogin from "./Pages/Admin/AdminLogin.jsx";
import AdminHome from "./Pages/Admin/Page/Home.jsx";

import { AuthProvider } from "./utils/authContext.jsx";
import Navbar from "./components/Navbar";
import AdminItems from "./Pages/Admin/Page/Items.jsx";
import AdminOrders from "./Pages/Admin/Page/Orders.jsx";
import AdminCustomers from "./Pages/Admin/Page/Customers.jsx";

import "./App.css";

const App = () => {
  const location = useLocation();

  // Determine if the navbar should be visible based on the route
  const isNavbarVisible = !location.pathname.startsWith("/admin");

  return (
    <>
      <AuthProvider>
        {isNavbarVisible && <Navbar />}
        {/* <Navbar /> */}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/carts" element={<CartsPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/contact" element={<ContactUsPage />} />

          <Route path="/user-profile" element={<EditProfile />} />
          <Route>
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin-home" element={<AdminHome />} />
            <Route path="/admin-items" element={<AdminItems />} />
            <Route path="/admin-order" element={<AdminOrders />} />
            <Route path="/admin-customer" element={<AdminCustomers />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
