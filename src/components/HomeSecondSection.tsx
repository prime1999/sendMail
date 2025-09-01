import video from "../assets/videos/video1.mp4";
import audioWoman from "../assets/images/woman3.jpg";
import textWoman from "../assets/images/woman2.jpg";

const HomeSecondSection = () => {
	return (
		<main className="my-16 w-8/12 mx-auto">
			<div className="relative w-full h-96">
				<video
					src={video}
					autoPlay
					muted
					loop
					playsInline
					className="h-full w-full object-cover rounded-2xl"
				/>
				<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black rounded-2xl">
					<div className="absolute bottom-20 left-10 text-white">adav</div>
				</div>
			</div>
			<div className="w-full h-[300px] flex items-center justify-between gap-4">
				<div className="w-7/12 h-full mt-8">
					<img src={textWoman} className="w-full h-full rounded-2xl" />
				</div>
				asc
			</div>
		</main>
	);
};

export default HomeSecondSection;
