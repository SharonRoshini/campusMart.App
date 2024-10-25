import React from "react";
import logo from "../../assets/logo.png"; // Adjust path if necessary

const Logo = () => {
  return (
    <div className="d-flex flex-column align-items-center">
      <img
        src={logo}
        alt="CampusMart Logo"
        style={{ maxHeight: "100px", width: "auto", marginTop: "30px" }}
      />
      <h1 className="text-primary mt-3">CampusMart</h1>
    </div>
  );
};

export default Logo;
