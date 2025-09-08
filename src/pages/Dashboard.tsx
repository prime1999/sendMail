import { FaBell } from "react-icons/fa";
import { MdOutlineFeedback, MdLogout } from "react-icons/md";
import Logo from "@/components/Logo";
import dashboardLady from "../assets/images/dashboardLady.png";
import UploadForm from "@/components/UploadForm";

const Dashboard = () => {
	return (
		<main
			style={{
				backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(159, 75, 236, 0.6)), url(${dashboardLady})`,
			}}
			className="h-screen bg-contain bg-center bg-[rgb(128, 18, 231)] bg-no-repeat bg-purple-200 pt-6"
		>
			<nav className="w-9/12 mx-auto flex items-center justify-between font-inter text-xs font-medium">
				<Logo />
				<div className="flex items-center gap-4">
					<button className="glassmorphism bg-white/20 border border-white/30 py-2 px-4 duration-500 cursor-pointer hover:text-purple-700">
						Send Message
					</button>
					<button className="glassmorphism bg-white/20 border border-white/30 py-2 px-4 duration-500 cursor-pointer hover:text-purple-700">
						Record a video
					</button>
					<button className="glassmorphism bg-white/20 border border-white/30 py-2 px-4 duration-500 cursor-pointer hover:text-purple-700">
						Record an audio
					</button>
				</div>
				<button className="text-lg cursor-pointer text-purple-800 duration-500 hover:rotate-20">
					<FaBell />
				</button>
			</nav>
			<div className="mt-16 w-9/12 mx-auto">
				<h1 className="font-ubuntu text-5xl">
					Talk to the <br />
					<span className="font-semibold text-purple-600">Future</span> You
				</h1>
			</div>
			<div className="absolute top-25 right-30">
				<UploadForm />
			</div>
			<div className="relative left-40 top-20 flex flex-col gap-8">
				<button className="glassmorphism bg-white/20 border border-white/30 p-2 w-9 text-xl text-purple-800 cursor-pointer">
					<MdOutlineFeedback />
				</button>
				<button className="glassmorphism bg-white/20 border border-white/30 p-2 w-9 text-xl text-purple-800 cursor-pointer">
					<MdLogout />
				</button>
			</div>
		</main>
	);
};

export default Dashboard;
