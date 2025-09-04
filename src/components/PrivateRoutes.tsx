import { Navigate, Outlet } from "react-router-dom";
import { useUserAuthStatus } from "@/hooks/useAuthStatus";
import FullPageLoader from "@/lib/utils/FullPageLoader";
// import FullPageLoader from "@/lib/utils/FullPageLoader";

const PrivateRoutes = () => {
	const { isLoggedIn, checkingStatus } = useUserAuthStatus();

	if (checkingStatus) {
		return <FullPageLoader />;
	}
	return isLoggedIn ? <Outlet /> : <Navigate to="/signIn" />;
};

export default PrivateRoutes;
