import React, { useEffect, useState } from "react";
import { cartempty } from "./helper/carthelper";
import { getmetoken, payment_process } from "./helper/paymenthelper";
import { create_order } from "./helper/orderhelper";
import { isAuthenticated, signout } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Payment_B = ({ products, reload = undefined, setReload = (f) => f }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    error: "",
    clientToken: null,
    instance: null,
  });

  const userId = isAuthenticated() && isAuthenticated().user.id;
  const token = isAuthenticated() && isAuthenticated().token;
  const navigate = useNavigate();

  useEffect(() => {
    const getAndSetToken = async () => {
      try {
        const response = await getmetoken(userId, token);
        console.log("responce: ", response);
        if (response.error) {
          throw new Error(response.error);
        }
        setInfo({ ...info, clientToken: response["Client Token"] });
      } catch (error) {
        console.error("Error fetching client token:", error);
        setInfo({ ...info, error: "Error fetching client token" });
      }
    };

    getAndSetToken();
  }, [userId, token]);

  const getAmount = () => {
    return products.reduce((total, p) => total + parseInt(p.price), 0);
  };

  const onPurchase = async () => {
    setInfo({ ...info, loading: true });

    if (!info.instance) {
      console.error("DropIn instance is not available");
      return;
    }

    try {
      const { nonce } = await info.instance.requestPaymentMethod();
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };

      console.log("Nonce:", nonce);

      const response = await payment_process(userId, token, paymentData);

      if (response.error) {
        console.error("Payment error:", response.error);

        if (response.code === "1") {
          signout(() => navigate("/signin"));
        }
      } else {
        setInfo({ ...info, success: response.success, loading: false });

        const productNames = products.map((item) => item.name).join(", ");
        const orderData = {
          products: products.map((item) => ({
            name: item.name,
            price: Number(item.price) || 0,
          })),
          productNames: productNames,
          transaction_id: response.transaction.id,
          amount: response.transaction.amount,
        };
        console.log(orderData.transaction_id);

        const generatePDF = (orderData) => {
          const doc = new jsPDF();
          const user = isAuthenticated().user;

          if (!user) {
            console.error("User is not authenticated");
            return;
          }

          doc.setFontSize(18);
          doc.text(`Order Receipt`, 105, 15, null, null, "center");

          doc.setLineWidth(0.5);
          doc.line(20, 20, 190, 20); // (x1, y1, x2, y2)

          // User Information
          doc.setFontSize(12);
          doc.text(`Name: ${user.name}`, 20, 30);
          doc.text(`Email: ${user.email}`, 20, 40);
          doc.text(`Phone: ${user.phone}`, 20, 50);

          //Date Format
          const formatDate = (date) => {
            const options = { day: "numeric", month: "long", year: "numeric" };
            return new Date(date).toLocaleDateString("en-US", options);
          };

          //Order Date
          const orderDate = formatDate(new Date());
          doc.text(`Order Date: ${orderDate}`, 150, 30);
          doc.text(`Transaction ID: ${orderData.transaction_id}`, 150, 40);

          // Products Table
          const products = orderData.products.map((product, index) => [
            index + 1,
            product.name,
            `$${product.price.toFixed(2)}`,
          ]);
          console.log(products);

          autoTable(doc, {
            startY: 70,
            head: [["No", "Product Name", "Price"]],
            body: products,
          });

          // Total Amount
          const totalPrice = orderData.products.reduce(
            (total, product) => total + product.price,
            0
          );
          doc.setFontSize(14);
          doc.setFont("helvetica", "bold");

          doc.text(
            `Total: $${totalPrice.toFixed(2)}`,
            165,
            doc.autoTable.previous.finalY + 10
          );

          doc.save("order_receipt.pdf");
          console.log("PDF generated successfully");
        };

        generatePDF(orderData);

        const orderResponse = await create_order(userId, token, orderData);
        console.log("order_resnpo; ", orderResponse);
        if (orderResponse.error) {
          console.error("Order creation failed:", orderResponse.error);

          if (orderResponse.code === "1") {
            signout(() => navigate("/signin"));
          }
        } else {
          if (orderResponse.success) {
            console.log("Order placed successfully!");
          }
        }

        cartempty(() => {
          console.log("Cart emptied successfully!");
        });

        setReload(!reload);
      }
    } catch (error) {
      setInfo({ success: false, loading: false });
      console.error("Payment process failed:", error);
    }
  };

  const showDropIn = () => {
    return (
      <>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => setInfo({ ...info, instance })}
            />
            <button type="button" className="btn btn-info" onClick={onPurchase}>
              Buy Now
            </button>
          </div>
        ) : (
          <h3>Please Login First Or Add something in the cart</h3>
        )}
      </>
    );
  };

  return (
    <>
      <h3>Your Bill is: {getAmount()}</h3>
      {showDropIn()}
    </>
  );
};
export default Payment_B;
