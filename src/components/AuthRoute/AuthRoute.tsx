import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
function AuthRoute({ children }: { children: React.ReactNode }) {
   const token=Cookies.get("token");

  if (token) {
   return <>{children}</>;
  }
   else{
     return <Navigate to="/login" replace />;
   }
  return children;
} 

export default AuthRoute;