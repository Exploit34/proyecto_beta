import "./About.css";
import React, { lazy, Suspense } from "react";
import Loader from "../../components/Loaders/Loader.jsx";
import TopBar from "../../../common/TopBar/TopBar.jsx";
import { Carousel } from "../../components/Carousel/Carousel.jsx";
import { Footer } from "../../components/Footer/Footer.jsx";
// const Carousel = lazy(() => import("../../components/Carousel/Carousel.jsx"));
// const Footer = lazy(() => import("../../components/Footer/Footer.jsx"));
const About = () => {
  return (
    <div className="about-container">
      <Suspense fallback={<Loader />}>
        <TopBar></TopBar>
        <Carousel></Carousel>
        <Footer></Footer>
      </Suspense>
    </div>
  );
};

export default About;
