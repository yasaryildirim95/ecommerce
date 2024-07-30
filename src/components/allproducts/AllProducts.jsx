import Header from "../header/Header";
import ProductCard from "../productcard/ProductCard";
import styles from "./AllProducts.module.css";
import { useApi } from "../contexts/ApiContext";
import { useEffect } from "react";

const AllProducts = () => {
  const { allproducts, getAllProducts } = useApi();

  useEffect(() => {
    getAllProducts(); // Fetch all products when the component mounts
  }, []);

  return (
    <>
      <Header />
      <h1>All Products</h1>
      <div className={styles.container}>
        <ul>
          {allproducts.map((product) => (
            <li>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AllProducts;
