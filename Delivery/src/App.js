import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignUP from "./components/SignUp";
import Home from "./components/pages/Home";
import CustomerProfile from "./components/pages/CustomerProfile";
import OwnerProfile from "./components/pages/OwnerProfile";
import VehicleRegister from "./components/pages/VehicleRegister";
import MakeDelivery from "./components/pages/MakeDelivery";
import DeliveryConfirmation from "./components/DeliveryConfirmation";
import CustomerDeliveries from "./components/pages/CustomerDeliveries";
import OwnerVehiclesDisplay from "./components/OwnerVehiclesDisplay";
import OwnerOrders from "./components/pages/OwnerOrders";
// import DeliveryForm from "./components/DeliveryForm";
import Map from "./components/Map";
// import Mapnon from "./components/Map";
// import BasicMap from "./components/Map";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/sign-up" element={<SignUP />} />
            <Route
              exact
              path="/customer-profile"
              element={<CustomerProfile />}
            />
            <Route exact path="/owner-profile" element={<OwnerProfile />} />
            <Route
              exact
              path="/vehicle-register"
              element={<VehicleRegister />}
            />
            <Route
              exact
              path="/display-owner-vehicles"
              element={<OwnerVehiclesDisplay />}
            />
            <Route exact path="/make-delivery" element={<MakeDelivery />} />
            <Route
              exact
              path="/delivery-confirmation"
              element={<DeliveryConfirmation />}
            />
            <Route
              exact
              path="/customer-deliveries"
              element={<CustomerDeliveries />}
            />
            <Route exact path="/owner-orders" element={<OwnerOrders />} />
            <Route exact path="/map" element={<Map />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
