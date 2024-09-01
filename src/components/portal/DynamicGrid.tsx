import React, { useEffect, useState } from "react";

const DynamicGrid = ({ gridElements }) => {
  console.log("gridElements--", gridElements);

  return (
    <div className="prompt_grid">
      {gridElements.map((elem) => {
        console.log("elem--", elem);
        let content;
        if (elem.type === "image") {
          content = (
            <img
              className="grid_img"
              src={elem.file}
              alt=""
              width="100%"
              height="100%"
            />
          );
        } else if (elem.type === "video") {
          content = (
            <video controls width="100%">
              <source
                src={elem.file}
                // type="video/webm"
              />
            </video>
          );
        } else if (elem.type === "audio") {
          content = (
            <audio controls src={elem.file} style={{ width: "20vw" }}></audio>
          );
        }

        return <div className="prompt_grid_item">{content}</div>;
      })}
    </div>
  );
};

export default DynamicGrid;
