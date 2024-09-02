import React, { useEffect, useState } from "react";
import { Countdown } from "./types";


const CountdownTimer = ({artist}) => {
    // console.log("countdown page--");
    const [countdown, setCountdown] = useState<Countdown | null>(null);

    const refreshCountdown = () => {
      // Target UTC datetime string
      const targetDateTime: string = artist.due;
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
      const countdownObj: Countdown = {
          days: days,
          hours: hours,
          mins: minutes,
          secs: seconds,
      };

      setCountdown(countdownObj);
    }

    useEffect(() => {
      if (artist) {
          refreshCountdown();
          const interval = setInterval(refreshCountdown, 1000);

          return () => clearInterval(interval);
      }
    }, [artist]);

    return (
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
                  {countdown ? countdown.days : "00"}
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
                  {countdown ? countdown.hours : "00"}
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
                  {countdown ? countdown.mins : "00"}
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
                  {countdown ? countdown.secs : "00"}
                </div>
                <div
                  className="grid_child"
                  // style={{ position: "absolute", top: "60%", left: "50%" }}
                >
                  secs
                </div>
              </div>
            </div>
          </div>
    );
  };

export default CountdownTimer;