import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TypingEffect = () => {
  const text = "Qurilish resurslari milliy klassifikatori";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index++;
      if (index >= text.length) clearInterval(interval);
    }, 50); // Adjust speed here (100ms per letter)
    return () => clearInterval(interval);
  }, [text]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="text-2xl font-bold"
    >
      {displayedText}
    </motion.div>
  );
};

export default TypingEffect;
