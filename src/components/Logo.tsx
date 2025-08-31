import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Logo = () => {
	return (
		<Link to="/" className="flex items-center gap-1 font-ubuntu font-semibold">
			<img src={logo} className="w-6" />
			<h6 className="text-purple-600">SendMAIL</h6>
		</Link>
	);
};

export default Logo;
