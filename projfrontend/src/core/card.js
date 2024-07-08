import React from "react";
import ImageHelper from "./helper/imagehelper";
import { Navigate, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { useState } from "react";
import { additemtoCart, removeitemCart } from "./helper/carthelper";
export const Card = ({
  product,
  addtoCart = true,
  removeFromCart1 = false,
  reload = undefined,
  setreload = (f) => f,
}) => {
  const [redirect, setredirect] = useState(false);
  const cartTitle = product ? product.name : "A photo from pexels";
  const cartDescription = product ? product.description : "Default description";
  const cartPrice = product ? product.price : "Default";
  const navigate=useNavigate()
  const addToCart = () => {
    if (isAuthenticated()) {
      // addToCart(product, () => setRedirect(true));
      additemtoCart(product, () => setredirect(true));
      console.log("Added to cart");
    } else {
      console.log("Login Please!");
    }
  };

  const removeFromCart = () => {
    if (removeFromCart1) {
      // addToCart(product, () => setRedirect(true));
      console.log("Remove to cart");
    } else {
      console.log("Login Please!");
    }
  };
  const getAredirect = (redirect) => {
    if (redirect) {
      return navigate('/cart');
    }
  };

  const showAddToCart = (addToCart) => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeitemCart(product.id);
            setreload(!reload)
            console.log("product removed");
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove From Cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border m-4">
      <div className="card-header lead">{cartTitle}</div>
      <div className="card-body">
        <div className="rounded border border-success p-2">
          {getAredirect(redirect)}
          <ImageHelper productId={product.id} />
        </div>
        <br />
        <p className="font-weight-normal text-wrap">{cartDescription}</p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {cartPrice}</p>
        <div className="row">
          <div className="col-12 btn">
            {showAddToCart(addToCart)}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {showRemoveFromCart(removeFromCart)}
          </div>
        </div>
      </div>
    </div>
  );
};
