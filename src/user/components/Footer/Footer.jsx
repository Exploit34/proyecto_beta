import React from "react";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-logo">
          <h2>MarketShare</h2>
        </div>
        <div className="footer-contact">
          <p>Contacto:</p>
          <p>contacto@marketshare.com</p>
          <p>+1 (123) 456-7890</p>
          <p>Dirección: 123 Market St, Ciudad, País</p>
        </div>
      </div>
      <div className="footer-copyright">
        <p>© 2024 MarketShare Inc., Todos los derechos reservados.</p>
        <p>Creado con amor por MarketShare Team</p>
      </div>
    </footer>
  );
};
