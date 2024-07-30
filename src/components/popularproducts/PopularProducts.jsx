import ProductCard from "../productcard/ProductCard";
import styles from "./PopularProducts.module.css";

const PopularProducts = ({ populars }) => {
  return (
    <>
      <h1>Popular Products</h1>
      <div className={styles.container}>
        <ul>
          {populars.map((product) => (
            <li>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PopularProducts;
