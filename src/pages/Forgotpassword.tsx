import { useEffect, useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import Logo from "@/components/Logo";
import background from "../assets/images/fromBg.jpg";
import { useConfirmPasswordRecovery } from "@/lib/actions/QueryActions";
import { useLocation } from "react-router-dom";

const ForgotPassword = () => {
	// react-router
	const location = useLocation();
	// react query hooks
	const confirmPassword = useConfirmPasswordRecovery();
	const [password, setPassword] = useState<string>("");
	const [searchData, setSearchData] = useState<any>(null);
	// state to handle the password visibility
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [errorData, setErrorData] = useState<any>({
		passwordError: "",
	});
	const { passwordError } = errorData;

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const userId = queryParams.get("userId");
		const secret = queryParams.get("secret");
		console.log({ userId, secret });
		setSearchData({ userId, secret });
	}, []);
	// function to handle the create email/password session
	const handleSubmit = (e: any) => {
		try {
			e.preventDefault();
			// check the password
			const passwordRegex = /^.{8,15}$/;
			if (!passwordRegex.test(password)) {
				setErrorData((prev: any) => ({
					...prev,
					passwordError: "Check password",
				}));
			}

			if (passwordRegex.test(password)) {
				const data = {
					userId: searchData.userId,
					secret: searchData.secret,
					password,
				};
				// call the react query function
				confirmPassword.mutate(data, {
					onSuccess: () => {
						console.log(123);
						// navigate("/dashboard");
					},
					onError: (error) => {
						console.error("Error creating user:", error);
					},
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
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
						<h2 className="text-2xl">Change your password</h2>
					</div>
					<div>
						<div className="mt-2">
							<label className="font-inter font-medium text-xs text-gray-500">
								Your password:
							</label>
							<div className="relative flex flex-col font-ubuntu">
								<input
									type={showPassword ? "text" : "password"}
									placeholder="create password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="text-xs border px-2 py-1 rounded-md w-full pl-7 pr-4"
								/>
								<CiLock className="absolute left-2 top-1.5 text-gray-500" />
								{passwordError !== "" && (
									<p className="relative font-inter text-[10px] mt-1 text-red-500 font-medium">
										{errorData.passwordError}
									</p>
								)}
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-2 top-1.5 text-gray-500 cursor-pointer"
								>
									{showPassword ? <FaEyeSlash /> : <FaEye />}
								</button>
							</div>
						</div>
						<button
							type="submit"
							onClick={(e) => handleSubmit(e)}
							className="w-full button-gradient p-2 rounded-md mt-4 font-inter font-medium text-xs"
						>
							Continue
						</button>
					</div>
				</form>
			</div>
		</main>
	);
};

export default ForgotPassword;
