import React from "react";

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <p>
        <span>React + TS Todo</span> &copy; 2023
      </p>
    </div>
  );
};

export default Footer;
