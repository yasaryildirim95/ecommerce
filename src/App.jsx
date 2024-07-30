import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApiProvider, useApi } from "./components/contexts/ApiContext";
import AllProducts from "./components/allproducts/AllProducts";
import Home from "./components/home/Home";

function App() {
  const [products, setProducts] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  const {
    topproducts,
    getPopularProducts,
    examples,
    getAllProducts,
    allProducts,
  } = useApi();

  return (
    <ApiProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home examples={examples} topproducts={topproducts} />}
          />
          <Route path="/products" element={<AllProducts />} />
        </Routes>
      </Router>
    </ApiProvider>
  );
}

export default App;
