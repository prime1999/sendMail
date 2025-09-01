import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import reflection from "../assets/images/reflection.jpg";
import audio from "../assets/images/audio.png";
import text from "../assets/images/text.png";

gsap.registerPlugin(ScrollTrigger);

const HomeThirdSection = () => {
	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.set(".masked-img", { "--mask-size": "50%" });

			gsap.to(".masked-img", {
				scale: 1.3,
				maskPosition: "center",
				maskSize: "400%",
				duration: 2,
				ease: "power1.inOut ",
				scrollTrigger: {
					trigger: ".image-section",
					start: "top top", // when the section enters viewport
					end: "bottom center", // when it hits top of viewport
					scrub: true,
					pin: true,
				},
			});
			gsap.from(".reflection-text", {
				opacity: 0,
				delay: 2,
				duration: 1,
				ease: "power1.inOut ",
				scrollTrigger: {
					trigger: ".image-section",
					start: "top top", // when the section enters viewport
					end: "bottom center", // when it hits top of viewport
					scrub: true,
				},
			});
		});

		return () => ctx.revert();
	}, []);

	return (
		<main className="image-section relative flex gap-4 w-9/12 h-[400px] mx-auto my-16">
			<div className="relative">
				<div className="message h-12 glassmorphism bg-purple-200 mt-4 px-2">
					<div className="flex justify-center gap-2 items-center">
						<img src={audio} className="w-12" alt="audio" />
						<span>
							<p className="font-inter text-xs font-medium">
								You sent a voice recording from a year ago
							</p>
							<p className="text-xs font-inter font-semibold text-purple-600">
								1 year ago
							</p>
						</span>
					</div>
				</div>
				<div className="message absolute bottom-10 h-12 glassmorphism bg-purple-200 mt-4 px-2">
					<div className="flex justify-center gap-2 items-center">
						<img src={text} className="w-12" alt="text" />
						<span>
							<p className="font-inter text-xs font-medium">
								You sent a message from 2 years ago
							</p>
							<p className="text-xs font-inter font-semibold text-purple-600">
								2 years ago
							</p>
						</span>
					</div>
				</div>
			</div>
			<div className="relative phone-img flex-1 flex justify-center items-center">
				<img
					src={reflection}
					alt="masked phone"
					className="abs-center size-full masked-img object-contain"
				/>
				<div className="absolute bottom-20">
					<h6 className="reflection-text opacity-100 font-ubuntu text-4xl text-center font-semibold">
						Communicate with <br />
						your past self
					</h6>
				</div>
			</div>
			<div className="message absolute top-30 right-0 h-12 glassmorphism bg-purple-200 mt-4 px-2">
				<div className="flex justify-center gap-2 items-center">
					<img src={text} className="w-12" alt="text" />
					<span>
						<p className="font-inter text-xs font-medium">
							You sent a message from 2 years ago
						</p>
						<p className="text-xs font-inter font-semibold text-purple-600">
							2 years ago
						</p>
					</span>
				</div>
			</div>
		</main>
	);
};

export default HomeThirdSection;
