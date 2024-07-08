
export const create_order = async (userId, token, orderData) => {
  const formdata = new FormData();
  for (const name in orderData) {
    formdata.append(name, orderData[name]);
  }

  for (const entry of formdata.entries()) {
    console.log(`${entry[0]}: ${entry[1]}`);
  }

  try {
    const respo = await fetch(`http://127.0.0.1:8000/api/order/add/${userId}/${token}/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body:formdata,
    });
    console.log(respo);
    return await respo.json();
  } catch (err) {
    return console.log(err);
  }
};


