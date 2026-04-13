import React from "react";
import { Link } from "react-router";
import "./app-brand.scss";

const AppBrand = () => {
  return (
    <Link to="/" className="app-brand" aria-label="Go to landing page">
      <span className="app-brand__swap">
        <span className="app-brand__text">
          <span className="app-brand__white">Resum</span>
          <span className="app-brand__red">O</span>
        </span>

        <span className="app-brand__home-icon" aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 10.5 12 3l9 7.5" />
            <path d="M5 9.5V20h14V9.5" />
            <path d="M9.5 20v-6h5v6" />
          </svg>
        </span>
      </span>
    </Link>
  );
};

export default AppBrand;