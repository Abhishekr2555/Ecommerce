import { Navigate } from "react-router-dom";
import { isAuthenticated } from "C:/Users/Admin/.vscode/Frontend work/Full stack2/projfrontend/src/auth/helper/index.js";

const Priveteroutes = ({ children }) => {
  const { user } = isAuthenticated();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/signin" />;
  }
  return children;
};

export default Priveteroutes;