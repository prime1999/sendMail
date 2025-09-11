import Hero from "@/components/Hero";
import HomeLastSection from "@/components/HomeLastSection";
import HomeSecondSection from "@/components/HomeSecondSection";
import HomeThirdSection from "@/components/HomeThirdSection";
import Navbar from "@/components/Navbar";

const HomePage = () => {
	return (
		<main>
			<Navbar />
			<Hero />
			<div className="w-full hidden md:block">
				<HomeSecondSection />
				<HomeThirdSection />
				<HomeLastSection />
			</div>
		</main>
	);
};

export default HomePage;
