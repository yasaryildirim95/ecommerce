import React, { useState, useEffect } from "react";
import { useChartContext } from "../contexts/ChartContext";
import { useApi } from "../contexts/ApiContext";
import PopupProductCard from "../popupproductcard/PopupProductCard";
import styles from "./Chart.module.css"; // Import CSS styles

const Chart = ({ open }) => {
  const { chartData, addChart } = useChartContext();
  const { allproducts, getAllProducts } = useApi();
  const [productQuantityArray, setProductQuantityArray] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    const newProductQuantityArray = Object.entries(chartData).map(
      ([productId, quantity]) => {
        return { productId: parseInt(productId), quantity };
      }
    );
    setProductQuantityArray(newProductQuantityArray);
  }, [chartData]);

  const findProductById = (productId) => {
    return allproducts.find((product) => product.id === productId);
  };

  const calculateTotalPrice = () => {
    let total = 0;
    for (const p of productQuantityArray) {
      const product = findProductById(p.productId);
      total += product.price * p.quantity;
    }
    return total.toFixed(2);
  };

  const handleRemoveProduct = (productId) => {
    addChart(productId, 0);
  };

  const resetCart = () => {
    Object.keys(chartData).forEach((productId) => {
      addChart(productId, 0);
    });
  };

  return (
    <div
      className={`${styles.popup} ${styles.popupContent}`}
      style={{ left: open ? "calc(100% - 380px)" : "calc(100% + 20px)" }}
    >
      {productQuantityArray.map(({ productId, quantity }) => {
        const product = findProductById(productId);
        if (product && quantity > 0) {
          return (
            <PopupProductCard
              key={product.id}
              product={product}
              quantity={quantity}
              onRemove={() => handleRemoveProduct(productId)}
            />
          );
        } else {
          return null;
        }
      })}
      <div className={styles.totalPrice}>
        Total Price: ${calculateTotalPrice()}
      </div>
      <button onClick={resetCart}>Satın Al</button>
    </div>
  );
};

export default Chart;
