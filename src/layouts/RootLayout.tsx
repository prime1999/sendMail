import { Outlet } from "react-router-dom";

const RootLayouts = () => {
	return (
		<div className="flex flex-col h-screen m-0">
			<div className="grow mb-8 pb-20 lg:pb-0">
				<Outlet />
			</div>
			{/* <MobileNav /> */}
		</div>
	);
};

export default RootLayouts;
