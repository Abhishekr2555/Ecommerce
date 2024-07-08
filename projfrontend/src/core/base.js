import React from "react";
import ResponsiveAppBar from "./Appbar";
import Footer from "./Footer";


const Base = ({
  title = "My Title",
  
  children,
}) => {
  return (
    <>
     <div className="container-fluid">
      <div className="">{children}</div>
      </div>
        </>
  );
};

export default Base;
