import React, { useState } from "react";
import styles from "./styles.module.scss";

interface PortalAccordionProps extends React.PropsWithChildren {
  readonly title: string;
}

const PortalAccordion = ({ children, title }: PortalAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.root}>
      <button className={styles.toggle} onClick={toggleOpen}>
        <h2 className={styles.title}>{title}</h2>

        <svg
          className={isOpen ? styles.toggleIconOpen : styles.toggleIconClosed}
          height="10"
          viewBox="0 0 16 10"
          width="16"
        >
          <path d="M2.83019 0.999375L8.00352 6.17271L13.1769 0.999375C13.6969 0.479375 14.5369 0.479375 15.0569 0.999375C15.5769 1.51937 15.5769 2.35938 15.0569 2.87937L8.93686 8.99938C8.41686 9.51937 7.57686 9.51937 7.05686 8.99938L0.936856 2.87937C0.687186 2.63027 0.546875 2.29207 0.546875 1.93938C0.546875 1.58668 0.687186 1.24848 0.936856 0.999375C1.45686 0.492708 2.31019 0.479375 2.83019 0.999375Z" />
        </svg>
      </button>
      {isOpen ? <div className={styles.content}>{children}</div> : null}
    </div>
  );
};

export default PortalAccordion;
