import { IoBatteryFullOutline, IoPersonCircleSharp } from "react-icons/io5";
import { MdOutlineWifi } from "react-icons/md";
import { BsBarChartFill } from "react-icons/bs";
import woman from "../assets/images/woman.png";
import audio from "../assets/images/audio.png";
import video from "../assets/images/video.png";
import { heroMessage } from "@/contants/arrays.info";

const Hero = () => {
	return (
		<section className="flex items-center justify-between w-8/12 mx-auto mt-8">
			<div>
				<h1 className="leading-normal font-ubuntu text-4xl">
					A gift from your <span className="font-semibold">Past,</span> <br />
					Delivered to your <span className="font-semibold">Future.</span>
				</h1>
				<p className="max-w-[400px] mt-4 font-inter text-sm">
					Write heartfelt messages, goals, or reminders to yourself. Set a date,
					and your future self will receive them like a time capsule.
				</p>
				<button className="py-2 px-4 button-gradient rounded-md mt-16">
					Send a mail to future you
				</button>
			</div>
			<div>
				<div className="bg-purple-100 rounded-3xl w-[300px] h-[500px] p-1">
					<div className="relative bg-purple-300 rounded-3xl h-full">
						<div className="flex items-center justify-between w-10/12 mx-auto pt-2">
							<p className="font-inter font-bold text-xs">10:00</p>
							<span className="flex rounded-3xl w-[80px] h-5 bg-black"></span>
							<div className="flex items-center gap-2 text-xs">
								<BsBarChartFill />
								<MdOutlineWifi />
								<IoBatteryFullOutline />
							</div>
						</div>
						<img src={woman} className="absolute bottom-0" />
						<div className="absolute left-4 w-11/12 h-12 mx-auto mt-16">
							{heroMessage.map((file) => (
								<div
									key={file.id}
									className="h-12 glassmorphism border border-gray-300 mt-2"
								>
									<div className="flex justify-center gap-2 items-center">
										<img src={file.image} className="w-12" />
										<span>
											<p className="font-inter text-xs font-medium">
												{file.message}
											</p>
											<p className="text-xs font-inter font-semibold text-purple-600">
												{file.time}
											</p>
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
