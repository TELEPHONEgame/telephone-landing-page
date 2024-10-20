import React from "react";

import styles from "./styles.module.scss";

export const SubmissionCountdown = () => {
  return (
    <div className={styles.root}>
      Your submission is due in:
      <div className={styles.timer}>
        <CountdownCell count={1} timeDenomination={"days"} />:
        <CountdownCell count={12} timeDenomination={"hours"} />:
        <CountdownCell count={2} timeDenomination={"mins"} />:
        <CountdownCell count={38} timeDenomination={"secs"} />:
      </div>
      <button>
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
      <div>{addZeroPlaceholder(count)}</div>
      <div>{timeDenomination}</div>
    </div>
  );
};
