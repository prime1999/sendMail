import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineEmail } from "react-icons/md";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import Logo from "@/components/Logo";
import background from "../assets/images/fromBg.jpg";
import { Link } from "react-router-dom";

const SignIn = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	return (
		<main
			className="h-screen w-screen bg-cover bg-center"
			style={{ backgroundImage: `url(${background})` }}
		>
			<div className="absolute inset-0 bg-white/70"></div>

			<div className="relative flex items-center justify-center w-full h-full">
				<form className="w-1/5">
					<div className="flex flex-col items-center justify-center font-ubuntu">
						<Logo />
						<h2 className="text-2xl">Welcome to SendMail</h2>
						<p className="text-xs font-inter mt-1">
							Sign in to your future account
						</p>
					</div>

					<button className="flex items-center justify-center gap-2 font-inter font-semibold text-xs border w-full mx-auto px-2 py-1 mt-4 glassmorphism cursor-pointer duration-500 hover:bg-purple-50">
						<FcGoogle className="text-lg" /> <p>Continue with Google</p>
					</button>
					<div className="flex items-center gap-2 w-full mt-2">
						<hr className="flex-grow border-gray-300" />
						<p className="text-xs text-gray-500 whitespace-nowrap font-inter font-medium">
							continue with email
						</p>
						<hr className="flex-grow border-gray-300" />
					</div>
					<div>
						<label className="font-inter font-medium text-xs text-gray-500">
							Your email:
						</label>
						<div className="relative flex flex-col font-ubuntu">
							<input
								type="email"
								placeholder="Enter your email"
								className="text-xs border px-2 py-1 rounded-md w-full pl-7"
							/>
							<MdOutlineEmail className="absolute left-2 top-1.5 text-gray-500" />
						</div>
						<div className="mt-2">
							<label className="font-inter font-medium text-xs text-gray-500">
								Your password:
							</label>
							<div className="relative flex flex-col font-ubuntu">
								<input
									type={showPassword ? "text" : "password"}
									placeholder="Enter your password"
									className="text-xs border px-2 py-1 rounded-md w-full pl-7 pr-4"
								/>
								<CiLock className="absolute left-2 top-1.5 text-gray-500" />

								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-2 top-1.5 text-gray-500 cursor-pointer"
								>
									{showPassword ? <FaEyeSlash /> : <FaEye />}
								</button>
							</div>
						</div>
						<button className="w-full button-gradient p-2 rounded-md mt-4 font-inter font-medium text-xs">
							Continue
						</button>
					</div>
					<div className="w-full text-xs font-inter font-medium flex flex-col text-gray-500 items-center justify-center mt-2">
						<button
							type="button"
							className="cursor-pointer font-semibold duration-500 hover:text-gray-800"
						>
							forgot-password?
						</button>
						<Link
							to="/register"
							className="mt-2 duration-500 hover:text-gray-800"
						>
							Create Account
						</Link>
					</div>
				</form>
			</div>
		</main>
	);
};

export default SignIn;
