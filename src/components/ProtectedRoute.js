import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, loginOnlyPage = true }) => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  if (!user && loginOnlyPage) return navigate("/login");
  if (user && !loginOnlyPage) return navigate("/");

  return children;
};

export default ProtectedRoute;
