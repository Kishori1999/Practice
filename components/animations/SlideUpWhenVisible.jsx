import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

function SlideUpWhenVisible({ children, duration = 0.5, fromOpacity = 1, className, delay = 0, translateYStart = 70 }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      className={className}
      transition={{
        duration,
        delay,
      }}
      variants={{
        visible: {
          translateY: 0,
          opacity: 1,
        },
        hidden: {
          opacity: fromOpacity,
          translateY: translateYStart,
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export default SlideUpWhenVisible;
