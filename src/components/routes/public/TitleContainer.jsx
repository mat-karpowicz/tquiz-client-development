import React from "react";
import banner from "./../../../assets/banner.png";

function TitleContainer() {
  return (
    <div className="flex flex-ai-c flex-jc-c flex-col title-container">
      <img className="banner" src={banner} alt="" />
      <h3 className="title">trivia quiz app</h3>
    </div>
  );
}

export default TitleContainer;
