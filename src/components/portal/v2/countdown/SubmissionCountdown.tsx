import React, { useEffect, useState } from "react";
import {Artist, Countdown} from "../../types";

import styles from "./styles.module.scss";

export const SubmissionCountdown = ({artist}) => {
  const {due: dueDate, first_name: firstName} = artist;
  return (
    <div className={styles.root}>
      {firstName}, your submission is due in:
      <CountdownTimer targetDateTime={dueDate} />
      <button className={styles.extensionButton}>
        Request an extension
      </button>
    </div>
  );
};

const CountdownTimer = ({targetDateTime}: {targetDateTime: string}) => {
  const [countdown, setCountdown] = useState<Countdown | null>(null);

  const refreshCountdown = () => {
    const targetMs = new Date(targetDateTime).getTime();
    const timeLeftMs = targetMs - new Date().getTime();

    if (timeLeftMs > 0) {
      setCountdown({
        days: Math.floor(timeLeftMs / (1000 * 60 * 60 * 24)),
        hours: Math.floor((timeLeftMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((timeLeftMs % (1000 * 60)) / 1000),
      });
      return true;
    } else {
      setCountdown({days: 0, hours: 0, mins: 0, secs: 0});
      return false;
    }
  }

  useEffect(() => {
    refreshCountdown();
    const interval = setInterval(() => {
      const shouldContinueTimer = refreshCountdown();
      if (!shouldContinueTimer) {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDateTime]);

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
