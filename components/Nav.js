import styles from "../styles/Nav.module.css";
import { useState } from "react";

const Nav = () => {
  const [openNav, setOpenNav] = useState(false);
  return (
    <nav className={styles.nav}>
      <h5 className={styles.logo}>
        <span>my</span>movie
      </h5>
      <div
        className={styles.navBtn}
        onClick={() => {
          setOpenNav(!openNav);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div
        className={styles.navMenu}
        style={{ height: openNav && "max-content" }}
      >
        <ul>
          <li>
            <a href="/">home</a>
          </li>
          <li>
            <a
              href="https://www.omdbapi.com/"
              target="_"
              onClick={() => {
                setOpenNav(!openNav);
              }}
            >
              api
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
