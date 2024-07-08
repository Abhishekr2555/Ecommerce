import { useState, useEffect } from "react";
import "../style.css";
import { Card } from "./card.js";

export default function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/product/")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setProduct(result); 
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Home</div>;
  } else {
    return (
      <>
  
       <div className="row">
        {Array.isArray(product) && product.map((product, index) => {
          return (
            <div key={index} className="col-4 mb-4">
              <Card product={product} />
            </div>
          );
        })}
      </div>
      </>
    );
  }
}


