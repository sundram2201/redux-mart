import React from "react";
import banner from "../../../public/rdxm-banner.png";
import AnimatedText from "../../components/Animations";

const MainScreen = ({ styles }) => {
  const textPartsHead = [
    { text: "Welcome to ", style: styles.headingTop },
    { text: "ReduxMart", style: styles.headingBtm },
  ];
  return (
    <>
      <div className='banner-box'>
        <img className='w-100  ' src={banner} alt='banner' />
      </div>
      <div className='mt-5 siteHeading'>
        <AnimatedText parts={textPartsHead} />
      </div>
      <p className='rdxm-desc'>
        ReduxMart is a modern e-commerce application developed using the MERN stack, designed to simulate a real-world
        online store experience. This project highlights my proficiency in full-stack development, from designing a
        responsive frontend with React and Redux to building a scalable backend using Node.js, Express, and MongoDB.
        ReduxMart offers features such as user authentication, product management, and a streamlined checkout process,
        all while ensuring smooth performance and a user-friendly interface. This project represents my dedication to
        creating high-quality web applications that meet the needs of both businesses and end-users.
        <br />
        <br />
        Feel free to explore the code on my
        <a
          href='https://github.com/sundram2201'
          target='_blank'
          style={{ color: "rgb(122, 62, 246)" }}
          className='crt-acnt-link'>
          {" "}
          GitHub profile
        </a>
        , and if you find this project helpful or inspiring, please consider giving it a star! 🌟
      </p>
    </>
  );
};

export default MainScreen;
