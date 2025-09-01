import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const RootLayouts = () => {
	return (
		<div className="flex flex-col h-screen m-0">
			<div className="grow mb-8 pb-20 lg:pb-0">
				<Navbar />
				<Outlet />
				<Footer />
			</div>
			{/* <MobileNav /> */}
		</div>
	);
};

export default RootLayouts;
