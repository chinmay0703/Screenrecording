import React, { useState } from "react";
import RecordContext from "./RecordContext.js";


const RecordProvider = ({ children }) => {

  const [isNewVideoRecored, setisNewVideoRecored] = useState(false);

  const setVideoCreated = () => {
    setisNewVideoRecored(true);
  };

  const resetVideoCreated = () => {
    setisNewVideoRecored(false);
  };

  return (
    <RecordContext.Provider value={{ isNewVideoRecored, setVideoCreated, resetVideoCreated }}>
      {children}
    </RecordContext.Provider>
  );
};

export default RecordProvider;
