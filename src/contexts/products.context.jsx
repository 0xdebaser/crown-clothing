import { createContext, useState, useEffect } from "react";

import PRODUCTS_DATA from "../shop-data.json";

export const ProductsContext = createContext({
  productsArray: [],
  setProductsArray: () => null,
});

export function ProductsProvider({ children }) {
  const [productsArray, setProductsArray] = useState(null);
  const value = { productsArray, setProductsArray };

  useEffect(() => {
    if (PRODUCTS_DATA) {
      setProductsArray(PRODUCTS_DATA);
    }
  }, []);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}
