import React from "react";
import { Link } from "react-router-dom";
import mascot from "../assets/img/ezycore-mascot-dark.png";

const About = () => (
  <main className="about-page ctn ctn--lg">
    <div className="about-page__content">
      <p className="about-page__eyebrow">A little about us</p>
      <h1>Small beginnings.<br /><span>Big possibilities.</span></h1>
      <p>EzyCore is a React framework that brings reusable components, styles and tools together in a shared foundation for building applications.</p>
      <p>The idea is simple: share the essentials, keep things flexible and let every application have its own identity. A little less repetition. A little more room for your next idea.</p>
      <Link className="page-button page-button--outline" to="/">Back to home <span aria-hidden="true">→</span></Link>
    </div>
    <img className="about-page__mascot" src={mascot} alt="EzyCore mascot" />
  </main>
);

export default About;
