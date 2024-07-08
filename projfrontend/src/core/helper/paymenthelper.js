
export const getmetoken = async (userId, token) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/payment/gettoken/${userId}/${token}/`,
      {
        method: "GET",
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching token:", error);
    return { error: "Error fetching token" };
  }
};

function getCsrfToken() {
  const csrfCookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("Client Token"));

  if (csrfCookie) {
    return csrfCookie.split("=")[1];
  }
  return null;
}

export const payment_process = async (userId, token, paymentData) => {
  const formData = new FormData();
  for (const key in paymentData) {
    formData.append(key, paymentData[key]);
  }

  for (const [key, value] of formData.entries()) {
    console.log("*****->", key, value);
  }

  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/payment/process/${userId}/${token}/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    console.log(response);

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Payment process failed:", error);
    return { error: "Payment process failed" };
  }
};
