import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function IsPrivateLayout() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/users/login" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}

export default IsPrivateLayout;
