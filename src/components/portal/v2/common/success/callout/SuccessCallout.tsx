import React from "react";
import styles from "./styles.module.scss";

const SuccessCallout = (props: React.PropsWithChildren) => (
  <div className={styles.successCallout}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect
        x="0.75"
        y="0.75"
        width="22.5"
        height="22.5"
        rx="11.25"
        stroke="white"
        strokeWidth="1.5"
      />
      <path
        d="M8.55353 15.9464L5.49877 12.8916C5.33429 12.7268 5.111 12.6341 4.87813 12.6341C4.64527 12.6341 4.42197 12.7268 4.2575 12.8916C3.91417 13.235 3.91417 13.7896 4.2575 14.1329L7.93729 17.8127C8.28063 18.156 8.83524 18.156 9.17857 17.8127L18.4925 8.49876C18.8358 8.15543 18.8358 7.60082 18.4925 7.25749C18.328 7.09264 18.1047 7 17.8719 7C17.639 7 17.4157 7.09264 17.2512 7.25749L8.55353 15.9464Z"
        fill="white"
      />
    </svg>
    {props.children}
  </div>
);

export const submittedCallout = (
  <SuccessCallout>
    Success, you have submitted your artwork! You can make changes until your
    artwork is assigned to the next artist.
  </SuccessCallout>
);

export const assignedCallout = (
  <SuccessCallout>
    Congratulations! Your artwork was accepted and passed on to a new artist.
  </SuccessCallout>
);

export default SuccessCallout;
