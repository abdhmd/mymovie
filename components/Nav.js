import styles from "../styles/Nav.module.css";

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <h5 className={styles.logo}>
        <span>my</span>movie
      </h5>
      <div className={styles.navBtn}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={styles.navMenu}>
        <ul>
          <li>home</li>
          <li>about</li>
          <li>contact</li>
          <li>FAQ</li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
