import React, { useEffect, useState } from "react";
import {Countdown} from "../../types";

import styles from "./styles.module.scss";

export const SubmissionCountdown = ({artist}) => {
  const {due: dueDate, first_name: firstName} = artist;
  const dueDateMs = new Date(dueDate).getTime();

  const [timeLeftMs, setTimeLeftMs] = useState<number|null>(null);

  useEffect(() => {
    setTimeLeftMs(calculateTimeLeftMs(dueDateMs));
    // Every second, recalculate and set time left until due date.
    const interval = setInterval(() => {
      const timeLeftMs = calculateTimeLeftMs(dueDateMs);
      setTimeLeftMs(timeLeftMs);
      // Stop when time left reaches 0.
      if (timeLeftMs === 0) {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [dueDateMs]);

  return (
    <div className={styles.root}>
      {firstName}, your submission is due in:
      <TimeLeftDisplay timeLeftMs={timeLeftMs} />
      <button className={styles.extensionButton}>
        Request an extension
      </button>
    </div>
  );
};

const TimeLeftDisplay = ({timeLeftMs}: {timeLeftMs: number}) => {
  const countdown: Countdown = {
    days: Math.floor(timeLeftMs / (1000 * 60 * 60 * 24)),
    hours: Math.floor((timeLeftMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    mins: Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60)),
    secs: Math.floor((timeLeftMs % (1000 * 60)) / 1000),
  };

  return (
    <div className={styles.timer}>
      <CountdownCell count={countdown?.days ?? 0} timeDenomination={"days"} />
      <div className={styles.colon}></div>
      <CountdownCell count={countdown?.hours ?? 0} timeDenomination={"hours"} />
      <div className={styles.colon}></div>
      <CountdownCell count={countdown?.mins ?? 0} timeDenomination={"mins"} />
      <div className={styles.colon}></div>
      <CountdownCell count={countdown?.secs ?? 0} timeDenomination={"secs"} />
    </div>
  )
};

const CountdownCell = ({count, timeDenomination}) => {
  // Adds a 0 placeholder in front of single digit values.
  function addZeroPlaceholder(value: number): string {
    return String(value).length === 1 ? `0${value}` : String(value);
  }

  return (
    <div className={styles.cell}>
      <div className={styles.value}>{addZeroPlaceholder(count)}</div>
      <div className={styles.denomination}>{timeDenomination}</div>
    </div>
  );
};

function calculateTimeLeftMs(dueDateMs: number) {
  const timeLeftMs = dueDateMs - new Date().getTime();
  // Don't let the time left go negative.
  return Math.max(timeLeftMs, 0);
};