import { useCallback, useEffect, useRef } from "react";
import { FaRegStopCircle } from "react-icons/fa";
import { MdCancel, MdCloudUpload } from "react-icons/md";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

type Props = {
	open: boolean;
	stopRecording: () => void;
	cancelRecording: () => void;
	stream: MediaStream | null;
	videoUrl: any;
	uploadRecording: any;
};

const Recording = ({
	open,
	stream,
	stopRecording,
	cancelRecording,
	videoUrl,
	uploadRecording,
}: Props) => {
	// keep a ref to the video element
	const videoRef = useRef<HTMLVideoElement | null>(null);

	// Callback ref: called when the <video> mounts/unmounts
	const setVideoRef = useCallback(
		(el: HTMLVideoElement | null) => {
			videoRef.current = el;

			// If the element just mounted and we already have a stream, attach immediately
			if (el && stream) {
				try {
					el.srcObject = stream;
					el.muted = true;
					el.playsInline = true;
					// play() returns a promise — swallow autoplay errors
					const p = el.play();
					if (p && p.catch) p.catch(() => {});
				} catch (err) {
					console.error("Failed to attach stream in callback ref:", err);
				}
			}
		},
		[stream]
	);

	// Also run an effect when stream changes and element already exists
	useEffect(() => {
		const videoEl = videoRef.current;
		if (!videoEl) return;

		if (stream) {
			videoEl.srcObject = stream;
			videoEl.muted = true;
			videoEl.playsInline = true;
			videoEl.play().catch(() => {
				/* autoplay blocked — user can press play */
			});
		} else {
			// cleanup if stream removed
			videoEl.srcObject = null;
		}

		return () => {
			// on unmount/cleanup, remove srcObject to free resources
			if (videoRef.current) videoRef.current.srcObject = null;
		};
	}, [stream]);

	// (optional) debug log
	useEffect(() => {
		console.log(
			"Recording modal open:",
			open,
			"stream active:",
			!!stream,
			"videoRef:",
			videoRef.current
		);
	}, [open, stream]);

	return (
		<Dialog open={open}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-center font-inter">
						Recording...
					</DialogTitle>
					<DialogDescription>
						<div>
							{/* use the callback ref here */}
							{videoUrl !== null && (
								<video
									src={videoUrl}
									autoPlay={false}
									controls
									className="h-72 w-full object-cover"
								/>
							)}
							{videoUrl === null && (
								<video
									ref={setVideoRef}
									autoPlay
									muted
									playsInline
									className="h-72 w-full object-cover"
								/>
							)}
							<div className="w-full flex gap-12 items-center justify-center mt-4">
								<button
									type="button"
									onClick={stopRecording}
									className="flex flex-col items-center justify-center cursor-pointer"
								>
									<FaRegStopCircle className="text-3xl text-purple-500" />
									<p className="font-inter text-xs mt-2 text-white/50 font-medium">
										Stop Recording
									</p>
								</button>
								<button
									type="button"
									onClick={cancelRecording}
									className="flex flex-col items-center justify-center cursor-pointer"
								>
									<MdCancel className="text-3xl text-red-500" />
									<p className="font-inter text-xs mt-2 text-white/50 font-medium">
										Cancel
									</p>
								</button>
								{videoUrl !== null && (
									<button
										type="button"
										onClick={uploadRecording}
										className="flex flex-col items-center justify-center cursor-pointer"
									>
										<MdCloudUpload className="text-3xl text-purple-500" />
										<p className="font-inter text-xs mt-2 text-white/50 font-medium">
											Upload file
										</p>
									</button>
								)}
							</div>
						</div>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default Recording;
