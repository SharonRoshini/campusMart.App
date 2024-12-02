import React from "react";
import logo from "../../assets/logo.png"; 

const Logo = ({ onLogoClick, style }) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <img
        src={logo}
        alt="CampusMart Logo"
        style={{ 
          maxHeight: "100px", 
          width: "auto", 
          marginTop: "30px",
          ...(onLogoClick ? { cursor: 'pointer' } : {})
        }}
        {...(onLogoClick ? { onClick: onLogoClick } : {})}
      />
      <h1 className="text-primary mt-3">CampusMart</h1>
    </div>
  );
};

export default Logo;