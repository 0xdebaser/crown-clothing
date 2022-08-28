import { useContext } from "react";

import "./shop.styles.scss";

import { ProductsContext } from "../../contexts/products.context";
import ProductCard from "../../components/product-card/product-card.component";

function Shop() {
  const { productsArray } = useContext(ProductsContext);

  return (
    <div className="products-container">
      {Array.isArray(productsArray) &&
        productsArray.length > 0 &&
        productsArray.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
    </div>
  );
}

export default Shop;
