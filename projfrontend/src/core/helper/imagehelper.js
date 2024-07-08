import React, { useState, useEffect } from "react";
import axios from "axios";

const ImageHelper = ({ productId }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchProductImage = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/product/");
        const products = response.data;
        const product = products.find((product) => product.id === productId);

        if (product && product.img) {
          setImageUrl(product.img);
        } else {
          throw new Error(
            `Image URL not found for product with ID ${productId}`
          );
        }
      } catch (error) {
        console.error("Error fetching image:", error);
        setImageUrl(
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXoQHUNR2UWupDDinNBfsee9XzfIw-NOFZvjOOSZ7bCfeVhYYGOgmas0_Brq4SixhhW_w&usqp=CAU"
        );
      }
    };

    fetchProductImage();
  }, [productId]);
  return (
    <div
     className="image-container d-flex justify-content-center align-items-center"
      style={{ width: "60%", height: "200px", overflow: "hidden"}}
    >
      <img
        src={imageUrl}
        style={{ width: "100%", height: "100%", objectFit: "hidden" }}
        className="mb-3 rounded"
        alt=""
      />
    </div>
  );
};

export default ImageHelper;
