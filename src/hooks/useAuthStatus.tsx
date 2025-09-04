import { checkCurrentSession } from "@/lib/actions/AuthActions";
import { useState, useEffect } from "react";

export const useUserAuthStatus = () => {
	const [checkingStatus, setCheckingStatus] = useState<boolean>(true);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

	useEffect(() => {
		const handleLoad = async () => {
			const user = await checkCurrentSession();
			if (user && user.$id) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
			setCheckingStatus(false);
		};

		handleLoad();
	}, []);
	return { isLoggedIn, checkingStatus };
};
