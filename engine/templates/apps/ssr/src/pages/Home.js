import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <main className="sample-page ctn ctn--lg">
    <h1>Welcome</h1>
    <p>Your SSR app is ready. Start by making this page your own.</p>
    <Link to="/about">About this app</Link>
  </main>
);
export default Home;
