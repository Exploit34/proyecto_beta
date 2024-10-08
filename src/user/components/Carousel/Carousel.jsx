import "./Carousel.css";
import { useEffect, useState } from "react";

export const Carousel = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`carousel-container ${isLoaded ? "loaded" : ""}`}>
      <div className="carousel-content">
        <div className="section-container">
          <section className="section-left">
            <img src="./img/sena.png" alt="" />
          </section>
          <section className="section-right">
            <h1>ABOUT US</h1>
            <p>
              "Somos un equipo comprometido con la creación de una experiencia
              única en el comercio electrónico. Nuestra plataforma combina la
              conveniencia de las compras en línea con la interacción social,
              conectando a usuarios, compradores y vendedores en un entorno
              colaborativo. Buscamos mejorar la experiencia del usuario y
              brindar oportunidades a pequeños vendedores para que prosperen en
              el mercado digital."
            </p>
            <div className="button-container">
              <button className="button-contactUs">Contact us</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};