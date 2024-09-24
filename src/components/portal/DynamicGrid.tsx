import React, { useEffect, useState } from "react";

const DynamicGrid = ({ gridElements }) => {
  console.log("gridElements--", gridElements);
  const [isModalOpen, setModalOpen] = useState(false);

  // Function to handle the opening of the modal
  const openModal = () => setModalOpen(true);

  // Function to handle the closing of the modal
  const closeModal = () => setModalOpen(false);

  return (
    <div className="prompt_grid">
      {gridElements && gridElements.map((elem) => {
        console.log("elem--", elem);
        let content;
        if (elem.type === "image") {
          /*
          if (isModalOpen) {
            content = (
              <div
                className="modal"
                onClick={closeModal}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1000
                }}
              >
                <img
                  src={elem.file}
                  alt="Full-screen"
                  style={{
                    maxWidth: '90%',
                    maxHeight: '90%',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
                  }}
                />
              </div>
            )
          } else {
            content = (
              <img
                className="grid_img"
                onClick={openModal}
                src={elem.file}
                alt=""
                width="100%"
                height="100%"
              />
            );
          }
          */
          content = (
            <div>Image File</div>
          )
        } else if (elem.type === "video") {
          /*
          content = (
            <video controls width="100%">
              <source
                src={elem.file}
                // type="video/webm"
              />
            </video>
          );
          */
          content = (
            <div>Video File</div>
          )
        } else if (elem.type === "audio") {
          /*
          content = (
            <audio controls src={elem.file} style={{ width: "20vw" }}></audio>
          );
          */
          content = (
            <div>Audio File</div>
          )
        } else {
          content = (
            <div>{elem.file}</div>
          )
        }
        const download = (
          <a
            className="grid_icon"
            href={elem.file}
            download
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '50%',
              padding: '5px',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            }}
          >
            {/* Simple Unicode download icon; you can replace this with an actual icon if needed */}
            {/*⬇️*/}
            Download Art
          </a>
        );
        const order = elem.order ? (
          <div
            className="grid_label"
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              padding: '5px',
            }}
          >{["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth", "Tenth"][elem.order]} {elem.type}</div>
        ) : "";

        return <div className="prompt_grid_item" key={elem.id}>{order}{content}{download}</div>;
      })}
    </div>
  );
};

export default DynamicGrid;
