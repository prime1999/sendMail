import { useRef, useState } from "react";
import { TiAttachmentOutline } from "react-icons/ti";
import { IoIosSend } from "react-icons/io";
import { FaVideo } from "react-icons/fa6";
import { FaRegImages } from "react-icons/fa";
import { LuAudioLines } from "react-icons/lu";
import { MdCancel } from "react-icons/md";
import {
	useSendMailToAppwrite,
	useUploadFileToCloud,
} from "@/lib/actions/QueryActions";
import { SendDate } from "./SendDate";

type Props = {
	progress: string;
	setProgress: any;
	fileData: any;
	setFileData: any;
};

const UploadForm = ({
	progress,
	setProgress,
	fileData,
	setFileData,
}: Props) => {
	const uploadFile = useUploadFileToCloud();
	const sendMail = useSendMailToAppwrite();
	// state to handle the formData
	const [formData, setFormData] = useState<any>({
		title: "",
		message: "",
	});
	// ref to handle the file input
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const [date, setDate] = useState<Date | undefined>(undefined);

	const { title, message } = formData;

	// function to handle the click function for the upload
	const handleClick = () => {
		fileInputRef.current?.click();
	};
	// function to handle th file upload
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// check if a file has been selected
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files;
			const dataToSend = { file, setProgress };
			// call the react query function
			uploadFile.mutate(dataToSend, {
				onSuccess: (data: any) => {
					// set the progress to 0
					setProgress("");
					setFileData(data);
				},
				onError: (error) => {
					console.error("Error creating user:", error);
				},
			});
		}
	};

	// function to send the mail
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			// Extract URLs from fileData
			const fileUrl = fileData.map((file: any) => file.url);

			// Data to send to backend
			const dataToSend = {
				message,
				fileUrl,
				sendTime: date,
			};

			// Call the React Query mutation
			sendMail.mutate(dataToSend, {
				onSuccess: (response: any) => {
					console.log("Upload success:", response);

					// Optionally reset form
					setProgress("");
					setFileData([]);
					setDate(undefined);
				},
				onError: (error) => {
					console.error("Error sending mail:", error);
				},
			});
		} catch (error) {
			console.error("Unexpected error:", error);
		}
	};

	return (
		<main className="w-96 glassmorphism bg-white/20 border border-white/30 p-4">
			<h3 className="font-inter font-medium text-sm">
				Send a Message to the future
			</h3>
			<form className="mt-4 w-full">
				<input
					type="text"
					placeholder="Title"
					value={title}
					onChange={(e) =>
						setFormData((prev: any) => ({
							...prev,
							title: e.target.value,
						}))
					}
					className="border-b border-gray-400 w-full font-inter text-sm text-gray-500 py-1 focus:outline-0"
				/>
				<textarea
					placeholder="Message"
					value={message}
					onChange={(e) =>
						setFormData((prev: any) => ({
							...prev,
							message: e.target.value,
						}))
					}
					className="mt-4 border-b border-gray-400 w-full font-inter text-sm text-gray-500 py-1 focus:outline-0"
				></textarea>
				<div className="flex items-center gap-2 mt-2">
					<button
						type="button"
						className="text-lg bg-white/20 text-purple-500 rounded-md p-2 cursor-pointer duration-500 hover:bg-white/40"
					>
						<TiAttachmentOutline onClick={handleClick} />
					</button>
					<input
						type="file"
						multiple
						ref={fileInputRef}
						className="hidden"
						onChange={(e) => handleFileChange(e)}
					/>
					<button
						type="submit"
						onClick={(e) => handleSubmit(e)}
						className="flex items-center gap-2 font-inter text-sm text-white/80 font-medium bg-purple-400 rounded-md px-4 py-2 cursor-pointer duration-500 hover:bg-purple-500"
					>
						Send{" "}
						<span className="mt-1">
							<IoIosSend />
						</span>
					</button>
				</div>
			</form>
			{progress !== "" && (
				<div className="relative mt-4 h-2 w-full rounded-lg bg-transparent border border-white/20 overflow-hidden">
					<div
						className="absolute h-full rounded-lg bg-purple-500 transition-all duration-200 ease-out"
						style={{ width: `${progress}%` }}
					></div>
				</div>
			)}
			<div className="mt-4 max-w-full overflow-x-auto rounded-lg p-2 scrollable-div">
				<div className="flex gap-4">
					{fileData.length > 0 &&
						fileData.map((file: any, i: number) => (
							<div
								key={i}
								className="relative h-18 flex-shrink-0 flex flex-col items-center justify-center"
							>
								{file.resource_type === "image" ? (
									<FaRegImages className="text-3xl text-purple-800" />
								) : file.resource_type === "video" ? (
									<FaVideo />
								) : (
									<LuAudioLines className="text-3xl text-purple-800" />
								)}
								<p className="truncate w-18 font-inter text-xs">
									{file.display_name}
								</p>
								<button className="absolute top-2 right-2 cursor-pointer">
									<MdCancel className="text-purple-500 cursor-pointer duration-500 hover:text-purple-800" />
								</button>
							</div>
						))}
				</div>
			</div>
			<SendDate date={date} setDate={setDate} />
		</main>
	);
};

export default UploadForm;
