import React, { useEffect } from "react";

const ScrollWrapper = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <>{children}</>;
};

export default ScrollWrapper;
