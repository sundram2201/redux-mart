import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import logo from "../../../public/RM-logo.png";

const Footer = () => {
  return (
    <div className="">
      <div className="">
        <img
          src={logo}
          style={{ width: "10%", margin: "1rem 0" }}
          alt="footer logo"
        />
      </div>
      <div className="">
        <p>
          Copyright © 2024, ReduxMart®. Designed and developed by Sundram
          Chauhan.
        </p>
        <span className="m-1">
          <a
            href="https://github.com/sundram2201/"
            className="hover-shine"
            target="_blank"
          >
            <GitHubIcon />
          </a>
        </span>
        <span className="m-1">
          <a
            href="https://www.linkedin.com/in/sundram-chauhan-09530423b/"
            className="hover-shine"
            target="_blank"
          >
            <LinkedInIcon />
          </a>
        </span>
      </div>
    </div>
  );
};

export default Footer;
