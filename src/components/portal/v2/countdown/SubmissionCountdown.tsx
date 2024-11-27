import React from "react";
import {Countdown} from "../../types";

import styles from "./styles.module.scss";

export const SubmissionCountdown = ({
  firstName,
  timeLeftMs
}: {
  firstName: string,
  timeLeftMs: number
}) => {
  const errorCallout = (
    <div className={styles.errorCallout}>
      <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.0027 7.99923V11.9992M12.0027 15.9992H12.0127M10.2927 2.85923L1.82271 16.9992C1.64807 17.3017 1.55567 17.6445 1.5547 17.9937C1.55372 18.343 1.6442 18.6864 1.81713 18.9898C1.99007 19.2931 2.23943 19.546 2.54041 19.7231C2.8414 19.9002 3.18351 19.9954 3.53271 19.9992H20.4727C20.8219 19.9954 21.164 19.9002 21.465 19.7231C21.766 19.546 22.0153 19.2931 22.1883 18.9898C22.3612 18.6864 22.4517 18.343 22.4507 17.9937C22.4497 17.6445 22.3573 17.3017 22.1827 16.9992L13.7127 2.85923C13.5344 2.56533 13.2834 2.32235 12.9839 2.15371C12.6844 1.98508 12.3464 1.89648 12.0027 1.89648C11.659 1.89648 11.321 1.98508 11.0215 2.15371C10.722 2.32235 10.471 2.56533 10.2927 2.85923Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      You have run out of time. Please request an extension.
    </div>
  );

  return (<>
    {timeLeftMs === 0 ? errorCallout : null}
    <div className={`${styles.timer} ${timeLeftMs === 0 ? styles.expired : ''}`}>
      {firstName}, your submission is due in:
      <TimeLeftDisplay timeLeftMs={timeLeftMs} />
      <a href="mailto:telephone.outreach@gmail.com?subject=I need more time"
         target="_blank"
         className={styles.extensionButton}
      >
        Request an extension
      </a>
    </div>
  </>);
};

const TimeLeftDisplay = ({timeLeftMs}: {timeLeftMs: number}) => {
  const countdown: Countdown = {
    days: Math.floor(timeLeftMs / (1000 * 60 * 60 * 24)),
    hours: Math.floor((timeLeftMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    mins: Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60)),
    secs: Math.floor((timeLeftMs % (1000 * 60)) / 1000),
  };

  return (
    <div className={styles.timeDisplay}>
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