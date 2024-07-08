import {API} from "../../backend"

export const getProducts=async ()=> {
  try {
    const response = await fetch(`${API}`, { method: 'GET' });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};
