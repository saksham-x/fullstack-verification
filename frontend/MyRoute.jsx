import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VerifyPage from "./src/pages/VerifyPage";
import SuccessPage from "./src/pages/SuccessPage";

const MyRoute = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<VerifyPage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default MyRoute;
