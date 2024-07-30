import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import Chart from "../chart/Chart";
import { useChartContext } from "../contexts/ChartContext";
import { useState } from "react";

function Header() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { chartData } = useChartContext();
  const totalItems = Object.values(chartData).reduce(
    (acc, curr) => acc + curr,
    0
  );

  const togglePopup = () => {
    setIsPopupOpen((prevIsPopupOpen) => !prevIsPopupOpen);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link to="/">
              <span class="material-icons">home</span>
            </Link>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </nav>
      <button
        className={`${styles.chartButton} ${isPopupOpen ? styles.active : ""}`}
        onClick={togglePopup}
      >
        <span
          className="material-icons"
          style={{ position: "relative", display: "inline-block" }}
        >
          shopping_cart
        </span>
        <span className={styles.badge}>{totalItems}</span>
      </button>
      <Chart open={isPopupOpen} />
    </header>
  );
}

export default Header;
