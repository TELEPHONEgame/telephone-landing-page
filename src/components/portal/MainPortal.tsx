import React, { useEffect, useState } from "react";

import Header from "../common/Header";
import ArtistPrompt from "./ArtistPrompt";
import UploadArtwork from "./UploadArtwork";
import ArtworkInfo from "./ArtworkInfo";
import CountdownTimer from "./CountdownTimer";
import "../../styles/mainPortal.css";
import { Artist } from "./types";
import { Countdown } from "./types";

const MainPortal = ({ page }) => {
  const [userName, setUserName] = useState("");
  const [artist, setArtist] = useState<Artist | null>(null);
  const [task, setTask] = useState(0);
  // console.log("MainPortal countdown--", countdown);

  useEffect(() => {
    console.log('hihihihi')
    const server_url = window.location.hostname === 'localhost' ? 'http://localhost:8000/' : 'https://telephonegame.art/';
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    const headers = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Token ${token}`;
    }
    fetch(`${server_url}api/artists/me/`, {
        method: 'GET',
        headers: headers,
        credentials: 'include', // This sends cookies with the request
        })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();  // Parse JSON response
      })
      .then((data: Artist) => {
        setArtist(data);  // Update state with the fetched artist data
      })
      .catch((error) => {
        console.error('Error fetching artist data:', error);
      });
  }, []);

  useEffect(() => {
      if (artist) {
          const userName = artist.first_name + " " + artist.last_name;
          setUserName(userName);
      }
  }, [artist]);

  const renderWelcomePage = () => {
    return (
      <>
        <div className="main_portal_box">
          <div style={{ fontSize: "32px" }}>Welcome {userName}!</div>
            <CountdownTimer artist={artist} />

            <p
              style={{
                fontSize: "14px",
                fontStyle: "italic",
                // textDecoration: "underline",
              }}
              className="onhover_pointer"
            >
              <a href="" target="_blank">
                Need an extension?
              </a>
            </p>
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
      {task === 1 && (<ArtistPrompt artist={artist} />)}
      {task === 2 && <UploadArtwork />}
      {task === 3 && <ArtworkInfo />}
    </div>
  );
};

export default MainPortal;
