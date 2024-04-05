import React, { useState, useEffect } from "react";

const UseTypingEffect = (text, duration, isTypeByLetter = false) => {
  const [currentPosition, setCurrentPosition] = useState(0); //this is the index 
  const items = isTypeByLetter ? text.split("") : text.split(" ");

  useEffect(() => {
    setCurrentPosition(0);
  }, [text]);

  useEffect(() => {
    if (currentPosition >= items.length) return;

    const intervalId = setInterval(() => {
      setCurrentPosition((prevPosition) => prevPosition + 1);
    }, duration);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentPosition, items, duration]);

  return items.slice(0, currentPosition).join(isTypeByLetter ? "" : " ");
};

export default UseTypingEffect;
