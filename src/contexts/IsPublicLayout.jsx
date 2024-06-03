import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function IsPublicLayout() {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/home" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}

export default IsPublicLayout;
