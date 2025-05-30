
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminRoute = ({ children }) => {
    const { isLoggedIn, user } = useAuth();

    if (isLoggedIn && !user) {
        return <div className="text-center py-10">Loading...</div>;
    }

    return isLoggedIn && user?.isAdmin ? children : <Navigate to="/" />;
};

export default AdminRoute;
