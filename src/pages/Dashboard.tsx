import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { MdOutlineFeedback, MdLogout } from "react-icons/md";
import Logo from "@/components/Logo";
import dashboardLady from "../assets/images/dashboardLady.png";
import UploadForm from "@/components/UploadForm";
import Recording from "@/components/Recording";
import {
	// useLoguserOut,
	useUploadFileToCloud,
} from "@/lib/actions/QueryActions";
import { AppwriteLogUserOut } from "@/lib/actions/AuthActions";

const Dashboard = () => {
	const navigate = useNavigate();
	// state for react-query
	const uploadFile = useUploadFileToCloud();
	//const logUserOut = useLoguserOut();
	// state to hadle the uplao progress
	const [progress, setProgress] = useState<string>("");
	// state to handle the uploaded file data
	const [fileData, setFileData] = useState<any>([]);
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const [stream, setStream] = useState<any>(null);
	const streamRef = useRef<MediaStream | null>(null); // 🔥 store the stream
	const [mediaBlob, setMediaBlob] = useState<Blob | null>(null);
	const [videoUrl, setVideoUrl] = useState<any>(null);
	const [showRecording, setShowRecording] = useState(false);

	useGSAP(() => {
		gsap.from(".nav", {
			opacity: 0,
			yPercent: -40,
			duration: 1,
			ease: "power1.inOut",
			stagger: 0.3,
		});
		gsap.from(".form", {
			opacity: 0,
			yPercent: 50,
			duration: 1.5,
			ease: "power1.inOut",
		});
		gsap.from(".heading", {
			xPercent: -50,
			duration: 1,
			ease: "power1.inOut",
		});
		gsap.from(".btn", {
			opacity: 0,
			xPercent: 50,
			duration: 1.5,
			ease: "power1.inOut",
			stagger: 0.5,
		});
	}, []);

	const stopStream = (stream: MediaStream) => {
		stream.getTracks().forEach((track) => track.stop());
	};

	// function to start recordin te live video
	const startRecording = async (type: "video" | "audio") => {
		try {
			const constraints =
				type === "video" ? { video: true, audio: true } : { audio: true };

			const stream = await navigator.mediaDevices.getUserMedia(constraints);
			// store for later use
			streamRef.current = stream;

			setStream(stream);

			const recorder = new MediaRecorder(stream);
			const chunks: Blob[] = [];

			recorder.ondataavailable = (e) => {
				if (e.data.size > 0) chunks.push(e.data);
			};

			recorder.onstop = () => {
				const blob = new Blob(chunks, {
					type: type === "video" ? "video/webm" : "audio/webm",
				});
				setMediaBlob(blob);
				stopStream(stream);
				if (blob) {
					// Create a preview URL
					const previewUrl = URL.createObjectURL(blob);

					// Store this in state for your <video>
					setVideoUrl(previewUrl);
				}
			};

			mediaRecorderRef.current = recorder;
			recorder.start();
			setShowRecording(true);
		} catch (err) {
			console.error("Error starting recording:", err);
		}
	};

	const stopRecording = () => {
		mediaRecorderRef.current?.stop();

		// setShowRecording(false);
	};

	// Ensure srcObject is always set when modal opens
	useEffect(() => {
		if (showRecording && videoRef.current && streamRef.current) {
			videoRef.current.srcObject = streamRef.current;
			videoRef.current.play().catch(console.error);
		}
	}, [showRecording]);

	// function to cancel a recording
	const cancelRecording = () => {
		setVideoUrl(null);
		setStream(null);
		setShowRecording(false);
	};

	// function to upload te recording to cloudinary
	const uploadRecording = () => {
		const dataToSend = { file: [mediaBlob], setProgress };
		setShowRecording(false);
		// call the react query function
		uploadFile.mutate(dataToSend, {
			onSuccess: (data: any) => {
				// set the progress to 0
				setProgress("");
				setFileData((prev: any) => [...prev, ...data]);
			},
			onError: (error) => {
				console.error("Error creating user:", error);
			},
		});
	};

	// function to log a user out
	const logOutUser = async () => {
		// call the react query function
		// logUserOut.mutate({
		// 	onSuccess: (data: any) => {
		// 		// set the progress to 0
		// 		setProgress("");
		// 		setFileData((prev: any) => [...prev, ...data]);
		// 	},
		// 	onError: (error) => {
		// 		console.error("Error creating user:", error);
		// 	},
		// });
		try {
			// call te funciton
			await AppwriteLogUserOut();
			navigate("/signIn");
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<main
			style={{
				backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(159, 75, 236, 0.6)), url(${dashboardLady})`,
			}}
			className="fixed inset-0 overflow-hidden bg-cover bg-center bg-no-repeat bg-purple-200 pt-6 lg:bg-contain"
		>
			<nav className="nav w-11/12 mx-auto flex items-center justify-between font-inter text-xs font-medium md:w-9/12">
				<Logo />
				<div className="nav flex items-center gap-4">
					<button
						onClick={() => startRecording("video")}
						className="glassmorphism bg-white/20 border border-white/30 py-2 px-4 duration-500 cursor-pointer hover:text-purple-700"
					>
						Record a video
					</button>
					<button
						onClick={() => startRecording("audio")}
						className="glassmorphism bg-white/20 border border-white/30 py-2 px-4 duration-500 cursor-pointer hover:text-purple-700"
					>
						Record an audio
					</button>
				</div>
				<button className="text-lg cursor-pointer text-purple-800 duration-500 hover:rotate-20">
					<FaBell />
				</button>
			</nav>
			<div className="w-9/12 mx-auto flex flex-col items-start justify-between md:flex-row">
				<div className="mt-16 flex gap-4 items-center md:block">
					<h1 className="heading font-ubuntu text-6xl md:text-5xl">
						Talk to the <br />
						<span className="font-semibold text-purple-600">Future</span> You
					</h1>
					<div className="flex flex-col gap-8 md:mt-16">
						<button className="btn glassmorphism bg-white/20 border border-white/30 p-2 w-9 text-xl text-purple-800 cursor-pointer">
							<MdOutlineFeedback />
						</button>
						<button
							type="button"
							onClick={() => logOutUser()}
							className="btn glassmorphism bg-white/20 border border-white/30 p-2 w-9 text-xl text-purple-800 cursor-pointer"
						>
							<MdLogout />
						</button>
					</div>
				</div>
				<div className="form mt-16">
					<UploadForm
						progress={progress}
						setProgress={setProgress}
						fileData={fileData}
						setFileData={setFileData}
					/>
				</div>
			</div>
			<Recording
				open={showRecording}
				stopRecording={stopRecording}
				cancelRecording={cancelRecording}
				stream={stream}
				videoUrl={videoUrl}
				uploadRecording={uploadRecording}
			/>
		</main>
	);
};

export default Dashboard;
