import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import video from "../assets/videos/video1.mp4";
import audioWoman from "../assets/images/woman2.jpg";
import textWoman from "../assets/images/woman3.jpg";

const HomeSecondSection = () => {
	gsap.registerPlugin(ScrollTrigger);
	useGSAP(() => {
		const elements = [
			{
				selector: ".video-div",
				from: { opacity: 0, xPercent: 100 },
				to: { opacity: 1, xPercent: 0, stagger: 0.2, duration: 1.5 },
			},
			{
				selector: ".audio-div",
				from: { opacity: 0, xPercent: -100 },
				to: { opacity: 1, xPercent: 0, duration: 1.5 },
			},
			{
				selector: ".text-div",
				from: { opacity: 0, xPercent: 100 },
				to: { opacity: 1, xPercent: 0, duration: 1.5 },
			},
			{
				selector: ".text",
				from: { opacity: 0, yPercent: -40 },
				to: { opacity: 1, yPercent: 0, duration: 1, delay: 1.5 },
			},
		];

		elements.forEach(({ selector, from, to }) => {
			gsap.set(selector, { ...from, immediateRender: false });

			ScrollTrigger.batch(selector, {
				start: "top 80%",
				end: "bottom top",
				onEnter: (batch) => gsap.to(batch, { ...to, ease: "power1.out" }),
				onLeave: (batch) => gsap.to(batch, { ...from, ease: "power1.out" }),
				onEnterBack: (batch) => gsap.to(batch, { ...to, ease: "power1.out" }),
				onLeaveBack: (batch) => gsap.to(batch, { ...from, ease: "power1.out" }),
			});
		});
	}, []);

	return (
		<main className="my-16 w-8/12 mx-auto">
			<div className="video-div relative w-full h-96">
				<video
					src={video}
					autoPlay
					muted
					loop
					playsInline
					className="h-full w-full object-cover rounded-2xl"
				/>
				<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black rounded-2xl">
					<div className="absolute bottom-10 left-10 text-white">
						<p className="text font-inter font-medium text-md text-slate-200">
							Turn your memories into a time capsule-record a video today, and{" "}
							<br />
							let it speak to your future self.
						</p>
						<button className="font-inter font-medium text-xs rounded-lg text-slate button-gradient mt-4 p-2">
							Send a video
						</button>
					</div>
				</div>
			</div>
			<div className="w-full h-[300px] flex items-center justify-between gap-4 mt-4">
				<div className="audio-div relative w-7/12 h-full">
					<img src={audioWoman} className="w-full h-full rounded-2xl" />
					<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black rounded-2xl">
						<div className="absolute bottom-10 left-10 text-white">
							<p className="text font-inter font-medium text-md text-slate-200">
								Speak your mind today, and let your future self hear your voice,{" "}
								<br />
								your thoughts, and your feelings when the time comes.
							</p>
							<button className="font-inter font-medium rounded-lg text-xs text-slate button-gradient mt-4 p-2">
								Record your Voice
							</button>
						</div>
					</div>
				</div>
				<div className="text-div relative w-5/12 h-full">
					<img
						src={textWoman}
						alt="woman recording an audio"
						className="w-full h-full rounded-2xl"
					/>
					<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black rounded-2xl">
						<div className="absolute bottom-10 left-10 text-white">
							<p className="text font-inter font-medium text-md text-slate-200">
								Write your thoughts today, and let your future self read the
								words that capture who you are right now.
							</p>
							<button className="font-inter font-medium text-xs rounded-lg text-slate button-gradient mt-4 p-2">
								Pen your thoughts
							</button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default HomeSecondSection;
