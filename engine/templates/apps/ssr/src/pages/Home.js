import React from "react";
import { Link } from "react-router-dom";
import mascot from "../assets/img/ezycore-mascot-wave.png";

const Home = () => (
  <main className="home-page ctn ctn--lg">
    <img className="home-page__mascot" src={mascot} alt="EzyCore mascot waving hello" />
    <h1>Welcome to <span>EzyCore</span></h1>
    <p className="home-page__intro">Small beginnings. Big ideas. Endless possibilities.</p>
    <Link className="page-button" to="/about">About EzyCore <span aria-hidden="true">→</span></Link>
  </main>
);

export default Home;
