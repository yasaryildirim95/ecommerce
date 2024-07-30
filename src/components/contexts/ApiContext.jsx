import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const ApiContext = createContext();

export const useApi = () => useContext(ApiContext);

export const ApiProvider = ({ children }) => {
  const examples = [
    {
      image:
        "https://cdn.shopify.com/s/files/1/0070/7032/files/image5_4578a9e6-2eff-4a5a-8d8c-9292252ec848.jpg?v=1620247043",
      title: "Product 1",
      description: "Description for Product 1",
    },
    {
      image: "https://www.helium10.com/app/uploads/2020/04/vit-c.jpg",
      title: "Product 2",
      description: "Description for Product 2",
    },
    {
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
      title: "Product 3",
      description: "Description for Product 3",
    },
    {
      image:
        "https://expertphotography.b-cdn.net/wp-content/uploads/2018/09/product-photography-types-water-bottle.jpg",
      title: "Product 4",
      description: "Description for Product 4",
    },
    {
      image:
        "https://govisually.com/wp-content/uploads/2023/03/use-bokeh-for-product-photography.png",
      title: "Product 5",
      description: "Description for Product 5",
    },
  ];
  const [allproducts, setAllProducts] = useState([]);
  const [topproducts, setTopProducts] = useState([]);

  const getPopularProducts = () => {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        const filteredProducts = response.data.products.filter(
          (product) => product.rating > 4.5
        );
        setTopProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getAllProducts = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      setAllProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <ApiContext.Provider
      value={{
        topproducts,
        getPopularProducts,
        examples,
        getAllProducts,
        allproducts,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
