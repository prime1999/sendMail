import { Link } from "react-router-dom";
import { navLinks } from "@/contants/arrays.info";
import Logo from "./Logo";

const Navbar = () => {
	return (
		<nav className="fixed rounded-none z-100 w-full py-2 glassmorphism">
			<div className="flex items-center justify-between w-8/12 mx-auto">
				<Logo />
				<ul className="flex items-center justify-center gap-8  text-sm font-inter font-semibold">
					{navLinks.map((link: any) => (
						<Link
							to={link.value}
							key={link.id}
							className="cursor-pointer duration-500 hover:text-purple-600"
						>
							{link.name}
						</Link>
					))}
				</ul>
				<Link
					to="/register"
					className="font-inter text-xs font-medium p-2 rounded-md button-gradient"
				>
					Get Started
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
