import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { IoBatteryFullOutline } from "react-icons/io5";
import { MdOutlineWifi } from "react-icons/md";
import { BsBarChartFill } from "react-icons/bs";
import woman from "../assets/images/woman.png";
import { heroMessage } from "@/contants/arrays.info";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
	// const titleSplit = new SplitText(".title", {
	// 	type: "chars, words",
	// });
	useGSAP(() => {
		const elements = [
			{
				selector: ".message",
				from: { opacity: 0, yPercent: -50 },
				to: { opacity: 1, yPercent: 0, stagger: 0.2, duration: 1 },
			},
			{
				selector: ".title",
				from: { opacity: 0, yPercent: -40 },
				to: { opacity: 1, yPercent: 0, duration: 1 },
			},
			{
				selector: ".para",
				from: { opacity: 0, xPercent: 40 },
				to: { opacity: 1, xPercent: 0, duration: 1 },
			},
			{
				selector: ".woman",
				from: { opacity: 0, yPercent: 5 },
				to: { opacity: 1, yPercent: 0, duration: 1 },
			},
			{
				selector: ".button",
				from: { opacity: 0, xPercent: -100 },
				to: { opacity: 1, xPercent: 0, duration: 1 },
			},
		];

		elements.forEach(({ selector, from, to }) => {
			// Set initial state immediately
			gsap.set(selector, from);

			ScrollTrigger.batch(selector, {
				start: "top 90%",
				end: "bottom 20%",
				onEnter: (batch) => gsap.to(batch, { ...to, ease: "power1.out" }),
				onLeave: (batch) => gsap.to(batch, { ...from, ease: "power1.out" }),
				onEnterBack: (batch) => gsap.to(batch, { ...to, ease: "power1.out" }),
				onLeaveBack: (batch) => gsap.to(batch, { ...from, ease: "power1.out" }),
			});
		});

		// Refresh to calculate positions
		ScrollTrigger.refresh();
	}, []);

	return (
		<section className="hero flex items-center justify-between w-8/12 mx-auto mt-8 pt-8">
			<div>
				<h1 className="title leading-normal font-ubuntu text-4xl">
					A gift from your <span className="font-semibold">Past,</span> <br />
					Delivered to your <span className="font-semibold">Future.</span>
				</h1>
				<p className="para max-w-[400px] mt-4 font-inter text-sm">
					Write heartfelt messages, goals, or reminders to yourself. Set a date,
					and your future self will receive them like a time capsule.
				</p>
				<button className="button py-2 px-4 button-gradient rounded-md mt-16">
					Send a mail to future you
				</button>
			</div>
			<div>
				<div className="bg-purple-100 rounded-3xl w-[300px] h-[500px] p-2">
					<div className="relative bg-purple-300 rounded-2xl h-full overflow-hidden">
						<div className="flex items-center justify-between w-10/12 mx-auto pt-2">
							<p className="font-inter font-bold text-xs">10:00</p>
							<span className="flex rounded-3xl w-[80px] h-5 bg-black"></span>
							<div className="flex items-center gap-2 text-xs">
								<BsBarChartFill />
								<MdOutlineWifi />
								<IoBatteryFullOutline />
							</div>
						</div>
						<img src={woman} className="absolute bottom-0 woman" />
						<div className="absolute left-4 w-11/12 h-12 mx-auto mt-16">
							{heroMessage.map((file) => (
								<div
									key={file.id}
									className="message h-12 glassmorphism border border-gray-300 mt-4"
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
