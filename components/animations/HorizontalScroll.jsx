import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { throttle } from "lodash";
import token from "../../styles/token";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";

const TallOuterContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;

  @media ${token.homepage.introduction.sliderBreak} {
    height: 300vh;
  }
`;

const StickyInnerContainer = styled.div`
  @media ${token.homepage.introduction.sliderBreak} {
    position: sticky;
    top: 0;
    height: 100vh;
    width: 100%;
    overflow-x: hidden;
  }
`;

const HorizontalTranslateContainer = styled.div`
  @media ${token.homepage.introduction.sliderBreak} {
    position: absolute;
    height: 100%;
    will-change: transform;
  }
`;

const handleDynamicHeight = (ref, setDynamicHeight) => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const dynamicHeight = 3 * window.innerHeight - vw + vh + 150;
  setDynamicHeight(dynamicHeight);
};

const applyScrollListener = (ref, setDynamicHeight, setIndex) => {
  if (ref.current) {
    const totalHeight = 2 * window.outerHeight;
    const segmentHeight = totalHeight / 3;
    const fireHeight1 = segmentHeight;
    const fireHeight2 = segmentHeight * 2;
    const scrollHandler = throttle(() => {
      const offsetTop = -ref.current.offsetTop;
      if (fireHeight2 < -offsetTop) {
        setIndex(2);
      } else if (fireHeight1 < -offsetTop) {
        setIndex(1);
      } else if (-offsetTop > 0) {
        setIndex(0);
      }
    }, 16);

    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }
  return undefined;
};

export default function HorizontalScroll({ children, setIndex }) {
  const [dynamicHeight, setDynamicHeight] = useState(null);
  const dimensions = useWindowDimensions();

  const containerRef = useRef(null);
  const objectRef = useRef(null);

  const resizeHandler = () => {
    handleDynamicHeight(objectRef, setDynamicHeight);
  };

  useEffect(() => {
    if (dimensions.width > 768) {
      if (objectRef.current && containerRef.current) {
        handleDynamicHeight(objectRef, setDynamicHeight);
        window.addEventListener("resize", resizeHandler);
        const cleanup = applyScrollListener(containerRef, setDynamicHeight, setIndex);
        return () => {
          if (cleanup) {
            cleanup();
          }
          window.removeEventListener("resize", resizeHandler);
        };
      }
    }
    return undefined;
  }, [containerRef.current, dimensions.width]);

  return (
    <TallOuterContainer dynamicHeight={dynamicHeight}>
      <StickyInnerContainer ref={containerRef}>
        <HorizontalTranslateContainer ref={objectRef}>{children}</HorizontalTranslateContainer>
      </StickyInnerContainer>
    </TallOuterContainer>
  );
}
