import React from "react";

function Logo({ width = "200px" }) {
  return <img src="/logo.png" alt="Logo" style={{ width, height: '80px', objectFit: 'contain' }} className="object-contain" />;
}

export default Logo;
