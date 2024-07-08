import React, { useEffect, useState } from "react";
import { Card } from "./card";
import Payment_B from "./payment";
import { loadCart } from "./helper/carthelper";

const Cart = () => {
  const [products, setproducts] = useState([]);
  const [reload, setreload] = useState(false);
  useEffect(() => {
    setproducts(loadCart());
  }, [reload]);
  const loadAllProducts = (products) => {
    return (
      <>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            removeFromCart1={true}
            addtoCart={true}
            reload={reload}
            setReload={setreload}
          />
        ))}
      </>
    );
  };
  return (
    <>
      <div className="row text-center">
        <div className="col-4">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h4>No Product</h4>
          )}
        </div>
        <div className="col-4">
          {products.length > 0 ? (
            <Payment_B products={products} setReload={setreload} />
          ) : (
            <h4>Please Login Or Add Something in Cart</h4>
          )}
        </div>
      </div>
    </>
  );
};
export default Cart;
