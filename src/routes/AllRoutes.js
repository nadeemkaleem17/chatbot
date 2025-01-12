import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage, Login, SignUp, ChatPage } from "../pages/";
export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </>
  );
};
