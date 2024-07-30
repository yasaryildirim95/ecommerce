import React, { useState, useEffect } from "react";
import styles from "./ProductCard.module.css";
import { useChartContext } from "../contexts/ChartContext";

const ProductCard = ({ product }) => {
  const { chartData, addChart } = useChartContext();
  const [quantity, setQuantity] = useState(chartData[product.id] || 0);

  // Update the quantity state whenever chartData changes
  useEffect(() => {
    setQuantity(chartData[product.id] || 0);
  }, [chartData, product.id]);

  const handleAdd = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    addChart(product.id, newQuantity);
  };

  const handleRemove = () => {
    const newQuantity = Math.max(quantity - 1, 0);
    setQuantity(newQuantity);
    addChart(product.id, newQuantity);
  };

  return (
    <div className={styles.card}>
      <img
        src={product.thumbnail}
        alt={product.title}
        className={styles.image}
      />
      <div className={styles.details}>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>Price: ${product.price}</p>
        <p className={styles.rating}>Rating: {product.rating}</p>
        <div className={styles.quantity}>
          {quantity > 0 && (
            <button onClick={handleRemove} disabled={quantity === 0}>
              -
            </button>
          )}
          {quantity > 0 && <span>{quantity}</span>}
          <button onClick={handleAdd}>+</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
