import { API } from "../../backend";


export const signup = async (user) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/user/", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}. Message: ${errorText}`);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

export const signin = async (user) => {
  const formData = new FormData();

  for (const name in user) {
    console.log(user[name]);
    formData.append(name, user[name]);
  }
  for (var key of formData.keys()) {
    // console.log("MYKEY: ", key);
  }

  try {
    const response = await fetch("http://127.0.0.1:8000/api/user/login/", {
      method: "POST",

      body: formData,
    });
    console.log("SUCCESS", response);
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const authenticate = (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window === undefined) {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const signout = (next) => {
  const userId = isAuthenticated() && isAuthenticated().user.id;
  console.log("USERID: ", userId);

  if (typeof window !== undefined) {
    localStorage.removeItem("jwt");

    return fetch(`${API}user/logout/${userId}`, {
      method: "GET",
    })
      .then((response) => {
        console.log("Signout success");
      })
      .catch((err) => console.log(err));
  }
};

const csrfToken = getCookie('jwt');
// export const change_password = async () => {
//   try {
//     const response = await fetch("http://127.0.0.1:8000/api/user/change_password/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer YOUR_ACCESS_TOKEN",
//         "X-CSRFToken": csrfToken,
//       },
//       body: JSON.stringify({
//         old_password: "current_password",
//         new_password: "new_password",
//       }),
//     });
//     const data = await response.json();
//     return console.log(data);
//   } catch (error) {
//     return console.error("Error:", error);
//   }
// };

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}


export const contact = (value) => {
  fetch("http://127.0.0.1:8000/api/contact/", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // Specify the content type
    },
    body: JSON.stringify(value), // Convert the value object to JSON string
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
};

