import React, { useEffect, useState } from "react";

import Header from "../common/Header";
import ArtistPrompt from "./ArtistPrompt";
import UploadArtwork from "./UploadArtwork";
import ArtworkInfo from "./ArtworkInfo";
// import ProgressBar from "../common/ProgressBar";
import "../../styles/mainPortal.css";

const MainPortal = ({ page }) => {
  const [userName, setUserName] = useState("");
  const [countdown, setCountdown] = useState("");
  const [task, setTask] = useState(0);
  console.log("MainPortal page--", page);

  useEffect(() => {
    console.log("Set username and countdown...");
    setUserName("User");
  }, []);

  const renderWelcomePage = () => {
    return (
      <>
        <div className="main_portal_box">
          <div style={{ fontSize: "32px" }}>Welcome {userName}!</div>
          <div className="inner_box">
            <p style={{ fontSize: "14px" }}>Your submission is due in:</p>

            <div className="square_grid" style={{ padding: '10px'}}>
              <div
                className="grid_item"
                // style={{ position: "relative" }}
              >
                <div
                  className="grid_child"
                  // style={{ position: "absolute", top: "30%", left: "30%" }}
                >
                  06
                </div>
                <div
                  className="grid_child"
                  // style={{ position: "absolute", top: "60%", left: "50%" }}
                >
                  days
                </div> 
              </div>
              <div
                className="grid_item"
                // style={{ position: "relative" }}
              >
                <div
                  className="grid_child"
                  // style={{ position: "absolute", top: "30%", left: "50%" }}
                >
                  05
                </div>
                <div
                  className="grid_child"
                  // style={{ position: "absolute", top: "60%", left: "50%" }}
                >
                  hours
                </div>
              </div>
              <div
                className="grid_item"
                // style={{ position: "relative" }}
              >
                <div
                  className="grid_child"
                  // style={{ position: "absolute", top: "30%", left: "50%" }}
                >
                  11
                </div>
                <div
                  className="grid_child"
                  // style={{ position: "absolute", top: "60%", left: "50%" }}
                >
                  mins
                </div>
              </div>
              <div
                className="grid_item"
                // style={{ position: "relative" }}
              >
                <div
                  className="grid_child"
                  // style={{ position: "absolute", top: "30%", left: "50%" }}
                >
                  43
                </div>
                <div
                  className="grid_child"
                  // style={{ position: "absolute", top: "60%", left: "50%" }}
                >
                  secs
                </div>
              </div>
            </div>

            <p
              style={{
                fontSize: "14px",
                fontStyle: "italic",
                textDecoration: "underline",
              }}
              className="onhover_pointer"
            >
              Need an extension?
            </p>
          </div>
        </div>
        <div>
          <div style={{ fontSize: "32px" }}>Tasks:</div>
          <div className="inner_box">
            <p style={{ fontSize: "14px" }}>
              There are 3 things that we need from you.
            </p>
            <div>
              <p style={{ fontSize: "14px" }}>Active task(s):</p>
              <button
                className="art_form_btn main_portal_btn"
                style={{ display: "block" }}
                onClick={() => setTask(1)}
              >
                1. View your artistic prompt
              </button>
              <button
                className="art_form_btn main_portal_btn"
                style={{ display: "block" }}
                onClick={() => setTask(2)}
              >
                2. Upload your artwork response
              </button>
              <button
                className="art_form_btn main_portal_btn"
                style={{ display: "block" }}
                onClick={() => setTask(3)}
              >
                3. Fill out your artwork information
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div
      className={`main_section`} // should we keep this
      style={{ padding: '25px'}}
    >
      <Header
        displayFaq={null}
        setDisplayFaq={null}
        step={null}
        page={page}
        task={task}
        setTask={setTask}
      />
      {task === 0 ? renderWelcomePage() : null}
      {task === 1 && <ArtistPrompt />}
      {task === 2 && <UploadArtwork />}
      {task === 3 && <ArtworkInfo />}
    </div>
  );
};

export default MainPortal;
