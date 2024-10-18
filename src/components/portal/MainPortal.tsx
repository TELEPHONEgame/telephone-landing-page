import React, { useEffect, useState } from "react";

import Header from "../common/Header";
import ArtistPrompt from "./ArtistPrompt";
import UploadArtwork from "./UploadArtwork";
import ArtworkInfo from "./ArtworkInfo";
import CountdownTimer from "./CountdownTimer";
import "../../styles/mainPortal.css";
import { Artist } from "./types";
import { Countdown } from "./types";
import LoadingOverlay from "./LoadingOverlay";

const MainPortal = () => {
  const [userName, setUserName] = useState("");
  const [artist, setArtist] = useState<Artist | null>(null);
  const [task, setTask] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // console.log("MainPortal countdown--", countdown);

  useEffect(() => {
    // console.log('hihihihi')
    if (false && (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost')) {
        setArtist({
            "id": 629,
            "first_name": "Benjamin",
            "last_name": "Sarsgard",
            "accepted": "2024-08-25T13:39:18Z",
            "rejected": null,
            "assigned": "2024-08-29T14:02:41.428999Z",
            "due": "2024-09-12T00:00:00Z",
            "completed": null,
            "parent": {
                "id": 471,
                "first_name": "Amanda",
                "last_name": "Manitach",
                "accepted": "2024-08-08T06:52:26Z",
                "rejected": null,
                "assigned": null,
                "due": null,
                "completed": "2024-08-08T10:44:57Z",
                "parent": null,
                "submissions": [
                    {
                        "id": 15,
                        "file": "https://storage.googleapis.com/telephone-2024.appspot.com/submissions/Battle-Furious.mp3",
                        "type": "audio"
                    },
                    {
                        "id": 16,
                        "file": "https://storage.googleapis.com/telephone-2024.appspot.com/submissions/2024-02-07_21-26-29.mp4",
                        "type": "video"
                    },
                    {
                        "id": 17,
                        "file": "https://storage.googleapis.com/telephone-2024.appspot.com/submissions/Snapshot_2_7-11-2023_11-54_AM.png",
                        "type": "image"
                    }
                ]
            },
            "submissions": [{
                "id": 17,
                "file": "https://storage.googleapis.com/telephone-2024.appspot.com/submissions/Snapshot_2_7-11-2023_11-54_AM.png",
                "type": "image"
            }]
        });
        return;
    }
    setIsLoading(true);
    const server_url = 'https://telephonegame.art/';
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
          setIsLoading(false);
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
              <a href="mailto:telephone.outreach@gmail.com?subject=I need more time" target="_blank">
                Need more time?
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
                3. Your Artist Bio - Coming Soon
              </button>
            </div>
          </div>
        </div>

        {/* Loading Overlay */}
        <LoadingOverlay isLoading={isLoading} />
      </>
    );
  };

  return (
    <div
      className={`main_section`} // should we keep this
      style={{ padding: "25px" }}
    >
      <Header
        title="TELEPHONE: Artist Portal"
      />
      {task === 0 ? renderWelcomePage() : null}
      {task === 1 && (<ArtistPrompt artist={artist} />)}
      {task === 2 && (<UploadArtwork artist={artist} />)}
      {task === 3 && <ArtworkInfo />}
    </div>
  );
};

export default MainPortal;
