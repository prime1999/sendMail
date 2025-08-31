import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";
// import MobileNav from "@/components/MobileNav";
// import Footer from "@/components/Footer";

const RootLayouts = () => {
	return (
		<div className="flex flex-col h-screen m-0">
			<div className="grow mb-8 pb-20 lg:pb-0">
				<Navbar />
				<Outlet />
				{/* <Footer /> */}
			</div>
			{/* <MobileNav /> */}
		</div>
	);
};

export default RootLayouts;
