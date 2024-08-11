import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

export const AnimatedText = ({ parts = [] }) => {
  const ref = useRef(null);
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false); // State to track if animation has already run

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          controls.start("animate");
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls, hasAnimated]);

  // Define animation variants for individual letters
  const letterVariants = {
    initial: {
      opacity: 0,
      y: 10,
    },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  // Define animation variants for text parts
  const partVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 1.5,
        duration: 0.8,
      },
    }),
  };

  // Function to split text into individual characters
  const splitText = (text) =>
    text.split("").map((char, index) => (
      <motion.span
        key={index}
        variants={letterVariants}
        initial='initial'
        animate={hasAnimated ? "animate" : "initial"}
        custom={index}
        style={{ display: "inline-block" }}>
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));

  return (
    <div ref={ref} style={{ display: "inline-block", flexWrap: "wrap", flexDirection: "column" }}>
      {parts.map((part, partIndex) => (
        <motion.div
          key={partIndex}
          variants={partVariants}
          initial='initial'
          animate={hasAnimated ? "animate" : "initial"}
          custom={partIndex}
          style={part.style ?? false}>
          {splitText(part.text)}
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedText;
