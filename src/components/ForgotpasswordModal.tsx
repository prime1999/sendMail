import { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useForgotPassword } from "@/lib/actions/QueryActions";

type Props = {
	open: boolean;
	setOpen: any;
};

const ForgotpasswordModal = ({ open, setOpen }: Props) => {
	// react-query
	const forgotPassword = useForgotPassword();
	// form handling state
	const [email, setEmail] = useState<string>("");
	const [emailError, setEmailError] = useState<string>("");
	// loading state
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleForgotpassword = (e: any) => {
		try {
			e.preventDefault();
			// check the email
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

			if (!emailRegex.test(email)) {
				setEmailError("Invalid Email");
			}

			if (emailRegex.test(email)) {
				setIsLoading(true);
				// call the react query function
				forgotPassword.mutate(email, {
					onSuccess: () => {
						setIsLoading(false);
						setOpen(false);
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
		<Dialog open={open}>
			<DialogContent className="w-[400px]">
				<DialogHeader>
					<DialogTitle className="text-center font-inter texte-sm">
						Send password recovery link
					</DialogTitle>
					<DialogDescription>
						<form>
							<label className="font-inter font-medium text-xs text-gray-800">
								Your email:
							</label>
							<div className="relative flex flex-col font-ubuntu mt-4">
								<input
									type="email"
									placeholder="Enter your email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="text-xs border px-2 py-1 rounded-md w-full pl-7 text-black h-8"
								/>
								<MdOutlineEmail className="absolute left-2 top-2.5 text-gray-800" />
								{emailError !== "" && (
									<p className="relative font-inter text-[12px] mt-1 text-red-500 font-semibold">
										{emailError}
									</p>
								)}
							</div>
							<button
								disabled={isLoading}
								type="submit"
								onClick={(e) => handleForgotpassword(e)}
								className="w-full button-gradient p-2 rounded-md mt-4 font-inter font-medium text-xs"
							>
								Send mail
							</button>
						</form>
						<button
							onClick={() => setOpen(false)}
							className="w-full bg-red-500 rounded-md h-7 mt-2 text-xs text-white/90 font-inter font-medium duration-500 cursor-pointer hover:bg-red-600"
						>
							Cancel
						</button>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default ForgotpasswordModal;
