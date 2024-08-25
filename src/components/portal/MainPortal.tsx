import React, { useEffect, useState } from "react";

import Header from "../common/Header";
import ArtistPrompt from "./ArtistPrompt";
import UploadArtwork from "./UploadArtwork";
import ArtworkInfo from "./ArtworkInfo";
// import ProgressBar from "../common/ProgressBar";
import "../../styles/mainPortal.css";

const MainPortal = ({ page }) => {
  const [userName, setUserName] = useState("");
  const [countdown, setCountdown] = useState(null);
  const [task, setTask] = useState(0);
  // console.log("MainPortal countdown--", countdown);

  useEffect(() => {
    console.log("Set username and countdown...");
    const data = {
      id: 629,
      first_name: "Benjamin",
      last_name: "Sarsgard",
      accepted: "2024-09-25T13:39:18Z",
    };
    const userName = data.first_name + " " + data.last_name;
    setUserName(userName);

    const interval = setInterval(() => {
      // Target UTC datetime string
      const targetDateTime: string = data.accepted;
      // Parse the target datetime string into a Date object
      const targetDate: Date = new Date(targetDateTime);
      // Get the current time
      const now: Date = new Date();
      // Calculate the difference in milliseconds
      const differenceInMs: number = targetDate.getTime() - now.getTime();
      // Calculate the difference in days, hours, minutes, and seconds
      const days: number = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
      const hours: number = Math.floor(
        (differenceInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes: number = Math.floor(
        (differenceInMs % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds: number = Math.floor((differenceInMs % (1000 * 60)) / 1000);
      const countdownObj = {
        days: days,
        hours: hours,
        mins: minutes,
        secs: seconds,
      };

      setCountdown(countdownObj);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const renderWelcomePage = () => {
    return (
      <>
        <div className="main_portal_box">
          <div style={{ fontSize: "32px" }}>Welcome {userName}!</div>
          <div className="inner_box">
            <p style={{ fontSize: "14px" }}>Your submission is due in:</p>

            <div className="square_grid">
              <div
                className="grid_item"
                // style={{ position: "relative" }}
              >
                <div
                  className="grid_child"
                  // style={{ position: "absolute", top: "30%", left: "30%" }}
                >
                  {countdown ? countdown.days : null}
                </div>
                <div
                  className="grid_child"
                  // style={{ position: "absolute", top: "60%", left: "50%" }}
                >
                  days
                </div>
              </div>

              <div className="grid_separator">:</div>

              <div
                className="grid_item"
                // style={{ position: "relative" }}
              >
                <div
                  className="grid_child"
                  // style={{ position: "absolute", top: "30%", left: "50%" }}
                >
                  {countdown ? countdown.hours : null}
                </div>
                <div
                  className="grid_child"
                  // style={{ position: "absolute", top: "60%", left: "50%" }}
                >
                  hours
                </div>
              </div>
              <div className="grid_separator">:</div>
              <div
                className="grid_item"
                // style={{ position: "relative" }}
              >
                <div
                  className="grid_child"
                  // style={{ position: "absolute", top: "30%", left: "50%" }}
                >
                  {countdown ? countdown.mins : null}
                </div>
                <div
                  className="grid_child"
                  // style={{ position: "absolute", top: "60%", left: "50%" }}
                >
                  mins
                </div>
              </div>
              <div className="grid_separator">:</div>
              <div
                className="grid_item"
                // style={{ position: "relative" }}
              >
                <div
                  className="grid_child"
                  // style={{ position: "absolute", top: "30%", left: "50%" }}
                >
                  {countdown ? countdown.secs : null}
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
        <div
        // style={{ paddingBottom: '15%'}}
        >
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
      style={{ padding: "25px" }}
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
