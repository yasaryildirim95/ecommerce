import React, { useState, useEffect } from "react";
import styles from "./Slider.module.css";

const Slider = ({ examples, seconds }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progressWidth, setProgressWidth] = useState("100%");
  const [isHovered, setIsHovered] = useState(false);
  const [remaining, setRemaining] = useState(seconds);
  const [onHoverTime, setOnHoverTime] = useState(remaining);

  useEffect(() => {
    let timer;

    const startTimer = () => {
      let remainingTime = onHoverTime;
      timer = setInterval(() => {
        remainingTime -= 1;
        setRemaining(remainingTime);
        setProgressWidth(`${(remainingTime / seconds) * 100}%`);
        if (remainingTime <= 0) {
          clearInterval(timer);
          nextSlide();
        }
      }, 1000); // Run every second
    };

    if (!isHovered) {
      startTimer();
    }
    return () => clearInterval(timer);
  }, [currentIndex, seconds, isHovered]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === examples.length - 1 ? 0 : prevIndex + 1
    );
    setOnHoverTime(seconds);
    setProgressWidth("100%");
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? examples.length - 1 : prevIndex - 1
    );
    setProgressWidth("100%");
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setOnHoverTime(remaining);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={styles.slider}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className={styles.prev} onClick={prevSlide}>
        &#10094;
      </button>
      {examples.map((example, index) => (
        <div
          key={index}
          className={
            index === currentIndex
              ? styles.slide + " " + styles.active
              : styles.slide
          }
        >
          {index === currentIndex && (
            <>
              <div className={styles.textOverlay}>
                <h2 className={styles.title}>{example.title}</h2>
                <p className={styles.description}>{example.description}</p>
              </div>
              <img src={example.image} alt={`slide ${index}`} />
            </>
          )}
        </div>
      ))}
      <button className={styles.next} onClick={nextSlide}>
        &#10095;
      </button>
      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={{ width: progressWidth }}
        ></div>
      </div>
      <div className={styles.dots}>
        {examples.map((example, index) => (
          <span
            key={example.title}
            className={index === currentIndex ? styles.activeDot : styles.dot}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
