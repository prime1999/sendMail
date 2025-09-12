import { navLinks } from "@/contants/arrays.info";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";

const HomeLastSection = () => {
	return (
		<footer className="w-full mt-8 py-8">
			{" "}
			<div className="w-8/12 flex flex-col items-center justify-center mx-auto rounded-xl my-8 bg-white/30 p-4">
				<Logo />
				<ul className="flex items-center justify-center gap-8 text-sm font-inter font-semibold mt-4">
					{navLinks.map((link: any) => (
						<Link
							to={link.value}
							key={link.id}
							className="cursor-pointer duration-500 hover:text-purple-600"
						>
							{link.name}
						</Link>
					))}
					<button className="text-sm font-inter font-semibold cursor-pointer duration-500 hover:text-purple-600">
						Contact
					</button>
				</ul>
				<div className="flex gap-4 items-center mt-4">
					<Link to="https://x.com/iminent_24" target="blank">
						<FaXTwitter className="cursor-pointer duration-500 hover:text-purple-600" />
					</Link>
					<Link
						to="https://www.linkedin.com/in/moshood-yakubu-b7a7b3256/"
						target="blank"
					>
						<FaLinkedin className="cursor-pointer duration-500 hover:text-purple-600" />
					</Link>
				</div>
			</div>
			<div className="flex items-center justify-center gap-1 font-ubuntu font-semibold">
				<p>© @</p>
				<Link
					to="https://portfolio-site-lac-six.vercel.app/"
					target="blank"
					className="duration-700 hover:text-purple-500"
				>
					Eminence
				</Link>
			</div>
		</footer>
	);
};

export default HomeLastSection;
