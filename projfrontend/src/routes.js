import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Home from "./core/home";
import ResponsiveAppBar from "./core/Appbar";
import Footer from "./core/Footer";
import Signup from "./user/signout";
import Signin from "./user/signin";
import Priveteroutes from "./auth/helper/Priveteroutes";
import Dashboard from "./user/dashbord";
import Cart from "./core/cart";
export const Rout = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/user/dashbord"
          element={
            <Priveteroutes>
              <Dashboard />
            </Priveteroutes>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
      <Footer />
    </>
  );
};
