import React, { useState } from "react";
import styles from "./PopupProductCard.module.css";
import { useChartContext } from "../contexts/ChartContext";

const PopupProductCard = ({ product, quantity }) => {
  const { chartData, addChart } = useChartContext();
  const [q, setQ] = useState(chartData[product.id] || 0);

  const handleAdd = () => {
    const newQuantity = quantity + 1;
    setQ(newQuantity); // Update the state with the new quantity value
    addChart(product.id, newQuantity); // Update the chartData with the new quantity
  };

  const handleRemove = () => {
    const newQuantity = Math.max(quantity - 1, 0);
    setQ(newQuantity); // Update the state with the new quantity value
    addChart(product.id, newQuantity); // Update the chartData with the new quantity
  };

  return (
    <div className={styles.card}>
      <img
        src={product.thumbnail}
        alt={product.title}
        className={styles.image}
      />
      <div className={styles.details}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.price}>Price: ${product.price}</p>
        <div className={styles.quantity}>
          <button className={styles.button} onClick={handleRemove}>
            -
          </button>
          <span className={styles.quantityValue}>{quantity}</span>
          <button className={styles.button} onClick={handleAdd}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupProductCard;
