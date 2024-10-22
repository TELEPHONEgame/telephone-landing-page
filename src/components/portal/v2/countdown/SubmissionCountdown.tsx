import React from "react";

import styles from "./styles.module.scss";

export const SubmissionCountdown = ({artistName}: {artistName: string}) => {
  return (
    <div className={styles.root}>
      {artistName}, your submission is due in:
      <div className={styles.timer}>
        <CountdownCell count={1} timeDenomination={"days"} />
        <div className={styles.colon}></div>
        <CountdownCell count={12} timeDenomination={"hours"} />
        <div className={styles.colon}></div>
        <CountdownCell count={2} timeDenomination={"mins"} />
        <div className={styles.colon}></div>
        <CountdownCell count={38} timeDenomination={"secs"} />
      </div>
      <button className={styles.extensionButton}>
        Request an extension
      </button>
    </div>
  );
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
