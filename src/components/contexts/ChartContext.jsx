import React, { createContext, useContext, useState } from "react";

const ChartContext = createContext();

export const ChartProvider = ({ children }) => {
  const [chartData, setChartData] = useState({});

  const updateChartData = (newData) => {
    setChartData(newData);
  };

  const addChart = (productId, quantity) => {
    setChartData((prevData) => ({ ...prevData, [productId]: quantity }));
  };

  return (
    <ChartContext.Provider value={{ chartData, updateChartData, addChart }}>
      {children}
    </ChartContext.Provider>
  );
};

export const useChartContext = () => useContext(ChartContext);
